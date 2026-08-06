window.verifiedStudentName = '';
window.verifiedStudentEmail = '';
window.courseCalendarEvents = [];
window.courseCalendarWeekEvents = [];
window.courseCalendarWeekStart = '';
window.selectedCourseDate = '';
window.studentClasses = [];
window.selectedStudentClassId = '';
window.studentClassManuallySelected = false;
window.studentProjectWorkspace = { group:null, members:[], peers:[], assignments:[], evaluations:[] };

let sisgLoadingDepth = 0;

function ensureLoadingOverlay() {
  let overlay = document.getElementById('sisgLoadingOverlay');
  if (overlay) return overlay;

  const style = document.createElement('style');
  style.id = 'sisgLoadingStyles';
  style.textContent = `
    #sisgLoadingOverlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: grid;
      place-items: center;
      padding: 24px;
      background: rgba(248, 250, 252, .88);
      -webkit-backdrop-filter: blur(3px);
      backdrop-filter: blur(3px);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity .16s ease, visibility .16s ease;
    }
    #sisgLoadingOverlay.is-visible {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
    #sisgLoadingOverlay .sisg-loading-card {
      width: min(320px, 100%);
      padding: 26px 24px;
      border: 1px solid #dbe4f0;
      border-radius: 22px;
      background: #fff;
      box-shadow: 0 20px 50px rgba(15, 23, 42, .16);
      text-align: center;
    }
    #sisgLoadingOverlay .sisg-loading-spinner {
      width: 44px;
      height: 44px;
      margin: 0 auto 16px;
      border: 4px solid #dbeafe;
      border-top-color: #2563eb;
      border-radius: 999px;
      animation: sisg-loading-spin .75s linear infinite;
    }
    #sisgLoadingOverlay .sisg-loading-message {
      margin: 0;
      color: #0f172a;
      font: 700 16px/1.4 Inter, "Segoe UI", Arial, sans-serif;
    }
    #sisgLoadingOverlay .sisg-loading-hint {
      margin: 7px 0 0;
      color: #64748b;
      font: 400 13px/1.4 Inter, "Segoe UI", Arial, sans-serif;
    }
    @keyframes sisg-loading-spin { to { transform: rotate(360deg); } }
    @media (prefers-reduced-motion: reduce) {
      #sisgLoadingOverlay,
      #sisgLoadingOverlay .sisg-loading-spinner { transition: none; animation-duration: 1.5s; }
    }
  `;
  document.head.appendChild(style);

  overlay = document.createElement('div');
  overlay.id = 'sisgLoadingOverlay';
  overlay.setAttribute('role', 'status');
  overlay.setAttribute('aria-live', 'polite');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <div class="sisg-loading-card">
      <div class="sisg-loading-spinner" aria-hidden="true"></div>
      <p id="sisgLoadingMessage" class="sisg-loading-message">Loading…</p>
      <p class="sisg-loading-hint">Please wait a moment.</p>
    </div>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

window.showLoading = function showLoading(message = 'Loading…') {
  sisgLoadingDepth += 1;
  const overlay = ensureLoadingOverlay();
  const messageElement = document.getElementById('sisgLoadingMessage');
  if (messageElement) messageElement.textContent = message;
  overlay.classList.add('is-visible');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.setAttribute('aria-busy', 'true');
};

window.hideLoading = function hideLoading() {
  sisgLoadingDepth = Math.max(0, sisgLoadingDepth - 1);
  if (sisgLoadingDepth > 0) return;
  const overlay = document.getElementById('sisgLoadingOverlay');
  if (overlay) {
    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
  }
  document.body.removeAttribute('aria-busy');
};

lucide.createIcons();

const dateDisplay = document.getElementById('currentDateDisplay');
if (dateDisplay) {
  dateDisplay.textContent = new Date().toLocaleDateString('en-SG', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

window.showToast = function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return alert(message);
  const item = document.createElement('div');
  const error = type === 'error';
  item.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium toast-enter pointer-events-auto max-w-sm w-full ${error ? 'bg-red-50 border border-red-200 text-red-800' : 'bg-gray-800 text-white'}`;
  item.innerHTML = `<i data-lucide="${error ? 'alert-circle' : 'check-circle-2'}" class="w-5 h-5 ${error ? 'text-red-500' : 'text-green-400'}"></i><span></span>`;
  item.querySelector('span').textContent = message;
  container.appendChild(item);
  lucide.createIcons({ root: item });
  setTimeout(() => item.remove(), 4000);
};

window.setButtonLoading = function setButtonLoading(button, loading, fallback = '') {
  if (!button) return;
  if (loading) {
    button.dataset.originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Processing…';
  } else {
    button.disabled = false;
    button.innerHTML = button.dataset.originalText || fallback;
  }
  lucide.createIcons({ root: button });
};

window.switchTab = function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.toggle('active', el.id === `tab-${tabId}`));
  document.querySelectorAll('.nav-btn').forEach(btn => {
    const active = btn.id === `nav-${tabId}`;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-current', active ? 'page' : 'false');
  });
  const title = document.getElementById('headerTitle');
  if (title) title.textContent = ({ dashboard: 'Dashboard', calendar: 'Course Calendar', checkin: 'Daily Check-in', projects: 'Group Projects', exams: 'Examinations', feedback: 'Submit Feedback' })[tabId] || 'Dashboard';
};

window.updateFileName = function updateFileName(input) {
  const display = document.getElementById('fileNameDisplay');
  if (display) display.textContent = input.files && input.files[0] ? input.files[0].name : 'Tap to upload MC document';
};

function dateFromKey(key) {
  const [year, month, day] = String(key || '').split('-').map(Number);
  return year && month && day ? new Date(year, month - 1, day, 12) : null;
}

function dateKeyFromDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function offsetDateKey(key, days) {
  const date = dateFromKey(key);
  if (!date) return '';
  date.setDate(date.getDate() + Number(days || 0));
  return dateKeyFromDate(date);
}

function calendarStateDetails(event) {
  const states = {
    verified: ['Verified', 'text-green-700', 'border-green-200 bg-green-50', 'circle-check-big'],
    submitted: ['Submitted · awaiting trainer', 'text-blue-700', 'border-blue-200 bg-blue-50', 'clock-3'],
    excused: ['Medical certificate recorded', 'text-purple-700', 'border-purple-200 bg-purple-50', 'file-check-2'],
    missed: ['Missing attendance', 'text-red-700', 'border-red-200 bg-red-50', 'circle-alert'],
    open: ['Open now', 'text-green-700', 'border-green-200 bg-green-50', 'radio'],
    late: ['Late · reason required', 'text-red-700', 'border-red-200 bg-red-50', 'triangle-alert'],
    upcoming: [`Opens at ${event.checkInOpens}`, 'text-amber-700', 'border-amber-200 bg-amber-50', 'clock'],
    cancelled: ['Cancelled', 'text-slate-500', 'border-slate-200 bg-slate-100', 'calendar-x-2'],
    disabled: ['Attendance not required', 'text-slate-500', 'border-slate-200 bg-slate-50', 'minus-circle'],
    scheduled: [`Scheduled for ${event.attendanceTime}`, 'text-slate-600', 'border-slate-200 bg-white', 'calendar-clock']
  };
  return states[event.state] || states.scheduled;
}

function buildCalendarEventCard(event, compact = false) {
  const [status, statusClass, cardClass, iconName] = calendarStateDetails(event);
  const card = document.createElement('article');
  card.className = `rounded-xl border p-3 ${cardClass}`;
  const row = document.createElement('div');
  row.className = 'flex items-start gap-3';
  const icon = document.createElement('div');
  icon.className = `mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/80 ${statusClass}`;
  icon.innerHTML = `<i data-lucide="${iconName}" class="h-5 w-5"></i>`;
  const copy = document.createElement('div');
  copy.className = 'min-w-0 flex-1';
  const kicker = document.createElement('p');
  kicker.className = `text-xs font-semibold uppercase tracking-wide ${statusClass}`;
  kicker.textContent = `${event.attendanceLabel} · ${event.attendanceTime}`;
  const title = document.createElement('p');
  title.className = 'mt-1 text-sm font-semibold text-slate-900';
  title.textContent = event.course;
  const meta = document.createElement('p');
  meta.className = `mt-1 text-xs ${statusClass}`;
  meta.textContent = status;
  copy.append(kicker, title, meta);
  if (!compact) {
    const details = document.createElement('p');
    details.className = 'mt-1 text-xs text-slate-500';
    details.textContent = `${event.lessonMode === 'Virtual' ? 'Virtual' : 'Face to face'} · Course starts ${event.courseStartTime}`;
    copy.appendChild(details);
  }
  card.appendChild(row);
  row.append(icon, copy);
  return card;
}

window.renderWeeklyLessonCalendar = function renderWeeklyLessonCalendar(calendar = {}) {
  const host = document.getElementById('weeklyLessonCalendar');
  const label = document.getElementById('calendarWeekLabel');
  if (!host) return;
  const weekStart = calendar.weekStart || window.courseCalendarWeekStart;
  const weekEnd = calendar.weekEnd || offsetDateKey(weekStart, 6);
  const startDate = dateFromKey(weekStart);
  const endDate = dateFromKey(weekEnd);
  if (label && startDate && endDate) {
    label.textContent = `${startDate.toLocaleDateString('en-SG', { day:'numeric', month:'short' })} – ${endDate.toLocaleDateString('en-SG', { day:'numeric', month:'short', year:'numeric' })}`;
  }
  host.innerHTML = '';
  for (let offset = 0; offset < 7; offset += 1) {
    const key = offsetDateKey(weekStart, offset);
    const date = dateFromKey(key);
    const events = window.courseCalendarWeekEvents.filter(event => event.date === key);
    const column = document.createElement('article');
    column.className = `min-w-0 rounded-2xl border p-3 ${key === window.courseCalendarToday ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'}`;
    const heading = document.createElement('div');
    heading.className = 'mb-3 border-b border-slate-200 pb-2';
    heading.innerHTML = `<p class="text-xs font-semibold uppercase tracking-wide ${key === window.courseCalendarToday ? 'text-amber-700' : 'text-slate-500'}"></p><p class="mt-0.5 text-sm font-bold text-slate-900"></p>`;
    heading.children[0].textContent = date ? date.toLocaleDateString('en-SG', { weekday:'short' }) : '';
    heading.children[1].textContent = date ? date.toLocaleDateString('en-SG', { day:'numeric', month:'short' }) : key;
    column.appendChild(heading);
    if (!events.length) {
      const empty = document.createElement('p');
      empty.className = 'text-xs text-slate-400';
      empty.textContent = 'No lesson';
      column.appendChild(empty);
    } else {
      events.forEach(event => {
        const lesson = document.createElement('div');
        lesson.className = 'mb-3 last:mb-0';
        lesson.innerHTML = '<p class="text-xs font-semibold text-amber-700"></p><p class="mt-1 text-sm font-bold text-slate-900"></p><p class="mt-1 text-xs leading-5 text-slate-600"></p>';
        lesson.children[0].textContent = event.courseStartTime || event.attendanceTime || '';
        lesson.children[1].textContent = event.course || 'Scheduled lesson';
        lesson.children[2].textContent = event.description || 'Lesson contents have not been added yet.';
        column.appendChild(lesson);
      });
    }
    host.appendChild(column);
  }
};

window.renderMonthlyDeliveryCalendar = function renderMonthlyDeliveryCalendar(calendar = {}) {
  const grid = document.getElementById('courseCalendarGrid');
  const label = document.getElementById('calendarMonthLabel');
  if (!grid) return;
  const monthStartKey = calendar.monthStart || `${window.courseCalendarToday.slice(0,7)}-01`;
  const monthEndKey = calendar.monthEnd || monthStartKey;
  const monthStart = dateFromKey(monthStartKey);
  const monthEnd = dateFromKey(monthEndKey);
  if (!monthStart || !monthEnd) return;
  if (label) label.textContent = monthStart.toLocaleDateString('en-SG', { month:'long', year:'numeric' });
  const leadingDays = (monthStart.getDay() + 6) % 7;
  const monthDays = Math.round((monthEnd - monthStart) / 86400000) + 1;
  const cellCount = Math.ceil((leadingDays + monthDays) / 7) * 7;
  grid.innerHTML = '';
  for (let index = 0; index < cellCount; index += 1) {
    const key = offsetDateKey(monthStartKey, index - leadingDays);
    const date = dateFromKey(key);
    const inMonth = key >= monthStartKey && key <= monthEndKey;
    const events = window.courseCalendarEvents.filter(event => event.date === key);
    const cell = document.createElement('div');
    cell.className = `min-h-20 rounded-lg border p-1.5 ${key === window.courseCalendarToday ? 'border-blue-400 bg-blue-50' : 'border-slate-200 bg-white'} ${inMonth ? '' : 'opacity-35'}`;
    const number = document.createElement('p');
    number.className = `text-[10px] font-semibold ${key === window.courseCalendarToday ? 'text-blue-700' : 'text-slate-500'}`;
    number.textContent = date ? String(date.getDate()) : '';
    cell.appendChild(number);
    events.slice(0, 3).forEach(event => {
      const pill = document.createElement('div');
      const virtual = event.lessonMode === 'Virtual';
      pill.className = `mt-1 overflow-hidden rounded px-1 py-0.5 text-[8px] font-semibold leading-tight ${virtual ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`;
      pill.title = `${event.course} · ${event.lessonMode}`;
      pill.textContent = virtual ? 'Virtual' : 'Face to face';
      cell.appendChild(pill);
    });
    grid.appendChild(cell);
  }
};

window.renderAttendanceSignal = function renderAttendanceSignal(calendar = {}) {
  const signal = document.getElementById('todaySessionSignal');
  const checkpoints = document.getElementById('attendanceCheckpointList');
  const select = document.getElementById('attendanceSession');
  const todayEvents = Array.isArray(calendar.todayEvents) ? calendar.todayEvents : [];
  if (signal) {
    if (!todayEvents.length) {
      signal.textContent = 'No published session today · Attendance is closed';
      signal.className = 'text-sm font-semibold text-slate-600';
    } else if (calendar.actionableEvent) {
      signal.textContent = `${calendar.actionableEvent.attendanceLabel} attendance is ${calendar.actionableEvent.state === 'late' ? 'late' : 'open'} now`;
      signal.className = `text-sm font-semibold ${calendar.actionableEvent.state === 'late' ? 'text-red-700' : 'text-green-700'}`;
    } else {
      const next = todayEvents.find(event => ['upcoming', 'scheduled'].includes(event.state));
      signal.textContent = next ? `${next.attendanceLabel} attendance opens at ${next.checkInOpens}` : 'Today’s attendance checkpoints are complete';
      signal.className = 'text-sm font-semibold text-blue-700';
    }
  }
  if (checkpoints) {
    checkpoints.innerHTML = '';
    if (!todayEvents.length) {
      const empty = document.createElement('p');
      empty.className = 'rounded-xl bg-slate-50 p-4 text-sm text-slate-500';
      empty.textContent = 'The Courses calendar does not contain a published session for today.';
      checkpoints.appendChild(empty);
    } else {
      todayEvents.forEach(event => checkpoints.appendChild(buildCalendarEventCard(event, true)));
    }
    lucide.createIcons({ root: checkpoints });
  }
  if (select) {
    const previousCourseId = select.value;
    select.innerHTML = '';
    todayEvents.forEach(event => {
      const option = document.createElement('option');
      option.value = event.courseId;
      option.dataset.session = event.session;
      option.disabled = !event || ['cancelled', 'disabled', 'verified', 'submitted', 'excused'].includes(event.state);
      option.textContent = `${event.attendanceLabel} · ${event.attendanceTime} · ${event.course}`;
      select.appendChild(option);
    });
    if (!todayEvents.length) {
      const option = document.createElement('option');
      option.value = '';
      option.disabled = true;
      option.textContent = 'No attendance checkpoint scheduled today';
      select.appendChild(option);
    }
    const preferred = calendar.actionableEvent || todayEvents.find(event => !['cancelled', 'disabled', 'verified', 'submitted', 'excused'].includes(event.state));
    if (preferred) select.value = preferred.courseId;
    else if (todayEvents.some(event => event.courseId === previousCourseId)) select.value = previousCourseId;
  }
};

window.renderStudentClassSelector = function renderStudentClassSelector(classes = [], selectedClass = {}) {
  window.studentClasses = Array.isArray(classes) ? classes : [];
  window.selectedStudentClassId = selectedClass && selectedClass.id || window.selectedStudentClassId || '';
  const wrapper = document.getElementById('studentClassSwitcher');
  const select = document.getElementById('studentClassSelect');
  if (!wrapper || !select) return;
  select.innerHTML = '';
  window.studentClasses.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.name;
    select.appendChild(option);
  });
  if (window.selectedStudentClassId) select.value = window.selectedStudentClassId;
  wrapper.classList.toggle('hidden', window.studentClasses.length <= 1);
};

