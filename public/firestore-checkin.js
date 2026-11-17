// Client-side check-in via Firestore. Drop into the student portal as a module:
//   <script type="module" src="firestore-checkin.js"></script>
// It exposes window.firestoreCheckin(), which replaces apiPost('student_checkin', ...).
//
// Uses the same SDK version (11.6.1) as auth.js, so getApps()[0] is the app auth.js created.
import { getApps } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp }
  from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

// MUST match safeKey_() in GasFirestoreSync.gs
const safeKey = (s) => String(s || '').trim().replace(/[^A-Za-z0-9_.@-]+/g, '_');

function explain(err) {
  const code = err && err.code;
  if (code === 'permission-denied')
    return 'Check-in was rejected. Attendance may not be open yet, may already be recorded, or you are not on this class roster.';
  if (code === 'unavailable') return 'Network problem. Please try again.';
  return (err && err.message) || 'Check-in failed.';
}

window.firestoreCheckin = async function firestoreCheckin({ classId, courseId, comment, isMC }) {
  const app = getApps()[0];
  if (!app) throw new Error('Firebase is not initialised.');
  const user = getAuth(app).currentUser;
  if (!user || !user.email) throw new Error('Please sign in first.');
  const db = getFirestore(app);
  const email = user.email.toLowerCase();
  const courseKey = safeKey(courseId);
  const text = String(comment || '').trim();

  const sessionSnap = await getDoc(doc(db, 'sessions', `${classId}__${courseKey}`));
  if (!sessionSnap.exists()) throw new Error('This attendance checkpoint is not available.');
  const s = sessionSnap.data();
  const now = Date.now();
  if (now < s.opensAt.toMillis()) throw new Error('Attendance is not open yet.');
  const late = !isMC && now > s.dueAt.toMillis();
  if (late && !text) throw new Error('A reason is required for a late check-in.');

  const status = isMC ? 'MC' : (late ? 'Late' : 'In Class');
  try {
    // setDoc on a fixed ID + create-only rules => a second attempt is denied.
    await setDoc(doc(db, 'attendance', `${classId}__${courseKey}__${email}`), {
      email, classId, courseKey, courseId, status, comment: text,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    throw new Error(explain(err));
  }
  return { status: 'success', message: `${s.label || 'Attendance'} recorded successfully!`, data: { late, status } };
};