// Loads the pre-built teacher dashboard from Firestore (teacherView/*).
// Returns null whenever it is missing, stale, mid-update, for another month,
// or older than this teacher's own latest save: teacher.html then falls back
// to the normal Apps Script load.
import { getApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore, doc, getDoc, collection, query, where, onSnapshot } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

const MAX_AGE_MS = 45 * 60 * 1000;

async function gunzipBase64(b64) {
  if (typeof DecompressionStream === 'undefined') throw new Error('Browser cannot decompress the snapshot.');
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  return new Response(stream).text();
}

// minBuiltAt: only accept a snapshot whose build STARTED after this time (ms). Defaults to this
// teacher's latest save, so the page never shows data older than their own change.
window.firestoreTeacherView = async function firestoreTeacherView(monthKey, minBuiltAt) {
  let app;
  try { app = getApp('trainer-app'); } catch (_) { return null; }   // same app name as teacher-auth.js
  if (!getAuth(app).currentUser) return null;
  const db = getFirestore(app);
  for (let attempt = 0; attempt < 2; attempt++) {
    const metaSnap = await getDoc(doc(db, 'teacherView', 'meta'));
    if (!metaSnap.exists()) return null;
    const meta = metaSnap.data();
    const updated = meta.updatedAt && meta.updatedAt.toMillis ? meta.updatedAt.toMillis() : 0;
    if (!updated || Date.now() - updated > MAX_AGE_MS) return null;
    const need = minBuiltAt !== undefined ? minBuiltAt : window.lastWriteAt;
    const built = Number(meta.startedAt) || updated;
    if (need && built < need) return null;
    const snaps = await Promise.all(Array.from({ length: meta.count }, (_, i) => getDoc(doc(db, 'teacherView', 'c' + i))));
    if (!snaps.every(s => s.exists() && s.data().v === meta.version)) continue;   // rebuilt while reading: retry once
    const data = JSON.parse(await gunzipBase64(snaps.map(s => s.data().d).join('')));
    const cal = data.calendar || {};
    if (monthKey && cal.monthKey && cal.monthKey !== monthKey) return null;
    return data;
  }
  return null;
};

// Live list of the files each project group has uploaded (projectFiles/*). Returns an unsubscribe function.
window.watchProjectFiles = function watchProjectFiles(classId, callback) {
  let app;
  try { app = getApp('trainer-app'); } catch (_) { return () => {}; }
  if (!getAuth(app).currentUser) return () => {};
  return onSnapshot(
    query(collection(getFirestore(app), 'projectFiles'), where('classId', '==', classId)),
    snap => callback(snap.docs.map(d => Object.assign({ id: d.id }, d.data()))),
    err => console.warn('Project files unavailable.', err)
  );
};