window.changeStudentClass = async function changeStudentClass(classId) {
  if (!classId || classId === window.selectedStudentClassId || !window.verifiedStudentEmail) return;
  window.selectedStudentClassId = classId;
  window.studentClassManuallySelected = true;
  await window.loadStudentData(window.verifiedStudentEmail);
};

window.renderCourseCalendar = function renderCourseCalendar(calendar = {}) {
  window.courseCalendarEvents = Array.isArray(calendar.events) ? calendar.events : [];
  window.courseCalendarWeekEvents = Array.isArray(calendar.weekEvents) ? calendar.weekEvents : [];
  window.courseCalendarToday = calendar.today || new Date().toISOString().slice(0, 10);
  window.courseCalendarWeekStart = calendar.weekStart || window.courseCalendarToday;
  const summary = document.getElementById('calendarAttendanceSummary');
  if (summary) {
    const values = calendar.summary || {};
    summary.textContent = `${values.sessionDays || 0} session days · ${values.virtual || 0} virtual · ${values.faceToFace || 0} face to face`;
  }
  window.renderAttendanceSignal(calendar);
  window.renderWeeklyLessonCalendar(calendar);
  window.renderMonthlyDeliveryCalendar(calendar);
};

window.renderBadgeRequirements = function renderBadgeRequirements(progress = {}) {
  const list = document.getElementById('badgeRequirementsList');
  const empty = document.getElementById('badgeRequirementsEmpty');
  const windowLabel = document.getElementById('badgeRequirementWindow');
  const summary = document.getElementById('badgeRequirementSummary');
  const progressLabel = document.getElementById('badgeProgressLabel');
  if (progressLabel) progressLabel.textContent = progress.scheduleEnabled ? 'Due-date progress' : 'Badge progress';
  if (!list) return;
  list.innerHTML = '';

  if (!progress.scheduleEnabled) {
    if (windowLabel) windowLabel.textContent = 'Schedule not published';
    if (summary) {
      summary.textContent = 'Due dates will appear here after they are added above the Badge Tracker columns.';
      summary.className = 'mt-2 text-sm text-slate-500';
    }
    if (empty) {
      empty.textContent = 'No dated badge requirements are available yet.';
      empty.classList.remove('hidden');
    }
    return;
  }

  if (windowLabel) windowLabel.textContent = `Week of ${progress.weekStartDisplay || progress.weekStart} – ${progress.weekEndDisplay || progress.weekEnd}`;
  const overdueCount = Number(progress.overdueCount || 0);
  if (summary) {
    summary.textContent = overdueCount
      ? `${progress.thisWeekCompletedCount || 0}/${progress.thisWeekTotalCount || 0} complete this week · ${overdueCount} overdue`
      : `${progress.thisWeekCompletedCount || 0}/${progress.thisWeekTotalCount || 0} complete this week · On track`;
    summary.className = `mt-2 text-sm font-medium ${overdueCount ? 'text-red-600' : 'text-green-700'}`;
  }

  const overdue = Array.isArray(progress.overdueRequirements) ? progress.overdueRequirements : [];
  const thisWeek = Array.isArray(progress.thisWeekRequirements) ? progress.thisWeekRequirements : [];
  const next = Array.isArray(progress.nextRequirements) ? progress.nextRequirements : [];
  const itemsByColumn = new Map();
  [...overdue, ...thisWeek].forEach(item => itemsByColumn.set(item.trackerColumn || item.name, item));
  let items = Array.from(itemsByColumn.values()).sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)));
  let mode = 'Current requirements';
  if (!items.length && next.length) {
    items = next;
    mode = 'Next requirements';
  }
  if (empty) {
    empty.textContent = items.length ? '' : 'You have no outstanding badge requirements scheduled.';
    empty.classList.toggle('hidden', items.length > 0);
  }

  items.slice(0, 10).forEach(requirement => {
    const complete = Boolean(requirement.earned);
    const overdueItem = requirement.status === 'overdue';
    const dueToday = requirement.status === 'due_today';
    const card = document.createElement('div');
    card.className = `flex items-center gap-3 rounded-xl border p-3 ${complete ? 'border-green-200 bg-green-50' : overdueItem ? 'border-red-200 bg-red-50' : 'border-amber-200 bg-amber-50'}`;
    const icon = document.createElement('div');
    icon.className = `flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${complete ? 'bg-green-100 text-green-700' : overdueItem ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`;
    icon.innerHTML = `<i data-lucide="${complete ? 'circle-check-big' : overdueItem ? 'triangle-alert' : 'calendar-days'}" class="h-5 w-5"></i>`;
    const copy = document.createElement('div');
    copy.className = 'min-w-0 flex-1';
    const title = document.createElement('p');
    title.className = 'text-sm font-semibold text-slate-800';
    title.textContent = requirement.name || 'Badge requirement';
    const meta = document.createElement('p');
    meta.className = `mt-0.5 text-xs ${complete ? 'text-green-700' : overdueItem ? 'text-red-600' : 'text-amber-700'}`;
    meta.textContent = complete
      ? `Completed · Due ${requirement.dueDateDisplay || requirement.dueDate}`
      : `${dueToday ? 'Due today' : overdueItem ? 'Overdue' : mode === 'Next requirements' ? 'Next due' : 'Due this week'} · ${requirement.dueDateDisplay || requirement.dueDate}`;
    copy.append(title, meta);
    card.append(icon, copy);
    list.appendChild(card);
  });
  if (items.length > 10) {
    const more = document.createElement('p');
    more.className = 'text-center text-xs font-medium text-slate-500';
    more.textContent = `+${items.length - 10} more requirement${items.length - 10 === 1 ? '' : 's'}`;
    list.appendChild(more);
  }
  lucide.createIcons({ root: list });
};

