import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import {
  browserLocalPersistence, getAuth, GoogleAuthProvider, onAuthStateChanged,
  getIdToken, setPersistence, signInWithPopup, signOut
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCebQWOHHA89ANpKWVhhxODkgAG6EkWsjM',
  authDomain: 'sisg-project.firebaseapp.com',
  projectId: 'sisg-project',
  storageBucket: 'sisg-project.firebasestorage.app',
  messagingSenderId: '799371151688',
  appId: '1:799371151688:web:325afeaa549836ae1f8b7d'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
let restoring = true;
window.getFirebaseToken = async () => auth.currentUser ? getIdToken(auth.currentUser) : '';

// Fast path: the roster doc is mirrored into Firestore by Apps Script. Returns
// null when the doc is missing/inactive/unreadable so the caller falls back to
// the authoritative Apps Script verify_email check.
async function rosterFromFirestore(user) {
  try {
    const email = String(user.email || '').toLowerCase();
    const snap = await getDoc(doc(getFirestore(app), 'roster', email));
    const r = snap.exists() ? snap.data() : null;
    if (r && r.active === true && r.name) return { name: r.name, email };
  } catch (error) {
    console.warn('Roster lookup via Firestore unavailable, using Apps Script.', error);
  }
  return null;
}

async function verifyAndOpen(user, welcome = false) {
  window.showLoading('Signing you in…');
  try {
    window.firebaseIdToken = await getIdToken(user);
    let person = await rosterFromFirestore(user);
    if (!person) {
      const response = await fetch(window.GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ apiKey: window.API_KEY, authToken: window.firebaseIdToken, action: 'verify_email', email: user.email })
      });
      if (!response.ok) throw new Error(`Roster verification returned HTTP ${response.status}.`);
      const result = await response.json();
      if (result.status !== 'success') throw new Error(result.message || `The account ${user.email} is not in the roster.`);
      person = result.data;
    }
    window.verifiedStudentName = person.name;
    window.verifiedStudentEmail = person.email;
    document.getElementById('studentNameDisplay').textContent = person.name;
    document.getElementById('studentEmailDisplay').textContent = person.email;
    document.getElementById('loginView').style.display = 'none';
    const main = document.getElementById('mainAppView');
    main.style.display = 'flex';
    main.classList.remove('hidden');
    if (welcome) window.showToast(`Welcome back, ${person.name.split(' ')[0]}!`, 'success');
    if (window.loadStudentData) await window.loadStudentData(person.email);
  } finally {
    window.hideLoading();
  }
}

setPersistence(auth, browserLocalPersistence)
  .then(() => onAuthStateChanged(auth, async user => {
    if (!user) { restoring = false; return; }
    try { await verifyAndOpen(user, !restoring); }
    catch (error) {
      console.error(error);
      await signOut(auth);
      window.showToast(error.message, 'error');
    } finally { restoring = false; }
  }))
  .catch(error => window.showToast(`Firebase session error: ${error.message}`, 'error'));

window.loginWithSSO = async function loginWithSSO() {
  const button = document.getElementById('loginBtn');
  window.setButtonLoading(button, true);
  window.showLoading('Opening Google sign-in…');
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
    if (error.code !== 'auth/popup-closed-by-user') window.showToast(`Authentication failed: ${error.message}`, 'error');
  } finally {
    window.setButtonLoading(button, false);
    window.hideLoading();
  }
};

window.logoutSSO = async function logoutSSO() {
  await signOut(auth);
  window.verifiedStudentName = '';
  window.verifiedStudentEmail = '';
  document.getElementById('mainAppView').style.display = 'none';
  document.getElementById('loginView').style.display = 'flex';
  window.switchTab('dashboard');
};