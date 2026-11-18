// Group project file uploads (student portal).
// Files are uploaded to Google Drive through Apps Script (folder SISG_Project_Files/{class}/{group});
// the file list for each group is one Firestore document (projectFiles/{CLASS__GROUP}) that every member sees live.
import { getApps } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore, doc, onSnapshot, setDoc, arrayUnion, arrayRemove, serverTimestamp }
  from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

const MAX_BYTES = 8 * 1024 * 1024;
// MUST match safeKey_() in GasFirestoreSync.gs and the key written to roster.groupKeys
const safeKey = (s) => String(s || '').trim().replace(/[^A-Za-z0-9_.@-]+/g, '_');
const groupKeyOf = (classId, groupId) => `${safeKey(classId)}__${safeKey(groupId)}`;

const groups = new Map();   // groupKey -> { files:[], pending:[], unsub, hosts:Set }

function esc(v) {
  return String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
}
function sizeLabel(bytes) {
  const n = Number(bytes) || 0;
  return n >= 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;
}
function iconFor(name, type) {
  const ext = String(name).split('.').pop().toLowerCase();
  if (ext === 'pdf') return ['file-type-pdf', 'bg-red-50 text-red-600'];
  if (['xls', 'xlsx', 'csv'].includes(ext)) return ['file-spreadsheet', 'bg-green-50 text-green-600'];
  if (['ppt', 'pptx', 'key'].includes(ext)) return ['presentation', 'bg-orange-50 text-orange-600'];
  if (['doc', 'docx', 'txt', 'md'].includes(ext)) return ['file-text', 'bg-blue-50 text-blue-600'];
  if (String(type).startsWith('image/')) return ['photo', 'bg-purple-50 text-purple-600'];
  if (String(type).startsWith('video/')) return ['video', 'bg-pink-50 text-pink-600'];
  if (['zip', 'rar', '7z'].includes(ext)) return ['file-zip', 'bg-amber-50 text-amber-600'];
  return ['file', 'bg-slate-100 text-slate-600'];
}
function whenLabel(ms) {
  const d = new Date(Number(ms) || 0);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleString('en-SG', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
}

const SHELL = `<div data-list></div>
  <div data-drop class="mt-3 rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center">
    <p class="text-sm font-semibold text-slate-700">Drop files here or choose files</p>
    <p class="mt-1 text-xs text-slate-500">Decks, documents, spreadsheets, images, videos or zip files · up to 8 MB each</p>
    <button type="button" data-pick class="mt-3 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><i data-lucide="plus" class="h-4 w-4"></i>Add files</button>
    <input data-input type="file" multiple class="hidden">
  </div>
  <details class="mt-3 rounded-xl border border-slate-200 bg-white p-3">
    <summary class="cursor-pointer text-sm font-semibold text-slate-700">Add a link or a note</summary>
    <p class="mt-2 text-xs text-slate-500">For things that can't be a file, like a repository or a live demo. Each one is added to the list above.</p>
    <div class="mt-3 grid gap-3 sm:grid-cols-2">
      <input data-f="Main submission" type="url" placeholder="Main submission / workbook URL" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm">
      <input data-f="Presentation deck" type="url" placeholder="Presentation deck URL" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm">
      <input data-f="POC / demo" type="url" placeholder="POC / demo URL" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm">
      <input data-f="Repository" type="url" placeholder="Repository URL" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm">
    </div>
    <textarea data-note rows="3" placeholder="Notes for your instructor" class="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm"></textarea>
    <button type="button" data-save-links class="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"><i data-lucide="plus" class="h-4 w-4"></i>Add to submission</button>
  </details>`;

function fileIcon(f) {
  if (f.kind === 'link') return ['link', 'bg-indigo-50 text-indigo-600'];
  if (f.kind === 'note') return ['sticky-note', 'bg-amber-50 text-amber-600'];
  const ext = String(f.name || '').split('.').pop().toLowerCase();
  if (ext === 'pdf' || ['doc', 'docx', 'txt', 'md'].includes(ext)) return ['file-text', 'bg-blue-50 text-blue-600'];
  if (['xls', 'xlsx', 'csv'].includes(ext)) return ['table', 'bg-green-50 text-green-600'];
  if (['ppt', 'pptx', 'key'].includes(ext)) return ['presentation', 'bg-orange-50 text-orange-600'];
  if (String(f.type).startsWith('image/')) return ['image', 'bg-purple-50 text-purple-600'];
  if (String(f.type).startsWith('video/')) return ['video', 'bg-pink-50 text-pink-600'];
  if (['zip', 'rar', '7z'].includes(ext)) return ['archive', 'bg-amber-50 text-amber-600'];
  return ['file', 'bg-slate-100 text-slate-600'];
}

function render(groupKey) {
  const g = groups.get(groupKey);
  if (!g) return;
  g.hosts.forEach(host => {
    if (!host.isConnected) { g.hosts.delete(host); return; }
    const list = host.querySelector('[data-list]');
    if (!list) return;
    const assignmentId = host.dataset.assignmentId;
    const mine = g.files.filter(f => (f.assignmentId || '') === assignmentId).sort((a, b) => (a.at || 0) - (b.at || 0));
    const pending = g.pending.filter(p => p.assignmentId === assignmentId);
    const rows = mine.map(f => {
      const [icon, tint] = fileIcon(f);
      const removeBtn = `<button type="button" data-remove="${esc(f.id)}" class="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label="Remove"><i data-lucide="trash-2" class="h-4 w-4"></i></button>`;
      const who = `${esc(f.byName || f.by || '')} · ${esc(whenLabel(f.at))}`;
      let body;
      if (f.kind === 'note') {
        body = `<p class="whitespace-pre-wrap break-words text-sm text-slate-800">${esc(f.text)}</p><p class="mt-0.5 text-xs text-slate-500">Note · ${who}</p>`;
      } else if (f.kind === 'link') {
        body = `<a href="${esc(f.url)}" target="_blank" rel="noopener" class="block truncate text-sm font-semibold text-slate-800 hover:underline">${esc(f.label || 'Link')}</a><p class="truncate text-xs text-slate-500">${esc(f.url)} · ${who}</p>`;
      } else {
        body = `<a href="${esc(f.url)}" target="_blank" rel="noopener" class="block truncate text-sm font-semibold text-slate-800 hover:underline">${esc(f.name)}</a><p class="text-xs text-slate-500">${esc(sizeLabel(f.size))} · ${who}</p>`;
      }
      return `<div class="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tint}"><i data-lucide="${icon}" class="h-4 w-4"></i></div>
        <div class="min-w-0 flex-1">${body}</div>${removeBtn}</div>`;
    }).join('');
    const pendingRows = pending.map(p => `<div class="rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2.5">
        <p class="truncate text-sm font-semibold text-slate-800">${esc(p.name)}</p>
        <p class="mt-0.5 text-xs ${p.error ? 'text-red-600' : 'text-slate-500'}">${p.error ? esc(p.error) : 'Uploading… you can keep using the portal'}</p>
        ${p.error ? '' : '<div class="mt-2 h-1.5 overflow-hidden rounded-full bg-blue-100"><div class="h-full w-1/3 animate-pulse bg-blue-600"></div></div>'}
      </div>`).join('');
    list.innerHTML = `<div class="grid gap-2">${rows}${pendingRows}</div>
      ${!mine.length && !pending.length ? '<p class="rounded-xl bg-white p-3 text-center text-xs text-slate-500">Nothing submitted yet. Add files, links or notes below.</p>' : ''}`;
    if (window.lucide) window.lucide.createIcons({ root: list });
  });
}

async function addEntries(groupKey, ctx, entries) {
  await setDoc(doc(getFirestore(getApps()[0]), 'projectFiles', groupKey),
    { classId: ctx.classId, groupId: ctx.groupId, files: arrayUnion(...entries), updatedAt: serverTimestamp() }, { merge: true });
}

function cleanUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try { return new URL(withScheme).href; } catch (_) { return null; }
}