window.renderEarnedBadges = function renderEarnedBadges(badges = [], badgeSync = {}) {
  const list = document.getElementById('earnedBadgesList');
  const empty = document.getElementById('earnedBadgesEmpty');
  const status = document.getElementById('badgeSyncStatus');
  const profileCount = document.getElementById('profileBadgeCount');
  if (profileCount) profileCount.textContent = `${badges.length} badge${badges.length === 1 ? '' : 's'} found`;
  if (status) {
    if (badgeSync.status === 'success') {
      status.textContent = `Last synced ${badgeSync.lastSynced || 'recently'} · ${badgeSync.matchedCount || 0} matched tracker badges`;
      status.className = 'text-xs text-green-700';
    } else if (badgeSync.status === 'error') {
      status.textContent = badgeSync.message || 'Badge sync failed.';
      status.className = 'text-xs text-red-600';
    } else {
      status.textContent = badgeSync.message || 'Save a public Google Skills profile URL to sync badges.';
      status.className = 'text-xs text-slate-500';
    }
  }
  if (!list) return;
  list.innerHTML = '';
  if (empty) empty.classList.toggle('hidden', badges.length > 0);
  badges.forEach(badge => {
    const card = document.createElement(badge.url ? 'a' : 'div');
    if (badge.url) {
      card.href = badge.url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    }
    card.className = 'flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-blue-200 hover:bg-blue-50/40';
    const icon = document.createElement('div');
    icon.className = 'flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-100 text-blue-700';
    if (badge.imageUrl) {
      const image = document.createElement('img');
      image.src = badge.imageUrl;
      image.alt = '';
      image.loading = 'lazy';
      image.referrerPolicy = 'no-referrer';
      image.className = 'h-full w-full object-cover';
      icon.appendChild(image);
    } else {
      icon.innerHTML = '<i data-lucide="award" class="h-5 w-5"></i>';
    }
    const copy = document.createElement('div');
    copy.className = 'min-w-0';
    const title = document.createElement('p');
    title.className = 'text-sm font-semibold text-slate-800';
    title.textContent = badge.name || 'Google Skills badge';
    const meta = document.createElement('p');
    meta.className = 'mt-0.5 text-xs text-slate-500';
    meta.textContent = badge.earnedAt || (badge.dueDateDisplay ? `Recorded in tracker · Due ${badge.dueDateDisplay}` : badge.matched ? 'Recorded in Badge Tracker' : 'Imported from public profile');
    copy.append(title, meta);
    card.append(icon, copy);
    list.appendChild(card);
  });
  lucide.createIcons({ root: list });
};

