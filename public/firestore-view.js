// Reads the pre-built dashboard snapshot from Firestore (studentView/{email}).
// Returns null whenever the snapshot is missing, too old, or older than the
// student's own latest write — the caller then falls back to Apps Script.
import { getApps } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

const MAX_AGE_MS = 45 * 60 * 1000;

window.firestoreStudentView = async function firestoreStudentView() {
  const app = getApps()[0];
  if (!app) return null;
  const user = getAuth(app).currentUser;
  if (!user || !user.email) return null;
  const snap = await getDoc(doc(getFirestore(app), 'studentView', user.email.toLowerCase()));
  if (!snap.exists()) return null;
  const d = snap.data();
  const updated = d.updatedAt && d.updatedAt.toMillis ? d.updatedAt.toMillis() : 0;
  if (!updated || Date.now() - updated > MAX_AGE_MS) return null;
  if (window.lastWriteAt && updated < window.lastWriteAt) return null;
  return JSON.parse(d.json);
};