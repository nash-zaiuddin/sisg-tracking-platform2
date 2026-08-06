import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import {
  browserLocalPersistence, getAuth, GoogleAuthProvider, onAuthStateChanged,
  getIdToken, setPersistence, signInWithPopup, signOut
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCebQWOHHA89ANpKWVhhxODkgAG6EkWsjM',
  authDomain: 'sisg-project.firebaseapp.com', projectId: 'sisg-project',
  storageBucket: 'sisg-project.firebasestorage.app', messagingSenderId: '799371151688',
  appId: '1:799371151688:web:325afeaa549836ae1f8b7d'
};
const auth = getAuth(initializeApp(firebaseConfig, 'trainer-app'));
const allowed = window.SISG_CONFIG.TRAINER_EMAILS.map(email => email.toLowerCase());
window.getTrainerToken = async () => auth.currentUser ? getIdToken(auth.currentUser) : '';

async function openTrainer(user) {
  if (!user || !allowed.includes(String(user.email).toLowerCase())) return false;
  window.showLoading('Opening the Teachers Portal…');
  try {
    window.firebaseIdToken = await getIdToken(user);
    document.getElementById('trainerLogin').style.display = 'none';
    document.getElementById('trainerApp').style.display = 'block';
    await window.loadData();
    return true;
  } finally {
    window.hideLoading();
  }
}

setPersistence(auth, browserLocalPersistence).then(() => onAuthStateChanged(auth, async user => {
  if (user && !(await openTrainer(user))) {
    document.getElementById('trainerError').textContent = `${user.email} is not an approved trainer account.`;
    await signOut(auth);
  }
}));

window.trainerLogin = async function trainerLogin() {
  document.getElementById('trainerError').textContent = '';
  window.showLoading('Opening Google sign-in…');
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (error) {
    document.getElementById('trainerError').textContent = error.message;
    if (auth.currentUser && !allowed.includes(String(auth.currentUser.email).toLowerCase())) await signOut(auth);
  } finally {
    window.hideLoading();
  }
};