window.renderPortalLinks = function renderPortalLinks(links = {}) {
  document.querySelectorAll('[data-portal-link]').forEach(anchor => {
    const key = anchor.dataset.portalLink;
    const item = links[key];
    const label = anchor.querySelector('[data-link-label]');
    const description = anchor.querySelector('[data-link-description]');
    const state = anchor.querySelector('[data-link-state]');
    if (label) label.textContent = item && item.label || ({
      feedback_form_1: 'Feedback Form 1', feedback_form_2: 'Feedback Form 2',
      pca_sample: 'PCA Sample Questions',
      mock_exam_1: 'Mock Exam 1', mock_exam_2: 'Mock Exam 2'
    })[key] || 'Portal link';
    if (description) description.textContent = item && item.description || 'The trainer has not published this link yet.';
    if (item && item.url) {
      anchor.href = item.url;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.removeAttribute('aria-disabled');
      anchor.classList.remove('opacity-50', 'pointer-events-none');
      if (state) state.textContent = 'Open';
    } else {
      anchor.removeAttribute('href');
      anchor.removeAttribute('target');
      anchor.setAttribute('aria-disabled', 'true');
      anchor.classList.add('opacity-50', 'pointer-events-none');
      if (state) state.textContent = 'Not published';
    }
  });
};