async function saveLinksAndNote(groupKey, ctx, host) {
  const user = getAuth(getApps()[0]).currentUser;
  const base = () => ({ id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, by: user.email.toLowerCase(),
    byName: window.verifiedStudentName || '', at: Date.now(), assignmentId: ctx.assignmentId });
  const entries = [];
  for (const input of host.querySelectorAll('[data-f]')) {
    const url = cleanUrl(input.value);
    if (url === null) return window.showToast(`"${input.value}" is not a valid link.`, 'error');
    if (url) entries.push(Object.assign(base(), { kind: 'link', label: input.dataset.f, name: input.dataset.f, url }));
  }
  const text = host.querySelector('[data-note]').value.trim().slice(0, 3000);
  if (text) entries.push(Object.assign(base(), { kind: 'note', name: 'Note', text }));
  if (!entries.length) return window.showToast('Add a link or a note first.', 'error');
  try {
    await addEntries(groupKey, ctx, entries);
    host.querySelectorAll('[data-f]').forEach(i => { i.value = ''; });
    host.querySelector('[data-note]').value = '';
    host.querySelector('details').open = false;
    window.showToast('Added to your group submission.', 'success');
  } catch (err) { window.showToast(err.message || 'Could not save.', 'error'); }
}

function readBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = () => reject(new Error('Could not read the file.'));
    reader.readAsDataURL(file);
  });
}