window.renderWeeklyResources = function renderWeeklyResources(resources = [], calendar = {}) {
  const targets = ['dashboardWeeklyResources', 'calendarWeeklyResources'];
  targets.forEach(id => {
    const list = document.getElementById(id);
    if (!list) return;
    list.innerHTML = '';
    if (!resources.length) {
      const empty = document.createElement('p');
      empty.className = 'rounded-xl bg-slate-50 p-4 text-sm text-slate-500';
      empty.textContent = 'No resources have been published for the current week.';
      list.appendChild(empty);
      return;
    }
    resources.forEach(resource => {
      const course = (calendar.events || []).find(event => event.courseId === resource.courseId);
      const card = document.createElement('article');
      card.className = 'flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50/50';
      card.innerHTML = '<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700"><i data-lucide="link-2" class="h-5 w-5"></i></div>';
      const copy = document.createElement('div');
      copy.className = 'min-w-0 flex-1';
      const title = document.createElement('p');
      title.className = 'text-sm font-semibold text-slate-900';
      title.textContent = resource.title;
      const meta = document.createElement('p');
      meta.className = 'mt-1 text-xs text-slate-500';
      meta.textContent = resource.description || (course ? course.course : resource.courseId || 'General resource');
      const actions = document.createElement('div');
      actions.className = 'mt-3 flex flex-wrap gap-2';
      const addAction = (url, label, iconName, className) => {
        if (!url) return;
        const action = document.createElement('a');
        action.href = url;
        action.target = '_blank';
        action.rel = 'noopener noreferrer';
        action.className = className;
        action.innerHTML = `<i data-lucide="${iconName}" class="h-3.5 w-3.5"></i><span></span>`;
        action.querySelector('span').textContent = label;
        actions.appendChild(action);
      };
      const actionClass = 'inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700';
      const fileClass = 'inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700';
      addAction(resource.url, 'Open link', 'external-link', actionClass);
      addAction(resource.fileUrl, 'Open file', 'paperclip', fileClass);
      if (!resource.url && !resource.fileUrl) {
        addAction(resource.openUrl, 'Open resource', 'external-link', actionClass);
      }
      if (resource.fileName) {
        const fileName = document.createElement('p');
        fileName.className = 'mt-2 truncate text-[11px] text-slate-400';
        fileName.textContent = resource.fileName;
        copy.append(title, meta, actions, fileName);
      } else {
        copy.append(title, meta, actions);
      }
      card.appendChild(copy);
      list.appendChild(card);
    });
    lucide.createIcons({ root: list });
  });
};

function projectEscapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
}

function projectLink(label, url) {
  const safeUrl = String(url || '').trim();
  if (!/^https?:\/\/[^\s]+$/i.test(safeUrl)) return '';
  return `<a href="${projectEscapeHtml(safeUrl)}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100">${projectEscapeHtml(label)} <span aria-hidden="true">↗</span></a>`;
}

window.renderProjectWorkspace = function renderProjectWorkspace(workspace = {}) {
  window.studentProjectWorkspace = workspace || {};
  const host = document.getElementById('projectWorkspace');
  if (!host) return;
  const group = workspace.group;
  const members = Array.isArray(workspace.members) ? workspace.members : [];
  const peers = Array.isArray(workspace.peers) ? workspace.peers : [];
  const assignments = Array.isArray(workspace.assignments) ? workspace.assignments : [];
  host.innerHTML = '';
  if (!group) {
    host.innerHTML = `<div class="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><i data-lucide="users-round" class="h-6 w-6"></i></div><h3 class="mt-4 font-bold text-slate-900">No project group assigned</h3><p class="mt-2 text-sm text-slate-500">${projectEscapeHtml(workspace.message || 'Your instructor has not assigned you to a group yet.')}</p></div>`;
    lucide.createIcons({ root: host });
    return;
  }
  const summary = document.createElement('article');
  summary.className = 'rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-600 to-indigo-800 p-6 text-white shadow-lg';
  summary.innerHTML = `<p class="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">Your project group</p><h3 class="mt-2 text-2xl font-bold">${projectEscapeHtml(group.name)}</h3><p class="mt-1 text-sm text-blue-100/80">${projectEscapeHtml(group.notes || `${members.length} active member${members.length === 1 ? '' : 's'}`)}</p><div class="mt-5 flex flex-wrap gap-2">${members.map(member => `<span class="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">${projectEscapeHtml(member.name || member.email)}${member.role && member.role !== 'Member' ? ` · ${projectEscapeHtml(member.role)}` : ''}</span>`).join('')}</div>`;
  host.appendChild(summary);
  if (!assignments.length) {
    const empty = document.createElement('div');
    empty.className = 'mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-7 text-center text-sm text-slate-500';
    empty.textContent = workspace.message || 'No published project has been assigned to this group yet.';
    host.appendChild(empty);
    lucide.createIcons({ root: host });
    return;
  }
  const list = document.createElement('div');
  list.className = 'mt-5 grid gap-6';
  assignments.forEach(assignment => {
    const project = assignment.project || {};
    const latest = assignment.latestSubmission || null;
    const evaluated = Array.isArray(assignment.evaluatedPeerEmails) ? assignment.evaluatedPeerEmails : [];
    const card = document.createElement('article');
    card.className = 'rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7';
    card.dataset.projectAssignment = assignment.assignmentId || '';
    const requirementText = String(project.submissionRequirements || '').split(/\n+/).filter(Boolean);
    const latestLinks = latest ? [projectLink('Submission', latest.submissionUrl), projectLink('Deck', latest.deckUrl), projectLink('Demo', latest.demoUrl), projectLink('Repository', latest.repositoryUrl)].filter(Boolean).join('') : '';
    const detailLinks = [projectLink('Project brief', assignment.briefUrl), projectLink('Cloud console', assignment.consoleUrl)].filter(Boolean).join('');
    card.innerHTML = `
      <div class="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div><div class="flex flex-wrap gap-2"><span class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">${projectEscapeHtml(project.type || 'Project')}</span>${project.dueDateDisplay ? `<span class="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Due ${projectEscapeHtml(project.dueDateDisplay)}</span>` : ''}</div><h3 class="mt-3 text-xl font-bold text-slate-900">${projectEscapeHtml(project.name || assignment.projectId)}</h3><p class="mt-2 text-sm leading-6 text-slate-500">${projectEscapeHtml(project.description || assignment.useCase || 'Group project')}</p></div>
        <span class="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">${projectEscapeHtml(assignment.presentationOrder ? `Presentation ${assignment.presentationOrder}` : assignment.groupId || '')}</span>
      </div>
      <div class="mt-5 grid gap-5 lg:grid-cols-2">
        <div class="rounded-2xl bg-slate-50 p-4"><h4 class="text-sm font-bold text-slate-800">Group assignment</h4><p class="mt-2 text-sm leading-6 text-slate-600">${projectEscapeHtml(assignment.useCase || 'No group-specific use case has been added.')}</p>${assignment.trialAccount ? `<p class="mt-3 text-xs text-slate-500"><b>Trial account:</b> ${projectEscapeHtml(assignment.trialAccount)}</p>` : ''}<div class="mt-3 flex flex-wrap gap-2">${detailLinks}</div></div>
        <div class="rounded-2xl bg-slate-50 p-4"><h4 class="text-sm font-bold text-slate-800">Delivery requirements</h4>${requirementText.length ? `<ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">${requirementText.map(line => `<li>${projectEscapeHtml(line)}</li>`).join('')}</ul>` : '<p class="mt-2 text-sm text-slate-500">No requirements have been entered.</p>'}<div class="mt-3 flex flex-wrap gap-2 text-xs"><span class="rounded-lg bg-white px-2.5 py-1.5 text-slate-600">Min. features: ${Number(project.minimumWorkingFeatures || 0)}</span><span class="rounded-lg bg-white px-2.5 py-1.5 text-slate-600">Presentation: ${Number(project.presentationMinutes || 0)} min</span><span class="rounded-lg bg-white px-2.5 py-1.5 text-slate-600">Q&amp;A: ${Number(project.qaMinutes || 0)} min</span>${project.creditLimit ? `<span class="rounded-lg bg-white px-2.5 py-1.5 text-slate-600">Credit ceiling: US$${Number(project.creditLimit)}</span>` : ''}</div></div>
      </div>
      <div class="mt-6 grid gap-6 xl:grid-cols-2">
        <div class="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4"><h4 class="font-bold text-slate-900">Group submission</h4><p class="mt-1 text-xs leading-5 text-slate-500">Any member can submit. New submissions remain in the group history.</p>${latest ? `<div class="mt-3 rounded-xl bg-white p-3"><p class="text-xs font-semibold text-emerald-700">Latest submission · ${projectEscapeHtml(latest.status || 'Submitted')}</p><div class="mt-2 flex flex-wrap gap-2">${latestLinks}</div>${latest.notes ? `<p class="mt-2 text-xs text-slate-500">${projectEscapeHtml(latest.notes)}</p>` : ''}</div>` : ''}<div class="mt-4 grid gap-3"><input data-field="submissionUrl" type="url" placeholder="Main submission / workbook URL" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><input data-field="deckUrl" type="url" placeholder="Presentation deck URL" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><input data-field="demoUrl" type="url" placeholder="POC / demo URL" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><input data-field="repositoryUrl" type="url" placeholder="Repository URL" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><textarea data-field="submissionNotes" rows="3" placeholder="Submission notes" class="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm"></textarea><button type="button" onclick="submitProjectSubmission(this)" class="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"><i data-lucide="upload-cloud" class="h-4 w-4"></i>Submit for group</button></div></div>
        <div class="rounded-2xl border border-violet-100 bg-violet-50/50 p-4"><h4 class="font-bold text-slate-900">Peer evaluation</h4><p class="mt-1 text-xs leading-5 text-slate-500">Only members of ${projectEscapeHtml(group.name)} appear here. Your rating is saved per teammate and can be updated.</p>${project.peerEvaluationEnabled === false ? '<p class="mt-4 rounded-xl bg-white p-3 text-sm text-slate-500">Peer evaluation is disabled for this project.</p>' : !peers.length ? '<p class="mt-4 rounded-xl bg-white p-3 text-sm text-slate-500">There are no other active members to evaluate.</p>' : `<div class="mt-4 grid gap-3"><select data-field="evaluateeEmail" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="">Choose teammate</option>${peers.map(peer => `<option value="${projectEscapeHtml(peer.email)}">${projectEscapeHtml(peer.name || peer.email)}${evaluated.includes(peer.email) ? ' · submitted' : ''}</option>`).join('')}</select><div class="grid grid-cols-2 gap-2 sm:grid-cols-5">${[['contribution','Contribution'],['collaboration','Collaboration'],['communication','Communication'],['reliability','Reliability'],['technicalContribution','Technical']].map(([field,label]) => `<label class="text-[11px] font-semibold text-slate-600">${label}<select data-field="${field}" class="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-sm"><option value="5">5</option><option value="4">4</option><option value="3" selected>3</option><option value="2">2</option><option value="1">1</option></select></label>`).join('')}</div><textarea data-field="peerComments" rows="3" placeholder="Comments (required for any rating of 1 or 2)" class="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm"></textarea><button type="button" onclick="submitPeerEvaluation(this)" class="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-700"><i data-lucide="user-check" class="h-4 w-4"></i>Save peer evaluation</button></div>`}</div>
      </div>`;
    list.appendChild(card);
  });
  host.appendChild(list);
  lucide.createIcons({ root: host });
};

window.submitProjectSubmission = async function submitProjectSubmission(button) {
  const card = button && button.closest('[data-project-assignment]');
  if (!card) return;
  const value = field => (card.querySelector(`[data-field="${field}"]`) || {}).value || '';
  const payload = { assignmentId:card.dataset.projectAssignment, submissionUrl:value('submissionUrl').trim(), deckUrl:value('deckUrl').trim(), demoUrl:value('demoUrl').trim(), repositoryUrl:value('repositoryUrl').trim(), notes:value('submissionNotes').trim() };
  if (![payload.submissionUrl,payload.deckUrl,payload.demoUrl,payload.repositoryUrl].some(Boolean)) return window.showToast('Add at least one project link.', 'error');
  window.setButtonLoading(button, true);
  window.showLoading('Submitting your group project…');
  try {
    const result = await apiPost('submit_project_submission', payload);
    window.renderProjectWorkspace(result.data || {});
    window.showToast(result.message || 'Group project submitted.', 'success');
  } catch (error) { window.showToast(error.message, 'error'); }
  finally { window.setButtonLoading(button, false); window.hideLoading(); }
};

window.submitPeerEvaluation = async function submitPeerEvaluation(button) {
  const card = button && button.closest('[data-project-assignment]');
  if (!card) return;
  const value = field => (card.querySelector(`[data-field="${field}"]`) || {}).value || '';
  const payload = { assignmentId:card.dataset.projectAssignment, evaluateeEmail:value('evaluateeEmail'), contribution:Number(value('contribution')), collaboration:Number(value('collaboration')), communication:Number(value('communication')), reliability:Number(value('reliability')), technicalContribution:Number(value('technicalContribution')), comments:value('peerComments').trim() };
  if (!payload.evaluateeEmail) return window.showToast('Choose a teammate to evaluate.', 'error');
  window.setButtonLoading(button, true);
  window.showLoading('Saving your peer evaluation…');
  try {
    const result = await apiPost('submit_peer_evaluation', payload);
    window.renderProjectWorkspace(result.data || {});
    window.showToast(result.message || 'Peer evaluation saved.', 'success');
  } catch (error) { window.showToast(error.message, 'error'); }
  finally { window.setButtonLoading(button, false); window.hideLoading(); }
};

window.renderExamResults = function renderExamResults(examResults = {}) {
  const history = document.getElementById('examResultHistory');
  if (!history) return;
  const items = Array.isArray(examResults.history) ? examResults.history : [];
  history.innerHTML = '';
  if (!items.length) {
    history.innerHTML = '<p class="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No exam results submitted yet.</p>';
    return;
  }
  const labels = { pca_sample: 'PCA Sample Questions', mock_exam_1: 'Mock Exam 1', mock_exam_2: 'Mock Exam 2' };
  items.slice(0, 5).forEach(item => {
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3';
    const submitted = item.submittedAt ? new Date(item.submittedAt) : null;
    row.innerHTML = `<div><p class="text-sm font-semibold text-slate-800"></p><p class="mt-0.5 text-xs text-slate-500"></p></div><span class="rounded-lg bg-purple-100 px-3 py-1.5 text-sm font-bold text-purple-700"></span>`;
    row.querySelector('p').textContent = labels[item.type] || item.type;
    row.querySelectorAll('p')[1].textContent = submitted && !Number.isNaN(submitted.getTime()) ? submitted.toLocaleString('en-SG') : 'Submitted';
    row.querySelector('span').textContent = `${item.score}/${item.maxScore || 100}`;
    history.appendChild(row);
  });
};

async function apiPost(action, extra = {}) {
  if (!window.GAS_URL) throw new Error('Apps Script URL is not configured.');
  if (window.getFirebaseToken) window.firebaseIdToken = await window.getFirebaseToken();
  const response = await fetch(window.GAS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      apiKey: window.API_KEY,
      authToken: window.firebaseIdToken,
      action,
      studentName: window.verifiedStudentName,
      email: window.verifiedStudentEmail,
      classId: window.selectedStudentClassId,
      ...extra
    })
  });
  if (!response.ok) throw new Error(`Apps Script returned HTTP ${response.status}.`);
  const result = await response.json();
  if (result.status !== 'success') throw new Error(result.message || 'The request failed.');
  return result;
}

window.loadStudentData = async function loadStudentData(email) {
  window.showLoading('Loading your dashboard…');
  try {
    if (window.getFirebaseToken) window.firebaseIdToken = await window.getFirebaseToken();
    const url = new URL(window.GAS_URL);
    url.searchParams.set('apiKey', window.API_KEY);
    url.searchParams.set('action', 'get_student');
    url.searchParams.set('email', email);
    url.searchParams.set('authToken', window.firebaseIdToken);
    if (window.selectedStudentClassId && window.studentClassManuallySelected) {
      url.searchParams.set('classId', window.selectedStudentClassId);
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Dashboard data returned HTTP ${response.status}.`);
    const result = await response.json();
    if (result.status !== 'success') throw new Error(result.message || 'Dashboard data could not be loaded.');
    const data = result.data;
    const progress = data.progress || {};
    window.renderStudentClassSelector(data.classes || [], data.selectedClass || {});
    const set = (id, value) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    };
    const skills = document.getElementById('skillsUrl');
    if (skills && data.profileUrl) skills.value = data.profileUrl;
    set('badgeProgress', `${progress.progress == null ? 0 : progress.progress}%`);
    set('badgeCount', progress.scheduleEnabled
      ? `${progress.completedCount || 0}/${progress.totalCount || 0} due badges earned`
      : `${progress.completedCount || 0}/${progress.totalCount || 0} earned`);
    set('examStatus', data.exam && data.exam.status || 'Not scheduled');
    set('pcaScore', `Score: ${progress.pcaScore || '—'}`);
    set('mock1Score', progress.mock1Score || '—');
    set('mock2Score', progress.mock2Score || '—');
    window.renderCourseCalendar(data.calendar || {});
    window.renderWeeklyResources(data.weeklyResources || [], data.calendar || {});
    window.renderPortalLinks(data.portalLinks || {});
    window.renderExamResults(data.examResults || {});
    window.renderProjectWorkspace(data.projects || {});
    window.renderBadgeRequirements(progress);
    window.renderEarnedBadges(data.badges || progress.badges || [], data.badgeSync || {});
  } catch (error) {
    console.warn(error);
    window.showToast('Signed in, but progress data could not be loaded. Deploy the included Code.gs version.', 'error');
  } finally {
    window.hideLoading();
  }
};