async function startUpload(groupKey, ctx, file) {
  const g = groups.get(groupKey);
  const user = getAuth(getApps()[0]).currentUser;
  if (file.size > MAX_BYTES) return window.showToast(`"${file.name}" is larger than 8 MB.`, 'error');
  if (file.size === 0) return window.showToast(`"${file.name}" is empty.`, 'error');
  const item = { id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, name: file.name, assignmentId: ctx.assignmentId, error: '' };
  g.pending.push(item);
  render(groupKey);
  let driveId = '';
  try {
    const fileData = await readBase64(file);
    const result = await window.apiPost('upload_project_file', {
      assignmentId: ctx.assignmentId, fileName: file.name, mimeType: file.type || 'application/octet-stream', fileData
    });
    const info = result.data || {};
    driveId = info.driveId;
    const entry = { id: info.driveId, driveId: info.driveId, name: info.name || file.name, size: info.size || file.size,
      type: file.type || '', url: info.url, by: user.email.toLowerCase(),
      byName: window.verifiedStudentName || '', at: Date.now(), assignmentId: ctx.assignmentId };
    await setDoc(doc(getFirestore(getApps()[0]), 'projectFiles', groupKey),
      { classId: ctx.classId, groupId: ctx.groupId, files: arrayUnion(entry), updatedAt: serverTimestamp() }, { merge: true });
    g.pending = g.pending.filter(p => p !== item);
    window.showToast(`"${file.name}" added.`, 'success');
  } catch (err) {
    item.error = err.message || 'Upload failed.';
    if (driveId) window.apiPost('delete_project_file', { assignmentId: ctx.assignmentId, driveId }).catch(() => {});
    setTimeout(() => { g.pending = g.pending.filter(p => p !== item); render(groupKey); }, 6000);
  }
  render(groupKey);
}

async function removeFile(groupKey, ctx, fileId) {
  const g = groups.get(groupKey);
  const entry = g.files.find(f => f.id === fileId);
  if (!entry) return;
  const what = entry.kind === 'note' ? 'this note' : entry.kind === 'link' ? `the link "${entry.label || entry.url}"` : `"${entry.name}"`;
  if (!confirm(`Remove ${what} for your whole group?`)) return;
  try {
    await setDoc(doc(getFirestore(getApps()[0]), 'projectFiles', groupKey),
      { classId: ctx.classId, groupId: ctx.groupId, files: arrayRemove(entry), updatedAt: serverTimestamp() }, { merge: true });
    if (!entry.kind || entry.kind === 'file') window.apiPost('delete_project_file', { assignmentId: entry.assignmentId || ctx.assignmentId, driveId: entry.driveId || entry.id }).catch(() => {});
  } catch (err) { window.showToast(err.message || 'Could not remove the file.', 'error'); }
}

window.mountProjectFiles = function mountProjectFiles(host) {
  const app = getApps()[0];
  if (!app || !host) return;
  const ctx = { classId: host.dataset.classId, groupId: host.dataset.groupId, assignmentId: host.dataset.assignmentId };
  const groupKey = groupKeyOf(ctx.classId, ctx.groupId);
  let g = groups.get(groupKey);
  if (!g) {
    g = { files: [], pending: [], hosts: new Set(), unsub: null };
    groups.set(groupKey, g);
    g.unsub = onSnapshot(doc(getFirestore(app), 'projectFiles', groupKey),
      snap => { g.files = snap.exists() ? (snap.data().files || []) : []; render(groupKey); },
      err => { console.warn('Project files unavailable.', err); host.innerHTML = '<p class="rounded-xl bg-white p-3 text-center text-xs text-red-600">Files are unavailable right now. Try reloading, or ask your instructor to check your group.</p>'; });
  }
  g.hosts.add(host);
  host.innerHTML = SHELL;
  if (window.lucide) window.lucide.createIcons({ root: host });
  host.addEventListener('click', event => {
    const pick = event.target.closest('[data-pick]');
    if (pick) return host.querySelector('[data-input]').click();
    if (event.target.closest('[data-save-links]')) return saveLinksAndNote(groupKey, ctx, host);
    const remove = event.target.closest('[data-remove]');
    if (remove) return removeFile(groupKey, ctx, remove.dataset.remove);
  });
  host.addEventListener('change', event => {
    if (!event.target.matches('[data-input]')) return;
    Array.from(event.target.files).forEach(file => startUpload(groupKey, ctx, file));
    event.target.value = '';
  });
  host.addEventListener('dragover', event => { event.preventDefault(); });
  host.addEventListener('drop', event => {
    event.preventDefault();
    Array.from(event.dataTransfer.files || []).forEach(file => startUpload(groupKey, ctx, file));
  });
  render(groupKey);
};