window.submitExamResult = async function submitExamResult() {
  if (!window.verifiedStudentName) return window.showToast('Please sign in first.', 'error');
  const button = document.getElementById('examResultBtn');
  const examType = document.getElementById('examResultType').value;
  const scoreValue = document.getElementById('examResultScore').value;
  const score = Number(scoreValue);
  const resultUrl = document.getElementById('examResultUrl').value.trim();
  const notes = document.getElementById('examResultNotes').value.trim();
  if (scoreValue === '' || !Number.isFinite(score) || score < 0 || score > 100) {
    return window.showToast('Enter a score between 0 and 100.', 'error');
  }
  if (resultUrl) {
    try { new URL(resultUrl); } catch { return window.showToast('Enter a valid result link or leave it blank.', 'error'); }
  }
  window.setButtonLoading(button, true);
  window.showLoading('Submitting your exam result…');
  try {
    const result = await apiPost('submit_exam_result', { examType, score, resultUrl, notes });
    window.renderExamResults(result.data || {});
    window.showToast(result.message || 'Exam result submitted.', 'success');
    document.getElementById('examResultScore').value = '';
    document.getElementById('examResultUrl').value = '';
    document.getElementById('examResultNotes').value = '';
    await window.loadStudentData(window.verifiedStudentEmail);
  } catch (error) {
    window.showToast(error.message, 'error');
  } finally {
    window.setButtonLoading(button, false);
    window.hideLoading();
  }
};

window.syncBadges = async function syncBadges() {
  if (!window.verifiedStudentName) return window.showToast('Please sign in first.', 'error');
  const button = document.getElementById('syncBadgesBtn');
  window.setButtonLoading(button, true);
  window.showLoading('Syncing your badges…');
  try {
    const result = await apiPost('sync_badges');
    window.renderEarnedBadges(result.data && result.data.badges || [], result.data && result.data.badgeSync || {});
    window.showToast(result.message || 'Badges synced.', 'success');
    await window.loadStudentData(window.verifiedStudentEmail);
  } catch (error) {
    console.error(error);
    window.showToast(error.message, 'error');
  } finally {
    window.setButtonLoading(button, false);
    window.hideLoading();
  }
};

function fileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(new Error('The selected file could not be read.'));
    reader.readAsDataURL(file);
  });
}

window.submitAttendance = async function submitAttendance() {
  if (!window.verifiedStudentName) return window.showToast('Please sign in first.', 'error');
  const button = document.getElementById('submitBtn');
  const file = document.getElementById('mcFile').files[0];
  const checkpoint = document.getElementById('attendanceSession');
  const selectedOption = checkpoint.options[checkpoint.selectedIndex];
  const courseId = checkpoint.value;
  const session = selectedOption && selectedOption.dataset.session || '';
  const comment = document.getElementById('attendanceComment').value.trim();
  if (!courseId) return window.showToast('No attendance checkpoint is available right now.', 'error');
  if (file && file.size > 5 * 1024 * 1024) return window.showToast('MC attachment must be 5 MB or smaller.', 'error');
  window.setButtonLoading(button, true);
  window.showLoading(file ? 'Uploading your attendance record…' : 'Submitting your attendance…');
  try {
    const payload = { courseId, session, comment, isMC: Boolean(file) };
    if (file) Object.assign(payload, { fileName: file.name, mimeType: file.type, fileData: await fileAsBase64(file) });
    const result = await apiPost('student_checkin', payload);
    window.showToast(result.message || 'Check-in recorded.', 'success');
    document.getElementById('attendanceComment').value = '';
    document.getElementById('mcFile').value = '';
    window.updateFileName(document.getElementById('mcFile'));
    await window.loadStudentData(window.verifiedStudentEmail);
  } catch (error) {
    console.error(error);
    window.showToast(error.message, 'error');
  } finally {
    window.setButtonLoading(button, false);
    window.hideLoading();
  }
};

window.submitForm = async function submitForm(action) {
  if (!window.verifiedStudentName) return window.showToast('Please sign in first.', 'error');
  let button;
  const payload = {};
  if (action === 'register_pca_exam') {
    button = document.getElementById('pcaBtn');
    payload.examDate = document.getElementById('examDate').value;
    payload.examVenue = document.getElementById('examVenue').value.trim();
    if (!payload.examDate || !payload.examVenue) return window.showToast('Enter the exam date and venue.', 'error');
  } else if (action === 'submit_feedback') {
    button = document.getElementById('feedbackBtn');
    payload.feedbackType = document.getElementById('feedbackType').value;
    payload.feedbackText = document.getElementById('feedbackText').value.trim();
    if (!payload.feedbackText) return window.showToast('Write your feedback before submitting.', 'error');
  } else if (action === 'save_profile') {
    button = document.getElementById('saveProfileBtn');
    payload.skillsUrl = document.getElementById('skillsUrl').value.trim();
    try { new URL(payload.skillsUrl); } catch { return window.showToast('Enter a valid profile URL.', 'error'); }
  }
  window.setButtonLoading(button, true);
  const loadingMessages = {
    register_pca_exam: 'Saving your exam registration…',
    submit_feedback: 'Submitting your feedback…',
    save_profile: 'Saving and syncing your profile…'
  };
  window.showLoading(loadingMessages[action] || 'Saving your changes…');
  try {
    const result = await apiPost(action, payload);
    window.showToast(result.message || 'Saved.', 'success');
    if (action === 'submit_feedback') document.getElementById('feedbackText').value = '';
    if (action === 'save_profile') {
      if (result.data) window.renderEarnedBadges(result.data.badges || [], result.data.badgeSync || {});
      await window.loadStudentData(window.verifiedStudentEmail);
    }
  } catch (error) {
    console.error(error);
    window.showToast(error.message, 'error');
  } finally {
    window.setButtonLoading(button, false);
    window.hideLoading();
  }
};
