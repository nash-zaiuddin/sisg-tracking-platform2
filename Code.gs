const API_KEY = 'company_cloud_tracker_2026';
const TRACKER_SPREADSHEET_ID = '1bwKOhbzuQPwpTl0r7Go41K71_CrJTLBZWzDymZTzvyo';
const ATTENDANCE_SPREADSHEET_ID = '16JV0UMe4ZUPuKbeEY6mXHD0cgUcgu1FfvhB_f49MQxI';
const APP_URL = 'https://sisg-project.web.app/';
const TZ = 'Asia/Singapore';
const FIREBASE_WEB_API_KEY = 'AIzaSyCebQWOHHA89ANpKWVhhxODkgAG6EkWsjM';
const TRAINER_EMAILS = ['leo@street-smart.sg', 'nash@street-smart.sg', 'adlina@street-smart.sg', 'eddy@street-smart.sg'];
const BADGE_FIRST_COLUMN = 5; // E
const BADGE_LAST_COLUMN = 43; // AQ
const BADGE_COLUMN_SPEC_DEFAULT = 'ALL';
const TRAINEE_FIRST_ROW = 3;
const BADGE_SYNC_TTL_MS = 6 * 60 * 60 * 1000;
const ATTENDANCE_OPEN_LEAD_MINUTES = 30;
const NO_SHOW_GRACE_MINUTES = 30;
const RESOURCE_UPLOAD_MAX_BYTES = 8 * 1024 * 1024;
const DEFAULT_CLASS_ID = 'DEFAULT';
const PORTAL_LINK_KEYS = ['feedback_form_1', 'feedback_form_2', 'mock_exam_1', 'mock_exam_2'];
const CLASS_FEEDBACK_LINK_KEYS = ['feedback_form_1', 'feedback_form_2'];
const CLASS_EXAM_LINK_KEYS = ['pca_sample', 'mock_exam_1', 'mock_exam_2'];

const SHEETS = {
  roster: 'Roster',
  attendance: 'Attendance Logs',
  courses: 'Courses',
  exams: 'PCA Exams',
  feedback: 'Feedback Logs',
  profiles: 'Trainee Profiles',
  badges: 'Earned Badges',
  badgeSync: 'Badge Sync',
  portalSettings: 'Portal Settings',
  weeklyResources: 'Weekly Resources',
  examResults: 'Exam Results',
  badgeDefinitions: 'Badge Definitions',
  classes: 'Classes',
  classMembers: 'Class Members',
  classBadges: 'Class Badge Requirements',
  classFeedbackLinks: 'Class Feedback Links',
  classExamLinks: 'Class Exam Links',
  projectGroups: 'Project Groups',
  projectGroupMembers: 'Project Group Members',
  projects: 'Projects',
  groupProjects: 'Group Projects',
  projectSubmissions: 'Project Submissions',
  peerEvaluations: 'Peer Evaluations'
};

const HEADERS = {
  attendance: ['Log ID', 'Course ID', 'Student Email', 'Attendance', 'Acknowledged', 'Date', 'Time', 'Comment', 'File URL', 'Created At', 'Class ID', 'Source'],
  exams: ['Email', 'Trainee Name', 'Exam Date', 'Venue', 'Status', 'Voucher Code', 'Updated At'],
  feedback: ['Created At', 'Trainee Name', 'Email', 'Type', 'Message', 'Anonymous'],
  profiles: ['Email', 'Trainee Name', 'Skills Profile URL', 'Updated At'],
  badges: ['Email', 'Trainee Name', 'Badge ID', 'Badge Name', 'Badge URL', 'Image URL', 'Earned At', 'Tracker Column', 'Synced At', 'Profile URL'],
  badgeSync: ['Email', 'Trainee Name', 'Profile URL', 'Badge Count', 'Matched Count', 'Last Synced', 'Status', 'Message'],
  portalSettings: ['Key', 'Label', 'URL', 'Description', 'Published', 'Updated At'],
  weeklyResources: ['Resource ID', 'Week Start', 'Course ID', 'Title', 'URL', 'Description', 'Published', 'Updated At', 'Class ID', 'File URL', 'File Name', 'Created At', 'Archived'],
  examResults: ['Submission ID', 'Email', 'Trainee Name', 'Exam Type', 'Score', 'Max Score', 'Result URL', 'Notes', 'Submitted At'],
  badgeDefinitions: ['Badge ID', 'Tracker Column', 'Badge Name', 'Badge URL', 'Default Due Date', 'Active', 'Created At', 'Updated At'],
  classes: ['Class ID', 'Class Name', 'Active', 'Student Portal Enabled', 'Attendance Enabled', 'Badges Enabled', 'Resources Enabled', 'Mock Exams Enabled', 'Updated At', 'Badge Columns', 'Badge Assignment Mode'],
  classMembers: ['Class ID', 'Student Email', 'Student Name', 'Active', 'Updated At'],
  classBadges: ['Class ID', 'Tracker Column', 'Badge Key', 'Badge Name', 'Required', 'Due Date Override', 'Sort Order', 'Updated At'],
  classFeedbackLinks: ['Class ID', 'Feedback Type', 'Label', 'URL', 'Description', 'Published', 'Updated At'],
  classExamLinks: ['Class ID', 'Exam Type', 'Label', 'URL', 'Description', 'Published', 'Updated At'],
  projectGroups: ['Group Key', 'Class ID', 'Group ID', 'Group Name', 'Active', 'Notes', 'Updated At'],
  projectGroupMembers: ['Membership ID', 'Class ID', 'Group ID', 'Student Email', 'Student Name', 'Active', 'Role', 'Updated At'],
  projects: ['Project Key', 'Class ID', 'Project ID', 'Project Name', 'Project Type', 'Description', 'Due Date', 'Submission Requirements', 'Minimum Working Features', 'Presentation Minutes', 'Q&A Minutes', 'Credit Limit', 'Published', 'Peer Evaluation Enabled', 'Updated At'],
  groupProjects: ['Assignment ID', 'Class ID', 'Group ID', 'Project ID', 'Use Case', 'Brief URL', 'Trial Account', 'Console URL', 'Presentation Order', 'Notes', 'Active', 'Updated At'],
  projectSubmissions: ['Submission ID', 'Assignment ID', 'Project ID', 'Class ID', 'Group ID', 'Submitted By Email', 'Submitted By Name', 'Submission URL', 'Deck URL', 'Demo URL', 'Repository URL', 'Notes', 'Status', 'Submitted At', 'Updated At'],
  peerEvaluations: ['Evaluation ID', 'Assignment ID', 'Project ID', 'Class ID', 'Group ID', 'Evaluator Email', 'Evaluator Name', 'Evaluatee Email', 'Evaluatee Name', 'Contribution', 'Collaboration', 'Communication', 'Reliability', 'Technical Contribution', 'Comments', 'Submitted At', 'Updated At'],
  courses: ['Course ID', 'Course', 'Description', 'Lesson Mode', 'Date', 'Day', 'Start Time', 'Image', 'Attendance Time', 'Check-in Opens', 'Attendance Enabled', 'Portal Status', 'Attendance Label', 'Class ID']
};

const PORTAL_LINK_DEFAULTS = {
  feedback_form_1: ['Feedback Form 1', 'Complete the first published feedback form.'],
  feedback_form_2: ['Feedback Form 2', 'Complete the second published feedback form.'],
  mock_exam_1: ['Mock Exam 1', 'Open the first mock examination.'],
  mock_exam_2: ['Mock Exam 2', 'Open the second mock examination.']
};

const CLASS_EXAM_LINK_DEFAULTS = {
  pca_sample: ['PCA Sample Questions', 'Open the PCA sample-question test for this class.'],
  mock_exam_1: ['Mock Exam 1', 'Open the first mock examination for this class.'],
  mock_exam_2: ['Mock Exam 2', 'Open the second mock examination for this class.']
};

const CLASS_FEEDBACK_LINK_DEFAULTS = {
  feedback_form_1: ['Feedback Form 1', 'Complete the first feedback form for this class.'],
  feedback_form_2: ['Feedback Form 2', 'Complete the second feedback form for this class.']
};

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function ok_(data, message) {
  return json_({ status: 'success', data: data == null ? null : data, message: message || '' });
}

function fail_(error) {
  const message = error && error.message ? error.message : String(error);
  return json_({ status: 'error', message: message.replace(/^Error:\s*/, '') });
}

function requireApiKey_(key) {
  if (key !== API_KEY) throw new Error('Unauthorized access.');
}

function firebaseIdentity_(token) {
  if (!token) throw new Error('Missing Firebase authentication token.');
  const response = UrlFetchApp.fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + encodeURIComponent(FIREBASE_WEB_API_KEY), {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ idToken: token }),
    muteHttpExceptions: true
  });
  if (response.getResponseCode() !== 200) throw new Error('Firebase session is invalid or expired. Sign in again.');
  const body = JSON.parse(response.getContentText());
  if (!body.users || !body.users[0] || !body.users[0].email) throw new Error('Authenticated email is unavailable.');
  return { email: String(body.users[0].email).toLowerCase(), uid: body.users[0].localId };
}

function requireIdentity_(request, trainerOnly) {
  requireApiKey_(request.apiKey);
  const identity = firebaseIdentity_(request.authToken);
  if (trainerOnly && TRAINER_EMAILS.indexOf(identity.email) < 0) throw new Error('Trainer access required.');
  return identity;
}

let _trackerSpreadsheet_ = null;
function tracker_() {
  if (!_trackerSpreadsheet_) _trackerSpreadsheet_ = SpreadsheetApp.openById(TRACKER_SPREADSHEET_ID);
  return _trackerSpreadsheet_;
}

let _attendanceSpreadsheet_ = null;
function attendance_() {
  if (!_attendanceSpreadsheet_) _attendanceSpreadsheet_ = SpreadsheetApp.openById(ATTENDANCE_SPREADSHEET_ID);
  return _attendanceSpreadsheet_;
}

function getOrCreateSheet_(spreadsheet, name, headers) {
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) sheet = spreadsheet.insertSheet(name);
  if (headers) {
    if (sheet.getMaxColumns() < headers.length) {
      sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
    }
    const currentHeaders = sheet.getLastRow() ? sheet.getRange(1, 1, 1, headers.length).getDisplayValues()[0] : [];
    const needsHeaders = headers.some(function (header, index) { return currentHeaders[index] !== header; });
    if (needsHeaders) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  if (headers && sheet.getLastRow() <= 1) {
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function rows_(sheet, width) {
  const count = sheet.getLastRow() - 1;
  return count > 0 ? sheet.getRange(2, 1, count, width).getValues() : [];
}

function date_(value) {
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? '' : Utilities.formatDate(parsed, TZ, 'yyyy-MM-dd');
}

function time_(value) {
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? '' : Utilities.formatDate(parsed, TZ, 'HH:mm:ss');
}

function getRosterMap() {
  const sheet = attendance_().getSheetByName(SHEETS.roster);
  if (!sheet) throw new Error("Create a 'Roster' tab with Name and Email columns.");
  const values = sheet.getDataRange().getDisplayValues();
  const result = {};
  for (let i = 1; i < values.length; i++) {
    const name = String(values[i][0] || '').trim();
    const email = String(values[i][1] || '').trim().toLowerCase();
    if (name && email) result[name] = email;
  }
  return result;
}

function booleanValue_(value, fallback) {
  if (value === '' || value == null) return fallback === true;
  if (value === true || value === false) return value;
  return String(value).trim().toUpperCase() === 'TRUE';
}

function normaliseClassId_(value, allowBlank) {
  const clean = String(value || '').trim().toUpperCase()
    .replace(/[^A-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  if (!clean && !allowBlank) throw new Error('Class ID is required.');
  return clean;
}

function normaliseCourseId_(value) {
  return String(value == null ? '' : value).trim();
}

function columnNumber_(letter) {
  const clean = String(letter || '').trim().toUpperCase();
  if (!/^[A-Z]+$/.test(clean)) return 0;
  let result = 0;
  for (let index = 0; index < clean.length; index++) {
    result = result * 26 + clean.charCodeAt(index) - 64;
  }
  return result;
}

function normaliseBadgeColumnSpec_(value) {
  const source = String(value == null ? BADGE_COLUMN_SPEC_DEFAULT : value).trim().toUpperCase();
  if (!source || source === 'ALL' || source === '*') return BADGE_COLUMN_SPEC_DEFAULT;
  const tokens = source.replace(/\s+/g, '').split(/[,;]+/).filter(Boolean);
  if (!tokens.length) return BADGE_COLUMN_SPEC_DEFAULT;
  const result = [];
  tokens.forEach(function (token) {
    const match = token.match(/^([A-Z]+)(?::([A-Z]+))?$/);
    if (!match) throw new Error('Badge columns must use values such as E:X, Y:AQ or E,G,J.');
    const first = columnNumber_(match[1]);
    const last = columnNumber_(match[2] || match[1]);
    if (first < BADGE_FIRST_COLUMN || last > BADGE_LAST_COLUMN || first > last) {
      throw new Error('Badge columns must stay within E:AQ.');
    }
    const canonical = columnLetter_(first) + (last === first ? '' : ':' + columnLetter_(last));
    if (result.indexOf(canonical) < 0) result.push(canonical);
  });
  return result.join(',');
}

function safeBadgeColumnSpec_(value) {
  try {
    return normaliseBadgeColumnSpec_(value);
  } catch (_) {
    return BADGE_COLUMN_SPEC_DEFAULT;
  }
}

function badgeColumnAllowed_(column, spec) {
  const canonical = safeBadgeColumnSpec_(spec);
  if (canonical === BADGE_COLUMN_SPEC_DEFAULT) return true;
  const target = Number(column);
  return canonical.split(',').some(function (token) {
    const ends = token.split(':').map(columnNumber_);
    return target >= ends[0] && target <= (ends[1] || ends[0]);
  });
}

function normaliseBadgeAssignmentMode_(value) {
  const mode = String(value || '').trim().toUpperCase();
  return ['EXPLICIT', 'MANAGED', 'INDIVIDUAL'].indexOf(mode) >= 0 ? 'EXPLICIT' : 'LEGACY';
}

let _classBadgeSheetCache_ = null;
function ensureClassBadgeSheet_() {
  if (!_classBadgeSheetCache_) _classBadgeSheetCache_ = getOrCreateSheet_(attendance_(), SHEETS.classBadges, HEADERS.classBadges);
  return _classBadgeSheetCache_;
}

function readClassBadgeAssignments_(classId) {
  const requested = normaliseClassId_(classId, true);
  return rows_(ensureClassBadgeSheet_(), HEADERS.classBadges.length).map(function (row) {
    const dueDateOverride = trackerDueDateKey_(row[5], row[5]);
    return {
      classId: normaliseClassId_(row[0], true),
      trackerColumn: String(row[1] || '').trim().toUpperCase(),
      badgeKey: String(row[2] || '').trim() || normaliseBadgeKey_(row[3]),
      badgeName: String(row[3] || '').trim(),
      required: booleanValue_(row[4], true),
      dueDateOverride: dueDateOverride,
      dueDateOverrideDisplay: displayDateKey_(dueDateOverride),
      sortOrder: Number(row[6]) || 0,
      updatedAt: row[7] ? String(row[7]) : ''
    };
  }).filter(function (item) {
    return item.classId && item.trackerColumn && item.required && (!requested || item.classId === requested);
  }).sort(function (left, right) {
    return left.sortOrder - right.sortOrder || columnNumber_(left.trackerColumn) - columnNumber_(right.trackerColumn);
  });
}

function badgeCatalog_() {
  return trackerBadgeDefinitions_(tracker_().getSheets()[0]).map(function (definition, index) {
    return {
      badgeId: definition.badgeId,
      badgeKey: definition.key,
      name: definition.name,
      url: definition.url || '',
      trackerColumn: definition.columnLetter,
      dueDate: definition.dueDate,
      dueDateDisplay: definition.dueDateDisplay,
      active: definition.active !== false,
      sortOrder: index + 1
    };
  });
}

function attendanceCheckpointKey_(email, attendanceDate, classId, courseId) {
  return [
    String(email || '').trim().toLowerCase(),
    String(attendanceDate || '').trim(),
    normaliseClassId_(classId || DEFAULT_CLASS_ID, true) || DEFAULT_CLASS_ID,
    normaliseCourseId_(courseId)
  ].join('|');
}

let _classSheetsCache_ = null;
function ensureClassSheets_() {
  if (_classSheetsCache_) return _classSheetsCache_;
  const classes = getOrCreateSheet_(attendance_(), SHEETS.classes, HEADERS.classes);
  const members = getOrCreateSheet_(attendance_(), SHEETS.classMembers, HEADERS.classMembers);
  ensureClassBadgeSheet_();
  const existingDefault = rows_(classes, HEADERS.classes.length).some(function (row) {
    return String(row[0] || '').trim().toUpperCase() === DEFAULT_CLASS_ID;
  });
  if (!existingDefault) {
    classes.appendRow([DEFAULT_CLASS_ID, 'Default Class', true, true, true, true, true, true, new Date(), BADGE_COLUMN_SPEC_DEFAULT, 'LEGACY']);
  }
  _classSheetsCache_ = { classes: classes, members: members };
  return _classSheetsCache_;
}

function readClasses_(includeInactive) {
  const sheets = ensureClassSheets_();
  const badgeAssignments = readClassBadgeAssignments_();
  return rows_(sheets.classes, HEADERS.classes.length).map(function (row) {
    const id = normaliseClassId_(row[0], true);
    const explicitAssignments = badgeAssignments.filter(function (item) { return item.classId === id; });
    return {
      id: id,
      name: String(row[1] || row[0] || '').trim(),
      active: booleanValue_(row[2], true),
      portalEnabled: booleanValue_(row[3], true),
      attendanceEnabled: booleanValue_(row[4], true),
      badgesEnabled: booleanValue_(row[5], true),
      resourcesEnabled: booleanValue_(row[6], true),
      mockExamsEnabled: booleanValue_(row[7], true),
      updatedAt: row[8] ? String(row[8]) : '',
      badgeColumns: safeBadgeColumnSpec_(row[9]),
      badgeMode: normaliseBadgeAssignmentMode_(row[10]),
      badgeRequirements: explicitAssignments,
      badgeRequirementCount: normaliseBadgeAssignmentMode_(row[10]) === 'EXPLICIT'
        ? explicitAssignments.length
        : null
    };
  }).filter(function (item) {
    return item.id && item.name && (includeInactive || item.active);
  });
}

function classById_(classId, includeInactive) {
  const id = normaliseClassId_(classId || DEFAULT_CLASS_ID, false);
  const item = readClasses_(includeInactive === true).find(function (entry) { return entry.id === id; });
  if (!item) throw new Error('Class was not found: ' + id);
  return item;
}

function readClassMemberships_() {
  const sheet = ensureClassSheets_().members;
  return rows_(sheet, HEADERS.classMembers.length).map(function (row) {
    return {
      classId: normaliseClassId_(row[0], true),
      email: String(row[1] || '').trim().toLowerCase(),
      name: String(row[2] || '').trim(),
      active: booleanValue_(row[3], true),
      updatedAt: row[4] ? String(row[4]) : ''
    };
  }).filter(function (item) { return item.classId && item.email; });
}

function classIdsForEmail_(email) {
  const clean = String(email || '').trim().toLowerCase();
  const memberships = readClassMemberships_().filter(function (item) { return item.email === clean; });
  if (!memberships.length) return [DEFAULT_CLASS_ID];
  return memberships.filter(function (item) { return item.active; }).map(function (item) { return item.classId; });
}

function activeStudentClasses_(email) {
  const allowed = classIdsForEmail_(email);
  return readClasses_(false).filter(function (item) {
    return item.portalEnabled && allowed.indexOf(item.id) >= 0;
  });
}

function resolveStudentClass_(email, requestedClassId) {
  const classes = activeStudentClasses_(email);
  if (!classes.length) throw new Error('No active portal class is assigned to this account.');
  const requested = normaliseClassId_(requestedClassId, true);
  const selected = classes.find(function (item) { return item.id === requested; });
  if (selected) return selected;
  if (!requested && classes.length > 1) {
    const today = date_(new Date());
    const week = weekRangeForDateKey_(today);
    const coursesByClass = {};
    classes.forEach(function (item) {
      coursesByClass[item.id] = readCourseRows_(item.id, false).filter(function (course) {
        return /^published$/i.test(course.portalStatus);
      });
    });
    const withToday = classes.find(function (item) {
      return coursesByClass[item.id].some(function (course) { return course.date === today; });
    });
    if (withToday) return withToday;
    const withCurrentWeek = classes.find(function (item) {
      return coursesByClass[item.id].some(function (course) {
        return course.date >= week.start && course.date <= week.end;
      });
    });
    if (withCurrentWeek) return withCurrentWeek;
    const withUpcomingLesson = classes.map(function (item) {
      const next = coursesByClass[item.id].find(function (course) { return course.date > today; });
      return { item: item, date: next ? next.date : '' };
    }).filter(function (entry) { return entry.date; }).sort(function (left, right) {
      return left.date.localeCompare(right.date);
    })[0];
    if (withUpcomingLesson) return withUpcomingLesson.item;
  }
  return classes[0];
}

function requireStudentFeature_(data, featureKey) {
  const person = requirePerson_(data);
  const classConfig = resolveStudentClass_(person.email, data.classId);
  if (!classConfig[featureKey]) throw new Error('This feature is disabled for ' + classConfig.name + '.');
  return { person: person, classConfig: classConfig };
}

function memberEmailsForClass_(classId) {
  const id = normaliseClassId_(classId || DEFAULT_CLASS_ID, false);
  const roster = getRosterMap();
  const rosterEmails = Object.keys(roster).map(function (name) { return roster[name]; });
  const memberships = readClassMemberships_().filter(function (item) { return item.classId === id; });
  if (!memberships.length && id === DEFAULT_CLASS_ID) return rosterEmails;
  return memberships.filter(function (item) {
    return item.active && rosterEmails.indexOf(item.email) >= 0;
  }).map(function (item) { return item.email; });
}

function saveClass_(data) {
  const name = String(data.className || '').trim().slice(0, 100);
  if (!name) throw new Error('Class name is required.');
  const generated = name.replace(/[^A-Za-z0-9]+/g, '-');
  const id = normaliseClassId_(data.classId || generated, false);
  const badgeColumns = normaliseBadgeColumnSpec_(data.badgeColumns);
  const existing = readClasses_(true).find(function (item) { return item.id === id; });
  const badgeMode = data.badgeMode
    ? normaliseBadgeAssignmentMode_(data.badgeMode)
    : (existing ? existing.badgeMode : 'LEGACY');
  const sheet = ensureClassSheets_().classes;
  upsertByKey_(sheet, HEADERS.classes.length, id, [
    id, name,
    data.active !== false,
    data.portalEnabled !== false,
    data.attendanceEnabled !== false,
    data.badgesEnabled !== false,
    data.resourcesEnabled !== false,
    data.mockExamsEnabled !== false,
    new Date(),
    badgeColumns,
    badgeMode
  ]);
  return ok_(readClassManagement_(), 'Class settings saved.');
}

function saveClassMembers_(data) {
  const classId = classById_(data.classId, true).id;
  const selected = (Array.isArray(data.memberEmails) ? data.memberEmails : []).map(function (email) {
    return String(email || '').trim().toLowerCase();
  });
  const roster = getRosterMap();
  const sheet = ensureClassSheets_().members;
  const currentRows = rows_(sheet, HEADERS.classMembers.length);
  Object.keys(roster).forEach(function (name) {
    const email = roster[name];
    const key = classId + '|' + email;
    const index = currentRows.findIndex(function (row) {
      return String(row[0] || '').toUpperCase() + '|' + String(row[1] || '').toLowerCase() === key;
    });
    const values = [classId, email, name, selected.indexOf(email) >= 0, new Date()];
    if (index < 0) sheet.appendRow(values);
    else sheet.getRange(index + 2, 1, 1, HEADERS.classMembers.length).setValues([values]);
  });
  return ok_(readClassManagement_(), 'Class membership saved.');
}


function normaliseProjectEntityId_(value, label) {
  const clean = String(value || '').trim().toUpperCase()
    .replace(/[^A-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  if (!clean) throw new Error((label || 'ID') + ' is required.');
  return clean;
}

function projectGroupKey_(classId, groupId) {
  return normaliseClassId_(classId, false) + '|' + normaliseProjectEntityId_(groupId, 'Group ID');
}

function projectKey_(classId, projectId) {
  return normaliseClassId_(classId, false) + '|' + normaliseProjectEntityId_(projectId, 'Project ID');
}

function projectAssignmentId_(classId, groupId, projectId) {
  return [
    normaliseClassId_(classId, false),
    normaliseProjectEntityId_(groupId, 'Group ID'),
    normaliseProjectEntityId_(projectId, 'Project ID')
  ].join('|');
}

function projectMembershipId_(classId, email) {
  return normaliseClassId_(classId, false) + '|' + String(email || '').trim().toLowerCase();
}

function ensureProjectSheets_() {
  const spreadsheet = attendance_();
  return {
    groups: getOrCreateSheet_(spreadsheet, SHEETS.projectGroups, HEADERS.projectGroups),
    members: getOrCreateSheet_(spreadsheet, SHEETS.projectGroupMembers, HEADERS.projectGroupMembers),
    projects: getOrCreateSheet_(spreadsheet, SHEETS.projects, HEADERS.projects),
    assignments: getOrCreateSheet_(spreadsheet, SHEETS.groupProjects, HEADERS.groupProjects),
    submissions: getOrCreateSheet_(spreadsheet, SHEETS.projectSubmissions, HEADERS.projectSubmissions),
    evaluations: getOrCreateSheet_(spreadsheet, SHEETS.peerEvaluations, HEADERS.peerEvaluations)
  };
}

function readProjectGroups_(classId, includeInactive) {
  const requested = String(classId || 'ALL').trim().toUpperCase();
  const sheet = ensureProjectSheets_().groups;
  return rows_(sheet, HEADERS.projectGroups.length).map(function (row) {
    return {
      key: String(row[0] || '').trim(),
      classId: normaliseClassId_(row[1], true),
      id: String(row[2] || '').trim().toUpperCase(),
      name: String(row[3] || row[2] || '').trim(),
      active: booleanValue_(row[4], true),
      notes: String(row[5] || '').trim(),
      updatedAt: row[6] ? String(row[6]) : ''
    };
  }).filter(function (item) {
    return item.classId && item.id && item.name
      && (requested === 'ALL' || item.classId === requested)
      && (includeInactive || item.active);
  });
}

function readProjectGroupMembers_(classId, includeInactive) {
  const requested = String(classId || 'ALL').trim().toUpperCase();
  const sheet = ensureProjectSheets_().members;
  return rows_(sheet, HEADERS.projectGroupMembers.length).map(function (row) {
    return {
      membershipId: String(row[0] || '').trim(),
      classId: normaliseClassId_(row[1], true),
      groupId: String(row[2] || '').trim().toUpperCase(),
      email: String(row[3] || '').trim().toLowerCase(),
      name: String(row[4] || '').trim(),
      active: booleanValue_(row[5], true),
      role: String(row[6] || 'Member').trim() || 'Member',
      updatedAt: row[7] ? String(row[7]) : ''
    };
  }).filter(function (item) {
    return item.classId && item.groupId && item.email
      && (requested === 'ALL' || item.classId === requested)
      && (includeInactive || item.active);
  });
}

function readProjects_(classId, includeDrafts) {
  const requested = String(classId || 'ALL').trim().toUpperCase();
  const sheet = ensureProjectSheets_().projects;
  return rows_(sheet, HEADERS.projects.length).map(function (row) {
    const dueDate = row[6] ? date_(row[6]) : '';
    return {
      key: String(row[0] || '').trim(),
      classId: normaliseClassId_(row[1], true),
      id: String(row[2] || '').trim().toUpperCase(),
      name: String(row[3] || row[2] || '').trim(),
      type: String(row[4] || 'Project').trim(),
      description: String(row[5] || '').trim(),
      dueDate: dueDate,
      dueDateDisplay: dueDate ? displayDateKey_(dueDate) : '',
      submissionRequirements: String(row[7] || '').trim(),
      minimumWorkingFeatures: Math.max(0, Number(row[8]) || 0),
      presentationMinutes: Math.max(0, Number(row[9]) || 0),
      qaMinutes: Math.max(0, Number(row[10]) || 0),
      creditLimit: Math.max(0, Number(row[11]) || 0),
      published: booleanValue_(row[12], false),
      peerEvaluationEnabled: booleanValue_(row[13], true),
      updatedAt: row[14] ? String(row[14]) : ''
    };
  }).filter(function (item) {
    return item.classId && item.id && item.name
      && (requested === 'ALL' || item.classId === requested)
      && (includeDrafts || item.published);
  });
}

function readGroupProjects_(classId, includeInactive) {
  const requested = String(classId || 'ALL').trim().toUpperCase();
  const sheet = ensureProjectSheets_().assignments;
  return rows_(sheet, HEADERS.groupProjects.length).map(function (row) {
    return {
      assignmentId: String(row[0] || '').trim(),
      classId: normaliseClassId_(row[1], true),
      groupId: String(row[2] || '').trim().toUpperCase(),
      projectId: String(row[3] || '').trim().toUpperCase(),
      useCase: String(row[4] || '').trim(),
      briefUrl: safeExternalUrl_(row[5]),
      trialAccount: String(row[6] || '').trim(),
      consoleUrl: safeExternalUrl_(row[7]),
      presentationOrder: String(row[8] || '').trim(),
      notes: String(row[9] || '').trim(),
      active: booleanValue_(row[10], true),
      updatedAt: row[11] ? String(row[11]) : ''
    };
  }).filter(function (item) {
    return item.assignmentId && item.classId && item.groupId && item.projectId
      && (requested === 'ALL' || item.classId === requested)
      && (includeInactive || item.active);
  });
}

function readProjectSubmissions_(classId) {
  const requested = String(classId || 'ALL').trim().toUpperCase();
  const sheet = ensureProjectSheets_().submissions;
  return rows_(sheet, HEADERS.projectSubmissions.length).map(function (row) {
    return {
      submissionId: String(row[0] || '').trim(),
      assignmentId: String(row[1] || '').trim(),
      projectId: String(row[2] || '').trim().toUpperCase(),
      classId: normaliseClassId_(row[3], true),
      groupId: String(row[4] || '').trim().toUpperCase(),
      submittedByEmail: String(row[5] || '').trim().toLowerCase(),
      submittedByName: String(row[6] || '').trim(),
      submissionUrl: safeExternalUrl_(row[7]),
      deckUrl: safeExternalUrl_(row[8]),
      demoUrl: safeExternalUrl_(row[9]),
      repositoryUrl: safeExternalUrl_(row[10]),
      notes: String(row[11] || '').trim(),
      status: String(row[12] || 'Submitted').trim(),
      submittedAt: row[13] ? String(row[13]) : '',
      updatedAt: row[14] ? String(row[14]) : ''
    };
  }).filter(function (item) {
    return item.submissionId && item.assignmentId && item.classId
      && (requested === 'ALL' || item.classId === requested);
  }).sort(function (left, right) {
    return (new Date(right.submittedAt).getTime() || 0) - (new Date(left.submittedAt).getTime() || 0);
  });
}

function readPeerEvaluations_(classId) {
  const requested = String(classId || 'ALL').trim().toUpperCase();
  const sheet = ensureProjectSheets_().evaluations;
  return rows_(sheet, HEADERS.peerEvaluations.length).map(function (row) {
    return {
      evaluationId: String(row[0] || '').trim(),
      assignmentId: String(row[1] || '').trim(),
      projectId: String(row[2] || '').trim().toUpperCase(),
      classId: normaliseClassId_(row[3], true),
      groupId: String(row[4] || '').trim().toUpperCase(),
      evaluatorEmail: String(row[5] || '').trim().toLowerCase(),
      evaluatorName: String(row[6] || '').trim(),
      evaluateeEmail: String(row[7] || '').trim().toLowerCase(),
      evaluateeName: String(row[8] || '').trim(),
      contribution: Number(row[9]) || 0,
      collaboration: Number(row[10]) || 0,
      communication: Number(row[11]) || 0,
      reliability: Number(row[12]) || 0,
      technicalContribution: Number(row[13]) || 0,
      comments: String(row[14] || '').trim(),
      submittedAt: row[15] ? String(row[15]) : '',
      updatedAt: row[16] ? String(row[16]) : ''
    };
  }).filter(function (item) {
    return item.evaluationId && item.assignmentId && item.classId
      && (requested === 'ALL' || item.classId === requested);
  });
}

function projectGroupForStudent_(email, classId) {
  const cleanEmail = String(email || '').trim().toLowerCase();
  const id = normaliseClassId_(classId, false);
  const membership = readProjectGroupMembers_(id, false).find(function (item) {
    return item.email === cleanEmail;
  });
  if (!membership) return null;
  const group = readProjectGroups_(id, false).find(function (item) { return item.id === membership.groupId; });
  return group ? { group: group, membership: membership } : null;
}

function readStudentProjectWorkspace_(person, classConfig) {
  const access = projectGroupForStudent_(person.email, classConfig.id);
  if (!access) {
    return {
      group: null,
      members: [],
      peers: [],
      assignments: [],
      evaluations: [],
      message: 'Your instructor has not assigned you to a project group for this class yet.'
    };
  }
  const members = readProjectGroupMembers_(classConfig.id, false).filter(function (item) {
    return item.groupId === access.group.id;
  });
  const peers = members.filter(function (item) { return item.email !== person.email; });
  const projects = readProjects_(classConfig.id, false);
  const projectById = {};
  projects.forEach(function (item) { projectById[item.id] = item; });
  const submissions = readProjectSubmissions_(classConfig.id).filter(function (item) {
    return item.groupId === access.group.id;
  });
  const ownEvaluations = readPeerEvaluations_(classConfig.id).filter(function (item) {
    return item.groupId === access.group.id && item.evaluatorEmail === person.email;
  });
  const assignments = readGroupProjects_(classConfig.id, false).filter(function (item) {
    return item.groupId === access.group.id && projectById[item.projectId];
  }).map(function (item) {
    const history = submissions.filter(function (submission) { return submission.assignmentId === item.assignmentId; });
    return Object.assign({}, item, {
      project: projectById[item.projectId],
      latestSubmission: history[0] || null,
      submissionHistory: history.slice(0, 5),
      evaluatedPeerEmails: ownEvaluations.filter(function (evaluation) {
        return evaluation.assignmentId === item.assignmentId;
      }).map(function (evaluation) { return evaluation.evaluateeEmail; })
    });
  });
  return {
    group: access.group,
    members: members,
    peers: peers,
    assignments: assignments,
    evaluations: ownEvaluations,
    message: assignments.length ? '' : 'Your group is ready, but no published project has been assigned yet.'
  };
}

function saveProjectGroup_(data) {
  const classId = classById_(data.classId, true).id;
  const name = String(data.groupName || '').trim().slice(0, 120);
  if (!name) throw new Error('Group name is required.');
  const generated = name.replace(/[^A-Za-z0-9]+/g, '-');
  const groupId = normaliseProjectEntityId_(data.groupId || generated, 'Group ID');
  const key = projectGroupKey_(classId, groupId);
  const sheet = ensureProjectSheets_().groups;
  upsertByKey_(sheet, HEADERS.projectGroups.length, key, [
    key, classId, groupId, name, data.active !== false,
    String(data.notes || '').trim().slice(0, 1200), new Date()
  ]);
  return ok_(readClassManagement_(), 'Project group saved.');
}

function saveProjectGroupAssignments_(data) {
  const classId = classById_(data.classId, true).id;
  const allowedEmails = memberEmailsForClass_(classId);
  const roster = getRosterMap();
  const rosterNameByEmail = {};
  Object.keys(roster).forEach(function (name) { rosterNameByEmail[roster[name]] = name; });
  const activeGroups = {};
  readProjectGroups_(classId, false).forEach(function (group) { activeGroups[group.id] = true; });
  const requested = Array.isArray(data.assignments) ? data.assignments : [];
  const selected = [];
  const seen = {};
  requested.forEach(function (item) {
    const email = String(item && item.email || '').trim().toLowerCase();
    const groupId = String(item && item.groupId || '').trim().toUpperCase();
    if (!email || !groupId) return;
    if (seen[email]) throw new Error('Each student can belong to only one group per class.');
    if (allowedEmails.indexOf(email) < 0) throw new Error(email + ' is not an active member of this class.');
    if (!activeGroups[groupId]) throw new Error('Unknown or inactive project group: ' + groupId);
    seen[email] = true;
    selected.push([
      projectMembershipId_(classId, email), classId, groupId, email,
      rosterNameByEmail[email] || String(item.name || '').trim(), true,
      String(item.role || 'Member').trim().slice(0, 80) || 'Member', new Date()
    ]);
  });
  const sheet = ensureProjectSheets_().members;
  const existing = rows_(sheet, HEADERS.projectGroupMembers.length);
  for (let index = existing.length - 1; index >= 0; index--) {
    if (normaliseClassId_(existing[index][1], true) === classId) sheet.deleteRow(index + 2);
  }
  if (selected.length) sheet.getRange(sheet.getLastRow() + 1, 1, selected.length, HEADERS.projectGroupMembers.length).setValues(selected);
  return ok_(readClassManagement_(), 'Project group assignments saved.');
}

function saveProject_(data) {
  const classId = classById_(data.classId, true).id;
  const name = String(data.projectName || '').trim().slice(0, 160);
  if (!name) throw new Error('Project name is required.');
  const generated = name.replace(/[^A-Za-z0-9]+/g, '-');
  const projectId = normaliseProjectEntityId_(data.projectId || generated, 'Project ID');
  const dueDate = String(data.dueDate || '').trim();
  if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) throw new Error('Project due date is invalid.');
  const key = projectKey_(classId, projectId);
  const sheet = ensureProjectSheets_().projects;
  upsertByKey_(sheet, HEADERS.projects.length, key, [
    key, classId, projectId, name,
    String(data.projectType || 'Project').trim().slice(0, 80),
    String(data.description || '').trim().slice(0, 4000),
    dueDate,
    String(data.submissionRequirements || '').trim().slice(0, 5000),
    Math.max(0, Number(data.minimumWorkingFeatures) || 0),
    Math.max(0, Number(data.presentationMinutes) || 0),
    Math.max(0, Number(data.qaMinutes) || 0),
    Math.max(0, Number(data.creditLimit) || 0),
    data.published === true,
    data.peerEvaluationEnabled !== false,
    new Date()
  ]);
  return ok_(readClassManagement_(), 'Project saved.');
}

function saveGroupProject_(data) {
  const classId = classById_(data.classId, true).id;
  const groupId = normaliseProjectEntityId_(data.groupId, 'Group ID');
  const projectId = normaliseProjectEntityId_(data.projectId, 'Project ID');
  const group = readProjectGroups_(classId, true).find(function (item) { return item.id === groupId; });
  if (!group) throw new Error('Project group was not found.');
  if (data.active !== false && !group.active) throw new Error('Activate the project group before assigning an active project.');
  if (!readProjects_(classId, true).some(function (item) { return item.id === projectId; })) {
    throw new Error('Project was not found.');
  }
  const assignmentId = projectAssignmentId_(classId, groupId, projectId);
  const sheet = ensureProjectSheets_().assignments;
  upsertByKey_(sheet, HEADERS.groupProjects.length, assignmentId, [
    assignmentId, classId, groupId, projectId,
    String(data.useCase || '').trim().slice(0, 2500),
    normaliseExternalUrl_(data.briefUrl, true),
    String(data.trialAccount || '').trim().slice(0, 250),
    normaliseExternalUrl_(data.consoleUrl, true),
    String(data.presentationOrder || '').trim().slice(0, 150),
    String(data.notes || '').trim().slice(0, 2500),
    data.active !== false,
    new Date()
  ]);
  return ok_(readClassManagement_(), 'Project assigned to group.');
}

function requireStudentProjectAssignment_(data) {
  const person = requirePerson_(data);
  const classConfig = resolveStudentClass_(person.email, data.classId);
  const access = projectGroupForStudent_(person.email, classConfig.id);
  if (!access) throw new Error('You are not assigned to a project group for this class.');
  const assignmentId = String(data.assignmentId || '').trim();
  const assignment = readGroupProjects_(classConfig.id, false).find(function (item) {
    return item.assignmentId === assignmentId && item.groupId === access.group.id;
  });
  if (!assignment) throw new Error('This project is not assigned to your group.');
  const project = readProjects_(classConfig.id, false).find(function (item) { return item.id === assignment.projectId; });
  if (!project) throw new Error('This project is not published.');
  return { person: person, classConfig: classConfig, group: access.group, assignment: assignment, project: project };
}

function submitProjectSubmission_(data) {
  const access = requireStudentProjectAssignment_(data);
  const submissionUrl = normaliseExternalUrl_(data.submissionUrl, true);
  const deckUrl = normaliseExternalUrl_(data.deckUrl, true);
  const demoUrl = normaliseExternalUrl_(data.demoUrl, true);
  const repositoryUrl = normaliseExternalUrl_(data.repositoryUrl, true);
  if (!submissionUrl && !deckUrl && !demoUrl && !repositoryUrl) {
    throw new Error('Add at least one submission, deck, demo or repository link.');
  }
  const now = new Date();
  const submissionId = Utilities.getUuid();
  ensureProjectSheets_().submissions.appendRow([
    submissionId,
    access.assignment.assignmentId,
    access.assignment.projectId,
    access.classConfig.id,
    access.group.id,
    access.person.email,
    access.person.name,
    submissionUrl,
    deckUrl,
    demoUrl,
    repositoryUrl,
    String(data.notes || '').trim().slice(0, 3000),
    'Submitted',
    now,
    now
  ]);
  return ok_(readStudentProjectWorkspace_(access.person, access.classConfig), 'Group project submission recorded.');
}

function projectRating_(value, label) {
  const rating = Number(value);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error(label + ' must be rated from 1 to 5.');
  return rating;
}

function submitPeerEvaluation_(data) {
  const access = requireStudentProjectAssignment_(data);
  if (!access.project.peerEvaluationEnabled) throw new Error('Peer evaluation is disabled for this project.');
  const evaluateeEmail = String(data.evaluateeEmail || '').trim().toLowerCase();
  if (!evaluateeEmail) throw new Error('Choose a teammate to evaluate.');
  if (evaluateeEmail === access.person.email) throw new Error('You cannot evaluate yourself.');
  const teammate = readProjectGroupMembers_(access.classConfig.id, false).find(function (item) {
    return item.groupId === access.group.id && item.email === evaluateeEmail;
  });
  if (!teammate) throw new Error('Peer evaluations are limited to members of your own group.');
  const contribution = projectRating_(data.contribution, 'Contribution');
  const collaboration = projectRating_(data.collaboration, 'Collaboration');
  const communication = projectRating_(data.communication, 'Communication');
  const reliability = projectRating_(data.reliability, 'Reliability');
  const technicalContribution = projectRating_(data.technicalContribution, 'Technical contribution');
  const comments = String(data.comments || '').trim().slice(0, 2500);
  if ([contribution, collaboration, communication, reliability, technicalContribution].some(function (rating) { return rating <= 2; }) && !comments) {
    throw new Error('Add a short comment when giving a rating of 1 or 2.');
  }
  const evaluationId = [access.assignment.assignmentId, access.person.email, teammate.email].join('|');
  const sheet = ensureProjectSheets_().evaluations;
  const existing = rows_(sheet, HEADERS.peerEvaluations.length).find(function (row) {
    return String(row[0] || '') === evaluationId;
  });
  const submittedAt = existing && existing[15] ? existing[15] : new Date();
  upsertByKey_(sheet, HEADERS.peerEvaluations.length, evaluationId, [
    evaluationId,
    access.assignment.assignmentId,
    access.assignment.projectId,
    access.classConfig.id,
    access.group.id,
    access.person.email,
    access.person.name,
    teammate.email,
    teammate.name,
    contribution,
    collaboration,
    communication,
    reliability,
    technicalContribution,
    comments,
    submittedAt,
    new Date()
  ]);
  return ok_(readStudentProjectWorkspace_(access.person, access.classConfig), 'Peer evaluation saved.');
}

function saveClassBadges_(data) {
  const classConfig = classById_(data.classId, true);
  const requested = Array.isArray(data.requirements) ? data.requirements : [];
  const catalog = badgeCatalog_();
  const byColumn = {};
  catalog.forEach(function (item) { byColumn[item.trackerColumn] = item; });
  const selected = [];
  const seen = {};
  requested.forEach(function (item, index) {
    const trackerColumn = String(item && item.trackerColumn || '').trim().toUpperCase();
    const definition = byColumn[trackerColumn];
    if (!definition) throw new Error('Unknown badge tracker column: ' + trackerColumn);
    if (seen[trackerColumn]) return;
    seen[trackerColumn] = true;
    const rawDueDate = String(item.dueDateOverride || '').trim();
    const dueDateOverride = rawDueDate ? trackerDueDateKey_(rawDueDate, rawDueDate) : '';
    if (rawDueDate && !dueDateOverride) {
      throw new Error('Invalid due date override for ' + definition.name + '.');
    }
    selected.push([
      classConfig.id,
      definition.trackerColumn,
      definition.badgeKey,
      definition.name,
      true,
      dueDateOverride,
      index + 1,
      new Date()
    ]);
  });

  const sheet = ensureClassBadgeSheet_();
  const existingRows = rows_(sheet, HEADERS.classBadges.length);
  for (let index = existingRows.length - 1; index >= 0; index--) {
    if (normaliseClassId_(existingRows[index][0], true) === classConfig.id) {
      sheet.deleteRow(index + 2);
    }
  }
  if (selected.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, selected.length, HEADERS.classBadges.length).setValues(selected);
  }

  const classesSheet = ensureClassSheets_().classes;
  const classRows = rows_(classesSheet, HEADERS.classes.length);
  const classIndex = classRows.findIndex(function (row) {
    return normaliseClassId_(row[0], true) === classConfig.id;
  });
  if (classIndex < 0) throw new Error('Class was not found: ' + classConfig.id);
  classesSheet.getRange(classIndex + 2, 11).setValue('EXPLICIT');
  classesSheet.getRange(classIndex + 2, 9).setValue(new Date());
  return ok_(
    readClassManagement_(),
    selected.length
      ? selected.length + ' badge requirement(s) applied to ' + classConfig.name + '.'
      : 'This class now has no badge requirements.'
  );
}

function saveBadgeDefinition_(data) {
  const name = String(data.badgeName || '').trim().slice(0, 200);
  if (!name) throw new Error('Badge name is required.');
  const badgeKey = normaliseBadgeKey_(name);
  if (!badgeKey) throw new Error('Badge name is invalid.');
  const existing = badgeDefinitionRows_(true).find(function (item) {
    return item.active && item.key === badgeKey;
  });
  if (existing) throw new Error('A badge with this name already exists.');
  const rawDueDate = String(data.dueDate || '').trim();
  const dueDate = rawDueDate ? trackerDueDateKey_(rawDueDate, rawDueDate) : '';
  if (rawDueDate && !dueDate) throw new Error('Default due date is invalid.');
  const url = normaliseExternalUrl_(data.badgeUrl, true);

  const spreadsheet = tracker_();
  const trackerSheet = spreadsheet.getSheets()[0];
  const catalogSheet = ensureBadgeDefinitionSheet_();
  const sourceDefinitions = badgeDefinitionRows_(false);
  const sourceColumn = sourceDefinitions.length
    ? sourceDefinitions[sourceDefinitions.length - 1].column
    : BADGE_FIRST_COLUMN;
  const newColumn = trackerSheet.getMaxColumns() + 1;
  trackerSheet.insertColumnAfter(trackerSheet.getMaxColumns());
  trackerSheet.getRange(1, sourceColumn, trackerSheet.getMaxRows(), 1).copyTo(
    trackerSheet.getRange(1, newColumn, trackerSheet.getMaxRows(), 1),
    SpreadsheetApp.CopyPasteType.PASTE_FORMAT,
    false
  );
  trackerSheet.setColumnWidth(newColumn, trackerSheet.getColumnWidth(sourceColumn));

  if (url) {
    trackerSheet.getRange(1, newColumn).setRichTextValue(
      SpreadsheetApp.newRichTextValue().setText(name).setLinkUrl(url).build()
    );
  } else {
    trackerSheet.getRange(1, newColumn).setValue(name);
  }
  const dueCell = trackerSheet.getRange(2, newColumn);
  if (dueDate) {
    dueCell.setValue(new Date(dueDate + 'T00:00:00')).setNumberFormat('d mmm yyyy');
  } else {
    dueCell.clearContent();
  }
  const traineeRowCount = Math.max(0, trackerSheet.getMaxRows() - TRAINEE_FIRST_ROW + 1);
  if (traineeRowCount) {
    trackerSheet.getRange(TRAINEE_FIRST_ROW, newColumn, traineeRowCount, 1).insertCheckboxes().setValue(false);
  }

  const badgeId = 'BADGE-' + Utilities.getUuid().slice(0, 12).toUpperCase();
  const now = new Date();
  catalogSheet.appendRow([
    badgeId,
    columnLetter_(newColumn),
    name,
    url,
    dueDate,
    true,
    now,
    now
  ]);
  return ok_(readClassManagement_(), name + ' was added to the badge catalog.');
}

function archiveBadgeDefinition_(data) {
  const badgeId = String(data.badgeId || '').trim();
  const trackerColumn = String(data.trackerColumn || '').trim().toUpperCase();
  const definition = badgeDefinitionRows_(false).find(function (item) {
    return (badgeId && item.badgeId === badgeId) || (trackerColumn && item.trackerColumn === trackerColumn);
  });
  if (!definition) throw new Error('Badge definition was not found or is already removed.');
  const catalogSheet = ensureBadgeDefinitionSheet_();
  catalogSheet.getRange(definition.rowNumber, 6).setValue(false);
  catalogSheet.getRange(definition.rowNumber, 8).setValue(new Date());

  const assignmentSheet = ensureClassBadgeSheet_();
  const assignments = rows_(assignmentSheet, HEADERS.classBadges.length);
  for (let index = assignments.length - 1; index >= 0; index--) {
    if (String(assignments[index][1] || '').trim().toUpperCase() === definition.trackerColumn) {
      assignmentSheet.deleteRow(index + 2);
    }
  }
  tracker_().getSheets()[0].hideColumns(definition.column);
  return ok_(
    readClassManagement_(),
    definition.name + ' was removed from the portal and all class requirements. Existing tracker history was preserved.'
  );
}

function rosterPersonByEmail_(email) {
  const clean = String(email || '').trim().toLowerCase();
  const roster = getRosterMap();
  for (const name in roster) {
    if (roster[name] === clean) return { name: name, email: clean };
  }
  return null;
}

function rosterPersonByName_(name) {
  const roster = getRosterMap();
  const email = roster[String(name || '').trim()];
  return email ? { name: String(name).trim(), email: email } : null;
}

function requirePerson_(data) {
  const person = data.email ? rosterPersonByEmail_(data.email) : rosterPersonByName_(data.studentName);
  if (!person) throw new Error('Trainee was not found in the Roster tab.');
  return person;
}

function attendanceSessionFromRow_(row) {
  const attendance = String(row[3] || '').trim().toLowerCase();
  if (attendance === 'mc' || attendance === 'medical certificate') return 'MC';
  const reference = normaliseCourseId_(row[1]);
  if (/^morning$/i.test(reference) || /-AM$/i.test(reference)) return 'Morning';
  if (/^afternoon$/i.test(reference) || /-PM$/i.test(reference)) return 'Afternoon';
  const recordedMinutes = timeMinutes_(row[6], null);
  if (recordedMinutes != null) return recordedMinutes < 720 ? 'Morning' : 'Afternoon';
  return reference || 'Unknown';
}

function displayTimeValue_(value) {
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, TZ, 'HH:mm:ss');
  }
  if (typeof value === 'number' && value >= 0 && value < 1) {
    const seconds = Math.round(value * 86400);
    const hour = Math.floor(seconds / 3600) % 24;
    const minute = Math.floor(seconds % 3600 / 60);
    const second = seconds % 60;
    return String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0') + ':' + String(second).padStart(2, '0');
  }
  return String(value || '');
}

function readAttendance_(email, requestedDate) {
  const sheet = getOrCreateSheet_(attendance_(), SHEETS.attendance, HEADERS.attendance);
  const records = rows_(sheet, HEADERS.attendance.length)
    .filter(row => (!email || String(row[2]).toLowerCase() === email.toLowerCase()) && (!requestedDate || date_(row[5]) === requestedDate))
    .map(row => ({
      id: String(row[0] || ''), courseId: normaliseCourseId_(row[1]), session: attendanceSessionFromRow_(row),
      email: String(row[2] || '').trim().toLowerCase(), attendance: String(row[3] || '').trim(),
      acknowledged: row[4] === true, date: date_(row[5]), time: displayTimeValue_(row[6]),
      comment: row[7] || '', fileUrl: row[8] || '',
      classId: normaliseClassId_(row[10] || DEFAULT_CLASS_ID, true) || DEFAULT_CLASS_ID,
      source: String(row[11] || '')
    }));
  const checkpointOrder = [];
  const checkpoints = {};
  records.forEach(function (record) {
    const key = attendanceCheckpointKey_(record.email, record.date, record.classId, record.courseId);
    const existing = checkpoints[key];
    if (!existing) checkpointOrder.push(key);
    if (
      existing
      && !/^no show$/i.test(existing.attendance)
      && /^no show$/i.test(record.attendance)
    ) return;
    checkpoints[key] = record;
  });
  return checkpointOrder.map(function (key) { return checkpoints[key]; });
}

function timeMinutes_(value, fallback) {
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return Number(Utilities.formatDate(value, TZ, 'H')) * 60 + Number(Utilities.formatDate(value, TZ, 'm'));
  }
  if (typeof value === 'number' && value >= 0 && value < 1) return Math.round(value * 1440) % 1440;
  const match = String(value || '').trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (match) {
    const minutes = Number(match[1]) * 60 + Number(match[2]);
    if (minutes >= 0 && minutes < 1440) return minutes;
  }
  return fallback;
}

function formatMinutes_(minutes) {
  const value = Math.max(0, Number(minutes) || 0) % 1440;
  return String(Math.floor(value / 60)).padStart(2, '0') + ':' + String(value % 60).padStart(2, '0');
}

function courseSession_(row) {
  const courseId = String(row[0] || '').trim();
  if (/-AM$/i.test(courseId)) return 'Morning';
  if (/-PM$/i.test(courseId)) return 'Afternoon';
  const label = String(row[12] || '').toLowerCase();
  if (/end|afternoon/.test(label)) return 'Afternoon';
  return timeMinutes_(row[6], 540) < 720 ? 'Morning' : 'Afternoon';
}

function monthRangeForKey_(monthKey, fallbackDateKey) {
  const fallback = String(fallbackDateKey || date_(new Date())).slice(0, 7);
  const clean = /^\d{4}-\d{2}$/.test(String(monthKey || '')) ? String(monthKey) : fallback;
  const parts = clean.split('-').map(Number);
  const start = validDateKey_(parts[0], parts[1], 1);
  const nextYear = parts[1] === 12 ? parts[0] + 1 : parts[0];
  const nextMonth = parts[1] === 12 ? 1 : parts[1] + 1;
  const nextStart = validDateKey_(nextYear, nextMonth, 1);
  return { key: clean, start: start, end: dateKeyOffset_(nextStart, -1) };
}

function ensureCoursesSheet_() {
  return getOrCreateSheet_(attendance_(), SHEETS.courses, HEADERS.courses);
}

function courseFromRow_(row, rowNumber) {
  const courseId = String(row[0] || '').trim();
  const courseDate = trackerDueDateKey_(row[4], row[4]);
  if (!courseId || !courseDate || !String(row[1] || '').trim()) return null;
  const session = courseSession_(row);
  const targetMinutes = timeMinutes_(row[8], session === 'Morning' ? 540 : 780);
  const opensMinutes = timeMinutes_(row[9], targetMinutes - ATTENDANCE_OPEN_LEAD_MINUTES);
  const lessonMode = /virtual|online|remote/i.test(String(row[3] || '')) ? 'Virtual' : 'In-person';
  return {
    rowNumber: rowNumber || 0,
    courseId: courseId,
    course: String(row[1] || '').trim(),
    description: String(row[2] || ''),
    lessonMode: lessonMode,
    date: courseDate,
    dateDisplay: displayDateKey_(courseDate),
    day: String(row[5] || ''),
    courseStartTime: formatMinutes_(timeMinutes_(row[6], targetMinutes)),
    image: String(row[7] || ''),
    session: session,
    attendanceLabel: String(row[12] || (session === 'Morning' ? 'Lesson start' : 'Lesson end')).trim(),
    attendanceTime: formatMinutes_(targetMinutes),
    attendanceMinutes: targetMinutes,
    checkInOpens: formatMinutes_(opensMinutes),
    checkInOpensMinutes: opensMinutes,
    attendanceEnabled: booleanValue_(row[10], true),
    portalStatus: String(row[11] || 'Published').trim(),
    classId: normaliseClassId_(row[13] || DEFAULT_CLASS_ID, true) || DEFAULT_CLASS_ID
  };
}

function readCourseRows_(classId, includeDrafts) {
  const sheet = ensureCoursesSheet_();
  const requested = normaliseClassId_(classId, true);
  return sheet.getDataRange().getValues().slice(1).map(function (row, index) {
    return courseFromRow_(row, index + 2);
  }).filter(function (course) {
    return course && (!requested || requested === 'ALL' || course.classId === requested)
      && (includeDrafts || !/^draft$/i.test(course.portalStatus));
  }).sort(function (left, right) {
    return left.date === right.date ? left.attendanceMinutes - right.attendanceMinutes : left.date.localeCompare(right.date);
  });
}

function readCourseCalendar_(email, now, classId, monthKey) {
  const current = now || new Date();
  const today = date_(current);
  const requestedClassId = normaliseClassId_(classId || DEFAULT_CLASS_ID, true) || DEFAULT_CLASS_ID;
  const classConfig = requestedClassId === 'ALL'
    ? null
    : classById_(requestedClassId, true);
  const nowMinutes = Number(time_(current).slice(0, 2)) * 60 + Number(time_(current).slice(3, 5));
  const month = monthRangeForKey_(monthKey, today);
  const logs = email ? readAttendance_(email, '') : [];
  const events = readCourseRows_(requestedClassId, false).map(function (course) {
    const matchingLog = logs.find(function (log) {
      return log.date === course.date
        && log.classId === course.classId
        && (log.session === 'MC' || normaliseCourseId_(log.courseId) === normaliseCourseId_(course.courseId));
    });
    const isNoShow = matchingLog && /^no show$/i.test(String(matchingLog.attendance || ''));
    const attendanceAllowed = course.attendanceEnabled && (!classConfig || classConfig.attendanceEnabled);
    let state = 'scheduled';
    if (/^cancelled$/i.test(course.portalStatus)) state = 'cancelled';
    else if (!attendanceAllowed) state = 'disabled';
    else if (matchingLog && !isNoShow) state = matchingLog.session === 'MC' ? 'excused' : (matchingLog.acknowledged ? 'verified' : 'submitted');
    else if (isNoShow || course.date < today) state = 'missed';
    else if (course.date === today && nowMinutes < course.checkInOpensMinutes) state = 'upcoming';
    else if (course.date === today && nowMinutes <= course.attendanceMinutes) state = 'open';
    else if (course.date === today) state = 'late';
    const canCheckIn = course.date === today && attendanceAllowed && /^published$/i.test(course.portalStatus)
      && (!matchingLog || isNoShow) && nowMinutes >= course.checkInOpensMinutes;
    return Object.assign({}, course, {
      attendanceEnabled: attendanceAllowed,
      state: state,
      canCheckIn: canCheckIn,
      log: matchingLog || null
    });
  });
  const visibleEvents = events.filter(function (event) {
    return event.date >= month.start && event.date <= month.end;
  });
  const todayEvents = events.filter(function (event) { return event.date === today; });
  const actionable = todayEvents.find(function (event) { return event.canCheckIn && event.state === 'open'; })
    || todayEvents.slice().reverse().find(function (event) { return event.canCheckIn; });
  const nextEvent = events.find(function (event) {
    return event.date > today || (event.date === today && ['scheduled', 'upcoming', 'open', 'late'].indexOf(event.state) >= 0);
  }) || null;
  const week = weekRangeForDateKey_(today);
  const weekEvents = events.filter(function (event) {
    return event.date >= week.start && event.date <= week.end;
  });
  const sessionDays = {};
  visibleEvents.forEach(function (event) { sessionDays[event.date] = true; });
  const weekSessionDays = {};
  weekEvents.forEach(function (event) { weekSessionDays[event.date] = true; });
  return {
    timeZone: TZ,
    today: today,
    classId: requestedClassId,
    monthKey: month.key,
    monthStart: month.start,
    monthEnd: month.end,
    weekStart: week.start,
    weekEnd: week.end,
    weekStartDisplay: displayDateKey_(week.start),
    weekEndDisplay: displayDateKey_(week.end),
    nowTime: formatMinutes_(nowMinutes),
    rules: {
      morning: '09:00',
      afternoon: '13:00',
      opensMinutesBefore: ATTENDANCE_OPEN_LEAD_MINUTES,
      noShowGraceMinutes: NO_SHOW_GRACE_MINUTES
    },
    events: visibleEvents,
    weekEvents: weekEvents,
    todayEvents: todayEvents,
    actionableEvent: actionable || null,
    nextEvent: nextEvent,
    summary: {
      sessionDays: Object.keys(sessionDays).length,
      checkpoints: visibleEvents.length,
      completed: visibleEvents.filter(function (event) { return ['submitted', 'verified', 'excused'].indexOf(event.state) >= 0; }).length,
      missed: visibleEvents.filter(function (event) { return event.state === 'missed'; }).length,
      virtual: visibleEvents.filter(function (event) { return event.lessonMode === 'Virtual'; }).length,
      faceToFace: visibleEvents.filter(function (event) { return event.lessonMode !== 'Virtual'; }).length
    },
    weeklySummary: {
      sessionDays: Object.keys(weekSessionDays).length,
      lessons: weekEvents.length
    }
  };
}

function saveCourse_(data) {
  const classId = classById_(data.classId, true).id;
  const courseId = String(data.courseId || '').trim().slice(0, 80);
  const course = String(data.course || '').trim().slice(0, 180);
  const courseDate = trackerDueDateKey_(data.date, data.date);
  if (!courseId || !course || !courseDate) throw new Error('Course ID, title and date are required.');
  // The live Courses sheet validates column D as "Face to face" or "Virtual".
  // Accept either portal spelling for backwards compatibility, but always store
  // the spreadsheet's canonical value so strict data validation cannot reject it.
  const lessonMode = /^virtual$/i.test(String(data.lessonMode || '').trim()) ? 'Virtual' : 'Face to face';
  const startMinutes = timeMinutes_(data.startTime, 540);
  const session = String(data.session || (startMinutes < 720 ? 'Morning' : 'Afternoon'));
  const attendanceMinutes = timeMinutes_(data.attendanceTime, session === 'Morning' ? 540 : 780);
  const opensMinutes = timeMinutes_(data.checkInOpens, attendanceMinutes - ATTENDANCE_OPEN_LEAD_MINUTES);
  const dateValue = dateKeyValue_(courseDate);
  const day = Utilities.formatDate(new Date(dateValue), 'UTC', 'EEEE');
  const sheet = ensureCoursesSheet_();
  upsertByKey_(sheet, HEADERS.courses.length, courseId, [
    courseId,
    course,
    String(data.description || '').trim().slice(0, 800),
    lessonMode,
    courseDate,
    day,
    formatMinutes_(startMinutes),
    String(data.image || '').trim(),
    formatMinutes_(attendanceMinutes),
    formatMinutes_(opensMinutes),
    data.attendanceEnabled !== false,
    String(data.portalStatus || 'Published').trim(),
    String(data.attendanceLabel || (session === 'Morning' ? 'Lesson start' : 'Lesson end')).trim().slice(0, 100),
    classId
  ]);
  return ok_(readClassManagement_(), 'Class session saved.');
}

function archiveCourse_(data) {
  const courseId = String(data.courseId || '').trim();
  const sheet = ensureCoursesSheet_();
  const values = rows_(sheet, HEADERS.courses.length);
  const index = values.findIndex(function (row) { return String(row[0] || '').trim() === courseId; });
  if (index < 0) throw new Error('Class session was not found.');
  sheet.getRange(index + 2, 12).setValue('Cancelled');
  return ok_(readClassManagement_(), 'Class session cancelled.');
}

function readClassManagement_() {
  const classes = readClasses_(true);
  const memberships = readClassMemberships_();
  const roster = getRosterMap();
  return {
    classes: classes,
    memberships: memberships,
    badgeCatalog: badgeCatalog_(),
    badgeAssignments: readClassBadgeAssignments_(),
    feedbackLinksByClass: readClassFeedbackLinksByClass_(classes),
    examLinksByClass: readClassExamLinksByClass_(classes),
    projectGroups: readProjectGroups_('ALL', true),
    projectGroupMembers: readProjectGroupMembers_('ALL', true),
    projects: readProjects_('ALL', true),
    groupProjects: readGroupProjects_('ALL', true),
    projectSubmissions: readProjectSubmissions_('ALL'),
    peerEvaluations: readPeerEvaluations_('ALL'),
    courses: readCourseRows_('ALL', true),
    roster: Object.keys(roster).map(function (name) { return { name: name, email: roster[name] }; })
  };
}

function readExam_(person) {
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.exams, HEADERS.exams);
  const row = rows_(sheet, HEADERS.exams.length).find(r => String(r[0]).toLowerCase() === person.email);
  return row ? { date: row[2], venue: row[3], status: row[4], voucher: row[5] } : { status: 'Not scheduled' };
}

function readProfile_(person) {
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.profiles, HEADERS.profiles);
  const row = rows_(sheet, HEADERS.profiles.length).find(r => String(r[0]).toLowerCase() === person.email);
  if (row) return row[2];
  const legacy = tracker_().getSheets()[0].getDataRange().getValues();
  const legacyRow = legacy.slice(2).find(r => String(r[1] || '').trim() === person.name);
  return legacyRow ? legacyRow[2] || '' : '';
}

function safeExternalUrl_(value) {
  const url = String(value || '').trim();
  return /^https?:\/\/[^\s]+$/i.test(url) && (url.match(/https?:\/\//gi) || []).length === 1 ? url : '';
}

function normaliseExternalUrl_(value, allowBlank) {
  const url = String(value || '').trim();
  if (!url && allowBlank) return '';
  const protocols = url.match(/https?:\/\//gi) || [];
  if (protocols.length !== 1) throw new Error('Enter one complete link only. The URL appears to contain pasted links joined together.');
  if (!safeExternalUrl_(url)) throw new Error('Links must begin with https:// or http://.');
  return url;
}

function ensurePortalSettings_() {
  const sheet = getOrCreateSheet_(attendance_(), SHEETS.portalSettings, HEADERS.portalSettings);
  const existing = rows_(sheet, HEADERS.portalSettings.length).map(function (row) { return String(row[0] || '').trim(); });
  PORTAL_LINK_KEYS.forEach(function (key) {
    if (existing.indexOf(key) >= 0) return;
    const defaults = PORTAL_LINK_DEFAULTS[key];
    sheet.appendRow([key, defaults[0], '', defaults[1], true, new Date()]);
  });
  return sheet;
}

function readPortalSettings_(includeDrafts) {
  return rows_(ensurePortalSettings_(), HEADERS.portalSettings.length).reduce(function (result, row) {
    const key = String(row[0] || '').trim();
    if (PORTAL_LINK_KEYS.indexOf(key) < 0) return result;
    const published = row[4] === true || String(row[4]).toUpperCase() === 'TRUE';
    const url = safeExternalUrl_(row[2]);
    if (!includeDrafts && (!published || !url)) return result;
    result[key] = {
      key: key,
      label: String(row[1] || PORTAL_LINK_DEFAULTS[key][0]),
      url: url,
      description: String(row[3] || PORTAL_LINK_DEFAULTS[key][1]),
      published: published,
      updatedAt: row[5] ? String(row[5]) : ''
    };
    return result;
  }, {});
}

function upsertByKey_(sheet, width, key, values) {
  const data = rows_(sheet, width);
  const index = data.findIndex(function (row) { return String(row[0] || '') === key; });
  if (index < 0) sheet.appendRow(values);
  else sheet.getRange(index + 2, 1, 1, width).setValues([values]);
}

function savePortalLinks_(data) {
  const sheet = ensurePortalSettings_();
  const links = Array.isArray(data.links) ? data.links : [];
  if (!links.length) throw new Error('No portal links were supplied.');
  links.forEach(function (link) {
    const key = String(link.key || '').trim();
    if (PORTAL_LINK_KEYS.indexOf(key) < 0) throw new Error('Unsupported portal link: ' + key);
    const defaults = PORTAL_LINK_DEFAULTS[key];
    upsertByKey_(sheet, HEADERS.portalSettings.length, key, [
      key,
      String(link.label || defaults[0]).trim().slice(0, 100),
      normaliseExternalUrl_(link.url, true),
      String(link.description || defaults[1]).trim().slice(0, 300),
      link.published !== false,
      new Date()
    ]);
  });
  return ok_(readPortalSettings_(true), 'Portal links saved.');
}

function ensureClassFeedbackLinks_() {
  return getOrCreateSheet_(attendance_(), SHEETS.classFeedbackLinks, HEADERS.classFeedbackLinks);
}

function readClassFeedbackLinks_(classId, includeDrafts, useGlobalFallback) {
  const id = normaliseClassId_(classId || DEFAULT_CLASS_ID, false);
  const result = {};
  const seen = {};
  rows_(ensureClassFeedbackLinks_(), HEADERS.classFeedbackLinks.length).forEach(function (row) {
    const rowClassId = normaliseClassId_(row[0], true);
    const key = String(row[1] || '').trim();
    if (rowClassId !== id || CLASS_FEEDBACK_LINK_KEYS.indexOf(key) < 0) return;
    seen[key] = true;
    const defaults = CLASS_FEEDBACK_LINK_DEFAULTS[key];
    const published = booleanValue_(row[5], true);
    const url = safeExternalUrl_(row[3]);
    if (!includeDrafts && (!published || !url)) return;
    result[key] = {
      key: key,
      classId: id,
      label: String(row[2] || defaults[0]),
      url: url,
      description: String(row[4] || defaults[1]),
      published: published,
      inherited: false,
      updatedAt: row[6] ? String(row[6]) : ''
    };
  });

  if (useGlobalFallback !== false) {
    const globalLinks = readPortalSettings_(true);
    CLASS_FEEDBACK_LINK_KEYS.forEach(function (key) {
      if (seen[key]) return;
      const fallback = globalLinks[key];
      if (!fallback) return;
      if (!includeDrafts && (!fallback.published || !fallback.url)) return;
      result[key] = Object.assign({}, fallback, {
        key: key,
        classId: id,
        inherited: true
      });
    });
  }
  return result;
}

function readClassFeedbackLinksByClass_(classes) {
  return (classes || readClasses_(true)).reduce(function (result, classConfig) {
    result[classConfig.id] = readClassFeedbackLinks_(classConfig.id, true, false);
    return result;
  }, {});
}

function saveClassFeedbackLinks_(data) {
  const classConfig = classById_(data.classId, true);
  const links = Array.isArray(data.links) ? data.links : [];
  if (!links.length) throw new Error('No class feedback links were supplied.');
  const supplied = {};
  links.forEach(function (link) {
    const key = String(link && link.key || '').trim();
    if (CLASS_FEEDBACK_LINK_KEYS.indexOf(key) < 0) throw new Error('Unsupported class feedback link: ' + key);
    supplied[key] = link;
  });
  const sheet = ensureClassFeedbackLinks_();
  const values = rows_(sheet, HEADERS.classFeedbackLinks.length);
  CLASS_FEEDBACK_LINK_KEYS.forEach(function (key) {
    const link = supplied[key] || { key: key, published: false };
    const defaults = CLASS_FEEDBACK_LINK_DEFAULTS[key];
    const compositeKey = classConfig.id + '|' + key;
    const rowIndex = values.findIndex(function (row) {
      return normaliseClassId_(row[0], true) + '|' + String(row[1] || '').trim() === compositeKey;
    });
    const rowValues = [
      classConfig.id,
      key,
      String(link.label || defaults[0]).trim().slice(0, 100),
      normaliseExternalUrl_(link.url, true),
      String(link.description || defaults[1]).trim().slice(0, 300),
      link.published !== false,
      new Date()
    ];
    if (rowIndex < 0) sheet.appendRow(rowValues);
    else sheet.getRange(rowIndex + 2, 1, 1, HEADERS.classFeedbackLinks.length).setValues([rowValues]);
  });
  return ok_(readClassManagement_(), 'Feedback links saved for ' + classConfig.name + '.');
}

function ensureClassExamLinks_() {
  return getOrCreateSheet_(attendance_(), SHEETS.classExamLinks, HEADERS.classExamLinks);
}

function readClassExamLinks_(classId, includeDrafts, useGlobalFallback) {
  const id = normaliseClassId_(classId || DEFAULT_CLASS_ID, false);
  const result = {};
  const seen = {};
  rows_(ensureClassExamLinks_(), HEADERS.classExamLinks.length).forEach(function (row) {
    const rowClassId = normaliseClassId_(row[0], true);
    const key = String(row[1] || '').trim();
    if (rowClassId !== id || CLASS_EXAM_LINK_KEYS.indexOf(key) < 0) return;
    seen[key] = true;
    const defaults = CLASS_EXAM_LINK_DEFAULTS[key];
    const published = booleanValue_(row[5], true);
    const url = safeExternalUrl_(row[3]);
    if (!includeDrafts && (!published || !url)) return;
    result[key] = {
      key: key,
      classId: id,
      label: String(row[2] || defaults[0]),
      url: url,
      description: String(row[4] || defaults[1]),
      published: published,
      inherited: false,
      updatedAt: row[6] ? String(row[6]) : ''
    };
  });

  if (useGlobalFallback !== false) {
    const globalLinks = readPortalSettings_(true);
    CLASS_EXAM_LINK_KEYS.forEach(function (key) {
      if (seen[key]) return;
      const fallback = globalLinks[key];
      if (!fallback) return;
      if (!includeDrafts && (!fallback.published || !fallback.url)) return;
      result[key] = Object.assign({}, fallback, {
        key: key,
        classId: id,
        inherited: true
      });
    });
  }
  return result;
}

function readClassExamLinksByClass_(classes) {
  return (classes || readClasses_(true)).reduce(function (result, classConfig) {
    result[classConfig.id] = readClassExamLinks_(classConfig.id, true, true);
    return result;
  }, {});
}

function saveClassExamLinks_(data) {
  const classConfig = classById_(data.classId, true);
  const links = Array.isArray(data.links) ? data.links : [];
  if (!links.length) throw new Error('No class exam links were supplied.');
  const supplied = {};
  links.forEach(function (link) {
    const key = String(link && link.key || '').trim();
    if (CLASS_EXAM_LINK_KEYS.indexOf(key) < 0) throw new Error('Unsupported class exam link: ' + key);
    supplied[key] = link;
  });
  const sheet = ensureClassExamLinks_();
  const values = rows_(sheet, HEADERS.classExamLinks.length);
  CLASS_EXAM_LINK_KEYS.forEach(function (key) {
    const link = supplied[key] || { key: key, published: false };
    const defaults = CLASS_EXAM_LINK_DEFAULTS[key];
    const compositeKey = classConfig.id + '|' + key;
    const rowIndex = values.findIndex(function (row) {
      return normaliseClassId_(row[0], true) + '|' + String(row[1] || '').trim() === compositeKey;
    });
    const rowValues = [
      classConfig.id,
      key,
      String(link.label || defaults[0]).trim().slice(0, 100),
      normaliseExternalUrl_(link.url, true),
      String(link.description || defaults[1]).trim().slice(0, 300),
      link.published !== false,
      new Date()
    ];
    if (rowIndex < 0) sheet.appendRow(rowValues);
    else sheet.getRange(rowIndex + 2, 1, 1, HEADERS.classExamLinks.length).setValues([rowValues]);
  });
  return ok_(readClassManagement_(), 'Exam links saved for ' + classConfig.name + '.');
}

function resourceFromRow_(row) {
  const published = booleanValue_(row[6], false);
  const archived = booleanValue_(row[12], false);
  const weekStart = trackerDueDateKey_(row[1], row[1]);
  const currentWeek = weekRangeForDateKey_(date_(new Date()));
  let scheduleStatus = 'scheduled';
  if (archived) scheduleStatus = 'archived';
  else if (weekStart < currentWeek.start) scheduleStatus = 'past';
  else if (weekStart === currentWeek.start) scheduleStatus = 'current';
  return {
    id: String(row[0] || ''),
    weekStart: weekStart,
    weekStartDisplay: displayDateKey_(weekStart),
    courseId: String(row[2] || ''),
    title: String(row[3] || ''),
    url: String(row[4] || ''),
    description: String(row[5] || ''),
    published: published,
    updatedAt: row[7] ? String(row[7]) : '',
    classId: normaliseClassId_(row[8] || DEFAULT_CLASS_ID, true) || DEFAULT_CLASS_ID,
    fileUrl: String(row[9] || ''),
    fileName: String(row[10] || ''),
    createdAt: row[11] ? String(row[11]) : '',
    archived: archived,
    scheduleStatus: scheduleStatus,
    openUrl: String(row[9] || row[4] || '')
  };
}

function readWeeklyResources_(weekStart, includeDrafts, classId) {
  const sheet = getOrCreateSheet_(attendance_(), SHEETS.weeklyResources, HEADERS.weeklyResources);
  const requestedWeek = trackerDueDateKey_(weekStart, weekStart);
  const requestedClass = normaliseClassId_(classId, true);
  return rows_(sheet, HEADERS.weeklyResources.length).map(resourceFromRow_).filter(function (resource) {
    return resource.id && !resource.archived && resource.weekStart === requestedWeek
      && (!requestedClass || requestedClass === 'ALL' || resource.classId === requestedClass)
      && (includeDrafts || resource.published);
  });
}

function readWeeklyResourceHistory_(classId) {
  const sheet = getOrCreateSheet_(attendance_(), SHEETS.weeklyResources, HEADERS.weeklyResources);
  const requestedClass = normaliseClassId_(classId, true);
  return rows_(sheet, HEADERS.weeklyResources.length).map(resourceFromRow_).filter(function (resource) {
    return resource.id && (!requestedClass || requestedClass === 'ALL' || resource.classId === requestedClass);
  }).sort(function (left, right) {
    if (left.weekStart !== right.weekStart) return right.weekStart.localeCompare(left.weekStart);
    return String(right.updatedAt).localeCompare(String(left.updatedAt));
  });
}

function resourceUploadFolder_(classId, weekStart) {
  const roots = DriveApp.getFoldersByName('SISG_Weekly_Resources');
  const root = roots.hasNext() ? roots.next() : DriveApp.createFolder('SISG_Weekly_Resources');
  const classFolders = root.getFoldersByName(classId);
  const classFolder = classFolders.hasNext() ? classFolders.next() : root.createFolder(classId);
  const weekFolders = classFolder.getFoldersByName(weekStart);
  return weekFolders.hasNext() ? weekFolders.next() : classFolder.createFolder(weekStart);
}

function saveWeeklyResource_(data) {
  const today = date_(new Date());
  const currentWeek = weekRangeForDateKey_(today);
  const requestedDate = trackerDueDateKey_(data.weekStart, data.weekStart) || currentWeek.start;
  const weekStart = weekRangeForDateKey_(requestedDate).start;
  const classId = classById_(data.classId || DEFAULT_CLASS_ID, true).id;
  const title = String(data.title || '').trim();
  if (!title) throw new Error('Resource title is required.');
  const sheet = getOrCreateSheet_(attendance_(), SHEETS.weeklyResources, HEADERS.weeklyResources);
  const id = String(data.resourceId || '').trim() || ('RES-' + Utilities.getUuid().slice(0, 8).toUpperCase());
  const existingRow = rows_(sheet, HEADERS.weeklyResources.length).find(function (row) { return String(row[0] || '') === id; });
  const existing = existingRow ? resourceFromRow_(existingRow) : null;
  const url = normaliseExternalUrl_(data.url, true);
  let fileUrl = existing ? existing.fileUrl : '';
  let fileName = existing ? existing.fileName : '';
  if (data.fileData) {
    const bytes = Utilities.base64Decode(String(data.fileData));
    if (bytes.length > RESOURCE_UPLOAD_MAX_BYTES) throw new Error('Resource attachment must be 8 MB or smaller.');
    fileName = String(data.fileName || 'resource-file').replace(/[^a-zA-Z0-9._ -]/g, '_').slice(0, 150);
    const file = resourceUploadFolder_(classId, weekStart).createFile(
      Utilities.newBlob(bytes, data.mimeType || 'application/octet-stream', fileName)
    );
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (_) {}
    fileUrl = file.getUrl();
  }
  if (!url && !fileUrl) throw new Error('Add a resource URL or upload a file.');
  const createdAt = existing && existing.createdAt ? existingRow[11] : new Date();
  upsertByKey_(sheet, HEADERS.weeklyResources.length, id, [
    id, weekStart, String(data.courseId || '').trim(), title.slice(0, 160), url,
    String(data.description || '').trim().slice(0, 500), data.published !== false, new Date(),
    classId, fileUrl, fileName, createdAt, false
  ]);
  return ok_({
    weekStart: weekStart,
    resources: readWeeklyResources_(weekStart, true, classId),
    history: readWeeklyResourceHistory_(classId)
  }, weekStart > currentWeek.start ? 'Weekly resource scheduled.' : 'Weekly resource saved.');
}

function deleteWeeklyResource_(data) {
  const id = String(data.resourceId || '').trim();
  if (!id) throw new Error('Resource ID is required.');
  const sheet = getOrCreateSheet_(attendance_(), SHEETS.weeklyResources, HEADERS.weeklyResources);
  const values = rows_(sheet, HEADERS.weeklyResources.length);
  const index = values.findIndex(function (row) { return String(row[0] || '') === id; });
  if (index < 0) throw new Error('Weekly resource was not found.');
  sheet.getRange(index + 2, 13).setValue(true);
  sheet.getRange(index + 2, 8).setValue(new Date());
  const classId = normaliseClassId_(values[index][8] || DEFAULT_CLASS_ID, true) || DEFAULT_CLASS_ID;
  return ok_({ history: readWeeklyResourceHistory_(classId) }, 'Weekly resource archived. It remains in management history.');
}

function readExamResults_(person) {
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.examResults, HEADERS.examResults);
  const results = rows_(sheet, HEADERS.examResults.length).filter(function (row) {
    return String(row[1] || '').toLowerCase() === person.email;
  }).map(function (row) {
    return {
      id: row[0], type: row[3], score: Number(row[4]), maxScore: Number(row[5]) || 100,
      resultUrl: String(row[6] || ''), notes: String(row[7] || ''), submittedAt: row[8] ? String(row[8]) : ''
    };
  });
  const latest = {};
  results.forEach(function (result) { latest[result.type] = result; });
  return { latest: latest, history: results.slice(-10).reverse() };
}

function readExamResultsMap_() {
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.examResults, HEADERS.examResults);
  const result = {};
  rows_(sheet, HEADERS.examResults.length).forEach(function (row) {
    const email = String(row[1] || '').trim().toLowerCase();
    if (!email) return;
    const item = {
      id: row[0],
      type: String(row[3] || ''),
      score: Number(row[4]),
      maxScore: Number(row[5]) || 100,
      resultUrl: String(row[6] || ''),
      notes: String(row[7] || ''),
      submittedAt: row[8] ? String(row[8]) : ''
    };
    if (!result[email]) result[email] = { latest: {}, history: [] };
    result[email].latest[item.type] = item;
    result[email].history.push(item);
  });
  Object.keys(result).forEach(function (email) {
    result[email].history = result[email].history.slice(-10).reverse();
  });
  return result;
}

function examMap_() {
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.exams, HEADERS.exams);
  const result = {};
  rows_(sheet, HEADERS.exams.length).forEach(function (row) {
    const email = String(row[0] || '').trim().toLowerCase();
    if (!email) return;
    result[email] = { date: row[2], venue: row[3], status: row[4], voucher: row[5] };
  });
  return result;
}

function badgeSyncMap_() {
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.badgeSync, HEADERS.badgeSync);
  const result = {};
  rows_(sheet, HEADERS.badgeSync.length).forEach(function (row) {
    const email = String(row[0] || '').trim().toLowerCase();
    if (!email) return;
    result[email] = {
      profileUrl: row[2] || '', badgeCount: Number(row[3]) || 0, matchedCount: Number(row[4]) || 0,
      lastSynced: row[5] ? Utilities.formatDate(new Date(row[5]), TZ, 'yyyy-MM-dd HH:mm:ss') : '',
      lastSyncedValue: row[5] || '', status: row[6] || 'unknown', message: row[7] || ''
    };
  });
  return result;
}

function earnedBadgesMap_() {
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.badges, HEADERS.badges);
  const result = {};
  rows_(sheet, HEADERS.badges.length).forEach(function (row) {
    const email = String(row[0] || '').trim().toLowerCase();
    if (!email) return;
    if (!result[email]) result[email] = [];
    result[email].push({
      id: row[2], name: row[3], url: row[4] || '', imageUrl: row[5] || '', earnedAt: row[6] || '',
      trackerColumn: row[7] || '', source: 'profile', matched: Boolean(row[7])
    });
  });
  return result;
}

function scoreNumber_(value) {
  if (value === '' || value == null || value === '-') return null;
  const number = Number(value);
  return isFinite(number) ? number : null;
}

function buildMockScoreShowcase_(trainees) {
  const rows = (trainees || []).map(function (trainee) {
    const mock1 = scoreNumber_(trainee.mock1Score);
    const mock2 = scoreNumber_(trainee.mock2Score);
    const available = [mock1, mock2].filter(function (score) { return score != null; });
    return {
      name: trainee.name,
      email: trainee.email,
      classIds: trainee.classIds || [DEFAULT_CLASS_ID],
      mock1: mock1,
      mock2: mock2,
      average: available.length ? Math.round(available.reduce(function (sum, score) { return sum + score; }, 0) / available.length * 10) / 10 : null,
      attempts: trainee.examResults && trainee.examResults.history ? trainee.examResults.history.length : 0,
      latest: trainee.examResults && trainee.examResults.history && trainee.examResults.history[0] || null
    };
  });
  function averageFor(key) {
    const scores = rows.map(function (row) { return row[key]; }).filter(function (score) { return score != null; });
    return scores.length ? Math.round(scores.reduce(function (sum, score) { return sum + score; }, 0) / scores.length * 10) / 10 : null;
  }
  return {
    rows: rows.sort(function (left, right) {
      if (left.average == null) return 1;
      if (right.average == null) return -1;
      return right.average - left.average;
    }),
    summary: {
      mock1Average: averageFor('mock1'),
      mock2Average: averageFor('mock2'),
      submittedStudents: rows.filter(function (row) { return row.average != null; }).length,
      totalStudents: rows.length
    }
  };
}

function examColumnMap_(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
  const headerColumns = {};
  headers.forEach(function (header, index) {
    const key = normaliseBadgeKey_(header);
    if (key && !headerColumns[key]) headerColumns[key] = index + 1;
  });
  const definitions = {
    pca_sample: {
      label: 'PCA Sample Questions',
      completed: headerColumns['pca sample questions'],
      score: headerColumns['pca sample questions score']
    },
    mock_exam_1: {
      label: 'Mock Exam 1',
      completed: headerColumns['mock exam 1'],
      score: headerColumns['mock exam 1 score']
    },
    mock_exam_2: {
      label: 'Mock Exam 2',
      completed: headerColumns['mock exam 2'],
      score: headerColumns['mock exam 2 score']
    }
  };
  Object.keys(definitions).forEach(function (key) {
    const definition = definitions[key];
    if (!definition.completed || !definition.score) {
      throw new Error(definition.label + ' columns were not found in GCP Badges.');
    }
  });
  return definitions;
}

function trackerColumnValue_(row, oneBasedColumn) {
  const value = row[Number(oneBasedColumn) - 1];
  return value === '' || value == null ? '-' : value;
}

function submitExamResult_(data) {
  const person = requireStudentFeature_(data, 'mockExamsEnabled').person;
  const trackerSheet = tracker_().getSheets()[0];
  const examTypes = examColumnMap_(trackerSheet);
  const type = String(data.examType || '').trim();
  const definition = examTypes[type];
  if (!definition) throw new Error('Select a valid exam.');
  const score = Number(data.score);
  if (!isFinite(score) || score < 0 || score > 100) throw new Error('Score must be between 0 and 100.');
  const resultUrl = normaliseExternalUrl_(data.resultUrl, true);
  const trackerValues = trackerSheet.getRange(TRAINEE_FIRST_ROW, 2, Math.max(0, trackerSheet.getLastRow() - TRAINEE_FIRST_ROW + 1), 1).getDisplayValues();
  const rowOffset = trackerValues.findIndex(function (row) { return String(row[0] || '').trim() === person.name; });
  if (rowOffset < 0) throw new Error('Trainee row was not found in GCP Badges.');
  trackerSheet.getRange(TRAINEE_FIRST_ROW + rowOffset, definition.completed).setValue(true);
  trackerSheet.getRange(TRAINEE_FIRST_ROW + rowOffset, definition.score).setValue(score);
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.examResults, HEADERS.examResults);
  sheet.appendRow([
    'EXAM-' + Utilities.getUuid().slice(0, 8).toUpperCase(), person.email, person.name,
    type, score, 100, resultUrl, String(data.notes || '').trim().slice(0, 500), new Date()
  ]);
  return ok_(readExamResults_(person), definition.label + ' score submitted.');
}

function columnLetter_(column) {
  let value = Number(column);
  let result = '';
  while (value > 0) {
    value--;
    result = String.fromCharCode(65 + value % 26) + result;
    value = Math.floor(value / 26);
  }
  return result;
}

function trackerDueDateKey_(rawValue, displayValue) {
  if (Object.prototype.toString.call(rawValue) === '[object Date]' && !isNaN(rawValue.getTime())) {
    return date_(rawValue);
  }
  if (typeof rawValue === 'number' && rawValue >= 20000 && rawValue <= 100000) {
    return Utilities.formatDate(new Date(Date.UTC(1899, 11, 30) + Math.floor(rawValue) * 86400000), 'UTC', 'yyyy-MM-dd');
  }
  const text = String(rawValue || displayValue || '').trim();
  let match = text.match(/^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})$/);
  if (match) return validDateKey_(Number(match[1]), Number(match[2]), Number(match[3]));
  match = text.match(/^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4})$/);
  if (match) return validDateKey_(Number(match[3]), Number(match[2]), Number(match[1]));
  const cleaned = text.replace(/^due\s*(?:on\s*)?/i, '').replace(/(\d)(?:st|nd|rd|th)\b/gi, '$1').trim();
  match = cleaned.match(/^(\d{1,2})\s+([A-Za-z]{3,9})(?:\s+(\d{4}))?$/);
  if (match) {
    const year = Number(match[3]) || Number(Utilities.formatDate(new Date(), TZ, 'yyyy'));
    const parsedMonth = new Date(Date.parse(match[2] + ' 1, 2000')).getMonth() + 1;
    if (parsedMonth) return validDateKey_(year, parsedMonth, Number(match[1]));
  }
  const parsed = new Date(cleaned);
  return text && !isNaN(parsed.getTime()) ? date_(parsed) : '';
}

function validDateKey_(year, month, day) {
  const value = new Date(Date.UTC(year, month - 1, day));
  if (value.getUTCFullYear() !== year || value.getUTCMonth() !== month - 1 || value.getUTCDate() !== day) return '';
  return Utilities.formatDate(value, 'UTC', 'yyyy-MM-dd');
}

function dateKeyValue_(key) {
  const parts = String(key || '').split('-').map(Number);
  return parts.length === 3 ? Date.UTC(parts[0], parts[1] - 1, parts[2]) : NaN;
}

function dateKeyOffset_(key, days) {
  const value = dateKeyValue_(key);
  return isNaN(value) ? '' : Utilities.formatDate(new Date(value + days * 86400000), 'UTC', 'yyyy-MM-dd');
}

function displayDateKey_(key) {
  const value = dateKeyValue_(key);
  return isNaN(value) ? '' : Utilities.formatDate(new Date(value), 'UTC', 'd MMM yyyy');
}

function weekRangeForDateKey_(key) {
  const value = dateKeyValue_(key);
  const weekday = new Date(value).getUTCDay();
  const mondayOffset = weekday === 0 ? -6 : 1 - weekday;
  const start = dateKeyOffset_(key, mondayOffset);
  return { start: start, end: dateKeyOffset_(start, 6) };
}

function legacyTrackerBadgeDefinitions_(sheet) {
  const lastColumn = Math.min(BADGE_LAST_COLUMN, sheet.getLastColumn());
  if (lastColumn < BADGE_FIRST_COLUMN) return [];
  const width = lastColumn - BADGE_FIRST_COLUMN + 1;
  const headerRange = sheet.getRange(1, BADGE_FIRST_COLUMN, 2, width);
  const rawHeaders = headerRange.getValues();
  const headers = headerRange.getDisplayValues();
  const richHeaders = headerRange.getRichTextValues();
  const topDates = rawHeaders[0].map(function (value, offset) { return trackerDueDateKey_(value, headers[0][offset]); });
  const bottomDates = rawHeaders[1].map(function (value, offset) { return trackerDueDateKey_(value, headers[1][offset]); });
  const topDateCount = topDates.filter(Boolean).length;
  const bottomDateCount = bottomDates.filter(Boolean).length;
  const dateRowIndex = bottomDateCount > topDateCount ? 1 : 0;
  const nameRowIndex = dateRowIndex === 0 ? 1 : 0;
  const dueDates = [];
  for (let offset = 0; offset < width; offset++) {
    dueDates[offset] = dateRowIndex === 0 ? topDates[offset] : bottomDates[offset];
  }
  // A due date may be merged across several badge columns. Apply the merged
  // cell's real date to every badge covered by that header.
  headerRange.getMergedRanges().forEach(function (merged) {
    if (merged.getRow() !== dateRowIndex + 1) return;
    const dueDate = trackerDueDateKey_(merged.getCell(1, 1).getValue(), merged.getCell(1, 1).getDisplayValue());
    if (!dueDate) return;
    const first = Math.max(merged.getColumn(), BADGE_FIRST_COLUMN);
    const last = Math.min(merged.getLastColumn(), lastColumn);
    for (let column = first; column <= last; column++) dueDates[column - BADGE_FIRST_COLUMN] = dueDate;
  });
  const result = [];
  for (let offset = 0; offset < width; offset++) {
    const primaryName = String(headers[nameRowIndex][offset] || '').trim();
    const alternateName = String(headers[dateRowIndex][offset] || '').trim();
    const usablePrimary = primaryName && !/^(true|false)$/i.test(primaryName) ? primaryName : '';
    const usableAlternate = alternateName && !dueDates[offset] && !/^(true|false)$/i.test(alternateName) ? alternateName : '';
    const name = usablePrimary || usableAlternate || ('Badge ' + (offset + 1));
    result.push({
      name: name,
      key: normaliseBadgeKey_(name),
      column: BADGE_FIRST_COLUMN + offset,
      columnLetter: columnLetter_(BADGE_FIRST_COLUMN + offset),
      url: richHeaders[nameRowIndex][offset] ? richHeaders[nameRowIndex][offset].getLinkUrl() || '' : '',
      dueDate: dueDates[offset] || '',
      dueDateDisplay: displayDateKey_(dueDates[offset])
    });
  }
  return result;
}

function ensureBadgeDefinitionSheet_() {
  const spreadsheet = tracker_();
  const sheet = getOrCreateSheet_(spreadsheet, SHEETS.badgeDefinitions, HEADERS.badgeDefinitions);
  const current = rows_(sheet, HEADERS.badgeDefinitions.length).filter(function (row) {
    return String(row[0] || '').trim() && String(row[1] || '').trim();
  });
  if (current.length) return sheet;
  const legacy = legacyTrackerBadgeDefinitions_(spreadsheet.getSheets()[0]);
  if (legacy.length) {
    const now = new Date();
    sheet.getRange(2, 1, legacy.length, HEADERS.badgeDefinitions.length).setValues(legacy.map(function (definition) {
      return [
        'BADGE-' + definition.columnLetter,
        definition.columnLetter,
        definition.name,
        definition.url || '',
        definition.dueDate || '',
        true,
        now,
        now
      ];
    }));
    sheet.getRange(2, 5, legacy.length, 1).setNumberFormat('yyyy-mm-dd');
    sheet.getRange(2, 6, legacy.length, 1).insertCheckboxes();
    sheet.getRange(2, 6, legacy.length, 1).setValue(true);
  }
  return sheet;
}

function badgeDefinitionRows_(includeInactive) {
  return rows_(ensureBadgeDefinitionSheet_(), HEADERS.badgeDefinitions.length).map(function (row, index) {
    const trackerColumn = String(row[1] || '').trim().toUpperCase();
    const column = columnNumber_(trackerColumn);
    const name = String(row[2] || '').trim();
    const dueDate = trackerDueDateKey_(row[4], row[4]);
    return {
      rowNumber: index + 2,
      badgeId: String(row[0] || '').trim(),
      trackerColumn: trackerColumn,
      column: column,
      name: name,
      key: normaliseBadgeKey_(name),
      url: String(row[3] || '').trim(),
      dueDate: dueDate,
      dueDateDisplay: displayDateKey_(dueDate),
      active: booleanValue_(row[5], true),
      createdAt: row[6] ? String(row[6]) : '',
      updatedAt: row[7] ? String(row[7]) : ''
    };
  }).filter(function (item) {
    return item.badgeId && item.column >= BADGE_FIRST_COLUMN && item.name && (includeInactive || item.active);
  });
}

function trackerBadgeDefinitions_(sheet) {
  return badgeDefinitionRows_(false).map(function (item) {
    return {
      badgeId: item.badgeId,
      name: item.name,
      key: item.key,
      column: item.column,
      columnLetter: item.trackerColumn,
      url: item.url,
      dueDate: item.dueDate,
      dueDateDisplay: item.dueDateDisplay,
      active: item.active
    };
  }).sort(function (left, right) { return left.column - right.column; });
}

function decodeHtmlEntities_(value) {
  return String(value || '')
    .replace(/&#x([0-9a-f]+);/gi, function (_, code) { return String.fromCharCode(parseInt(code, 16)); })
    .replace(/&#([0-9]+);/g, function (_, code) { return String.fromCharCode(parseInt(code, 10)); })
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function stripHtml_(value) {
  return decodeHtmlEntities_(String(value || '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?>|<\/(?:div|p|li|h[1-6]|section|article)>/gi, '\n')
    .replace(/<[^>]+>/g, ' '))
    .replace(/[\t ]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
}

function normaliseBadgeKey_(value) {
  return decodeHtmlEntities_(value)
    .toLowerCase()
    .replace(/[\[\(]?deprecated[\]\)]?/g, ' ')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function compactBadgeKey_(value) {
  return normaliseBadgeKey_(value)
    .replace(/\b(?:google|cloud|skill|skills|badge|course)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function badgeNamesMatch_(left, right) {
  const a = normaliseBadgeKey_(left);
  const b = normaliseBadgeKey_(right);
  if (!a || !b) return false;
  if (a === b) return true;
  const compactA = compactBadgeKey_(a);
  const compactB = compactBadgeKey_(b);
  if (compactA.length >= 8 && compactA === compactB) return true;
  const shorter = a.length < b.length ? a : b;
  const longer = a.length < b.length ? b : a;
  return shorter.length >= 18 && longer.indexOf(shorter) >= 0 && shorter.length / longer.length >= 0.72;
}

function normaliseSkillsProfileUrl_(value) {
  const url = String(value || '').trim();
  const match = url.match(/^https:\/\/(?:www\.)?(?:skills\.google|cloudskillsboost\.google)\/public_profiles\/([a-z0-9-]+)\/?(?:[?#].*)?$/i);
  if (!match) throw new Error('Enter a public Google Skills profile URL. Example: https://www.skills.google/public_profiles/PROFILE_ID');
  return 'https://www.skills.google/public_profiles/' + match[1];
}

function absoluteSkillsUrl_(value) {
  const url = decodeHtmlEntities_(value).replace(/\\\//g, '/');
  if (/^https:\/\//i.test(url)) return url;
  return 'https://www.skills.google' + (url.charAt(0) === '/' ? url : '/' + url);
}

function usefulBadgeTitle_(value) {
  const title = stripHtml_(value)
    .replace(/^image:\s*/i, '')
    .replace(/\s+Earned\s+[A-Z][a-z]{2}\s+\d{1,2},\s+\d{4}.*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!title || title.length < 3 || title.length > 220) return '';
  if (/^(?:learn more|view badge|badge|award|google skills)$/i.test(title)) return '';
  return title;
}

function badgeTitleFromFragment_(fragment, context) {
  const attributes = [];
  const attributePattern = /(?:alt|aria-label|title)\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = attributePattern.exec(fragment))) attributes.push(match[1]);
  for (let i = 0; i < attributes.length; i++) {
    const title = usefulBadgeTitle_(attributes[i]);
    if (title) return title;
  }
  const innerTitle = usefulBadgeTitle_(fragment);
  if (innerTitle) return innerTitle;
  const contextText = stripHtml_(context);
  const earned = contextText.match(/(?:^|\n)([^\n]{3,220}?)\s+Earned\s+[A-Z][a-z]{2}\s+\d{1,2},\s+\d{4}/i);
  if (earned) return usefulBadgeTitle_(earned[1]);
  return '';
}

function extractBadgesFromProfileHtml_(html, profileUrl) {
  const source = String(html || '').replace(/\\u002f/gi, '/').replace(/\\\//g, '/');
  const profileMatch = profileUrl.match(/\/public_profiles\/([a-z0-9-]+)/i);
  const profileId = profileMatch ? profileMatch[1] : '[a-z0-9-]+';
  const results = {};

  function addBadge(urlValue, fragment, context) {
    const badgeUrl = absoluteSkillsUrl_(urlValue);
    const idMatch = badgeUrl.match(/\/badges\/([a-z0-9-]+)/i);
    if (!idMatch || results[idMatch[1]]) return;
    const imageMatch = String(fragment || '').match(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i) ||
      String(context || '').match(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i);
    const earnedMatch = stripHtml_(context).match(/Earned\s+([A-Z][a-z]{2}\s+\d{1,2},\s+\d{4}(?:\s+[A-Z]{2,5})?)/i);
    results[idMatch[1]] = {
      id: idMatch[1],
      name: badgeTitleFromFragment_(fragment, context) || ('Google Skills badge ' + idMatch[1]),
      url: badgeUrl.split('?')[0],
      imageUrl: imageMatch ? absoluteSkillsUrl_(imageMatch[1]) : '',
      earnedAt: earnedMatch ? earnedMatch[1] : ''
    };
  }

  const anchorPattern = new RegExp('<a\\b([^>]*\\bhref\\s*=\\s*["\']([^"\']*\\/public_profiles\\/' + profileId + '\\/badges\\/[a-z0-9-]+[^"\']*)["\'][^>]*)>([\\s\\S]*?)<\\/a>', 'gi');
  let anchor;
  while ((anchor = anchorPattern.exec(source))) {
    addBadge(anchor[2], anchor[3], source.slice(anchor.index, anchor.index + 1600));
  }

  const urlPattern = new RegExp('((?:https?:\\/\\/(?:www\\.)?(?:skills\\.google|cloudskillsboost\\.google))?\\/public_profiles\\/' + profileId + '\\/badges\\/[a-z0-9-]+)', 'gi');
  let urlMatch;
  while ((urlMatch = urlPattern.exec(source))) {
    addBadge(urlMatch[1], source.slice(Math.max(0, urlMatch.index - 350), urlMatch.index + 700), source.slice(Math.max(0, urlMatch.index - 350), urlMatch.index + 1400));
  }
  return Object.keys(results).map(function (id) { return results[id]; });
}

function fetchSkillsProfileBadges_(profileUrl) {
  const canonicalUrl = normaliseSkillsProfileUrl_(profileUrl);
  const response = UrlFetchApp.fetch(canonicalUrl, {
    followRedirects: true,
    muteHttpExceptions: true,
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      'User-Agent': 'Mozilla/5.0 (compatible; SISG-Badge-Sync/1.0)'
    }
  });
  const statusCode = response.getResponseCode();
  if (statusCode !== 200) throw new Error('Google Skills profile returned HTTP ' + statusCode + '. Make sure the profile is public.');
  const html = response.getContentText();
  const badges = extractBadgesFromProfileHtml_(html, canonicalUrl);
  if (!badges.length && !/member since|public profile|earned this award/i.test(stripHtml_(html))) {
    throw new Error('No public Google Skills profile was found. Enable Make profile public in Google Skills settings.');
  }
  return { profileUrl: canonicalUrl, badges: badges };
}

function readBadgeSyncStatus_(email) {
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.badgeSync, HEADERS.badgeSync);
  const row = rows_(sheet, HEADERS.badgeSync.length).find(function (item) {
    return String(item[0]).toLowerCase() === String(email).toLowerCase();
  });
  if (!row) return { status: 'not_synced', message: 'Badge profile has not been synced yet.' };
  return {
    profileUrl: row[2] || '', badgeCount: Number(row[3]) || 0, matchedCount: Number(row[4]) || 0,
    lastSynced: row[5] ? Utilities.formatDate(new Date(row[5]), TZ, 'yyyy-MM-dd HH:mm:ss') : '',
    lastSyncedValue: row[5] || '', status: row[6] || 'unknown', message: row[7] || ''
  };
}

function writeBadgeSyncStatus_(person, profileUrl, badgeCount, matchedCount, status, message, syncedAt) {
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.badgeSync, HEADERS.badgeSync);
  upsertByEmail_(sheet, HEADERS.badgeSync.length, person.email, [
    person.email, person.name, profileUrl, badgeCount || 0, matchedCount || 0,
    syncedAt || new Date(), status, message || ''
  ]);
  return readBadgeSyncStatus_(person.email);
}

function replaceEarnedBadges_(person, profileUrl, badges, trackerMatches, syncedAt) {
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.badges, HEADERS.badges);
  const kept = rows_(sheet, HEADERS.badges.length).filter(function (row) {
    return String(row[0]).toLowerCase() !== person.email;
  });
  const imported = badges.map(function (badge) {
    const trackerColumn = trackerMatches[normaliseBadgeKey_(badge.name)] || '';
    return [
      person.email, person.name, badge.id, badge.name, badge.url, badge.imageUrl || '',
      badge.earnedAt || '', trackerColumn, syncedAt, profileUrl
    ];
  });
  const allRows = kept.concat(imported);
  const oldCount = Math.max(0, sheet.getLastRow() - 1);
  if (oldCount) sheet.getRange(2, 1, oldCount, HEADERS.badges.length).clearContent();
  if (sheet.getMaxRows() < allRows.length + 1) sheet.insertRowsAfter(sheet.getMaxRows(), allRows.length + 1 - sheet.getMaxRows());
  if (allRows.length) sheet.getRange(2, 1, allRows.length, HEADERS.badges.length).setValues(allRows);
}

function readEarnedBadges_(email) {
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.badges, HEADERS.badges);
  return rows_(sheet, HEADERS.badges.length)
    .filter(function (row) { return String(row[0]).toLowerCase() === String(email).toLowerCase(); })
    .map(function (row) {
      return {
        id: row[2], name: row[3], url: row[4] || '', imageUrl: row[5] || '', earnedAt: row[6] || '',
        trackerColumn: row[7] || '', source: 'profile', matched: Boolean(row[7])
      };
    });
}

function markTrackerBadgesEarned_(person, badges) {
  const sheet = tracker_().getSheets()[0];
  const values = sheet.getDataRange().getValues();
  let rowNumber = 0;
  for (let row = TRAINEE_FIRST_ROW - 1; row < values.length; row++) {
    if (String(values[row][1] || '').trim() === person.name) {
      rowNumber = row + 1;
      break;
    }
  }
  if (!rowNumber) return { matchedCount: 0, newlyEarned: 0, matches: {} };
  const definitions = trackerBadgeDefinitions_(sheet);
  const matches = {};
  let newlyEarned = 0;
  badges.forEach(function (badge) {
    const definition = definitions.find(function (item) { return badgeNamesMatch_(item.name, badge.name); });
    if (!definition) return;
    matches[normaliseBadgeKey_(badge.name)] = definition.columnLetter;
    const current = sheet.getRange(rowNumber, definition.column).getValue();
    if (!(current === true || String(current).toUpperCase() === 'TRUE')) {
      sheet.getRange(rowNumber, definition.column).setValue(true);
      newlyEarned++;
    }
  });
  return { matchedCount: Object.keys(matches).length, newlyEarned: newlyEarned, matches: matches };
}

function mergeEarnedBadges_(trackerBadges, profileBadges) {
  const result = {};
  (trackerBadges || []).forEach(function (badge) { result[normaliseBadgeKey_(badge.name)] = badge; });
  (profileBadges || []).forEach(function (badge) {
    const key = normaliseBadgeKey_(badge.name);
    result[key] = Object.assign({}, result[key] || {}, badge);
  });
  return Object.keys(result).filter(Boolean).map(function (key) { return result[key]; });
}

function syncBadgesForPerson_(person, profileUrl) {
  const fetched = fetchSkillsProfileBadges_(profileUrl);
  const syncedAt = new Date();
  const trackerResult = markTrackerBadgesEarned_(person, fetched.badges);
  replaceEarnedBadges_(person, fetched.profileUrl, fetched.badges, trackerResult.matches, syncedAt);
  return writeBadgeSyncStatus_(
    person, fetched.profileUrl, fetched.badges.length, trackerResult.matchedCount, 'success',
    'Imported ' + fetched.badges.length + ' badge(s); ' + trackerResult.matchedCount + ' matched the Badge Tracker.', syncedAt
  );
}

function maybeSyncBadgesForPerson_(person, profileUrl, force) {
  if (!profileUrl) return { status: 'not_configured', message: 'Add a public Google Skills profile URL to enable automatic badge sync.' };
  let canonicalUrl;
  try {
    canonicalUrl = normaliseSkillsProfileUrl_(profileUrl);
  } catch (error) {
    return { status: 'error', message: error.message };
  }
  const previous = readBadgeSyncStatus_(person.email);
  const lastSync = previous.lastSyncedValue ? new Date(previous.lastSyncedValue).getTime() : 0;
  if (!force && previous.profileUrl === canonicalUrl && lastSync && Date.now() - lastSync < BADGE_SYNC_TTL_MS) {
    return previous;
  }
  try {
    return syncBadgesForPerson_(person, canonicalUrl);
  } catch (error) {
    return writeBadgeSyncStatus_(person, canonicalUrl, previous.badgeCount || 0, previous.matchedCount || 0, 'error', error.message, new Date());
  }
}

function readTrackerProgress_() {
  const sheet = tracker_().getSheets()[0];
  const values = sheet.getDataRange().getValues();
  const roster = getRosterMap();
  const definitions = trackerBadgeDefinitions_(sheet);
  const examColumns = examColumnMap_(sheet);
  const today = date_(new Date());
  const week = weekRangeForDateKey_(today);
  const scheduleEnabled = definitions.some(function (definition) { return Boolean(definition.dueDate); });
  const result = {};
  for (let i = 2; i < values.length; i++) {
    const name = String(values[i][1] || '').trim();
    if (!name || /sample trainee/i.test(name)) continue;
    const badges = [];
    const requirements = definitions.map(function (definition) {
      const col = definition.column - 1;
      const earned = col < values[i].length && (values[i][col] === true || String(values[i][col]).toUpperCase() === 'TRUE');
      let status = 'unscheduled';
      if (earned) status = 'complete';
      else if (definition.dueDate) {
        if (definition.dueDate < today) status = 'overdue';
        else if (definition.dueDate === today) status = 'due_today';
        else if (definition.dueDate <= week.end) status = 'due_this_week';
        else status = 'upcoming';
      }
      if (earned) {
        badges.push({
          id: 'tracker-' + definition.column, name: definition.name,
          badgeKey: definition.key,
          url: '', imageUrl: '', earnedAt: '', trackerColumn: definition.columnLetter,
          dueDate: definition.dueDate, dueDateDisplay: definition.dueDateDisplay,
          source: 'tracker', matched: true
        });
      }
      return {
        badgeKey: definition.key,
        name: definition.name,
        trackerColumn: definition.columnLetter,
        dueDate: definition.dueDate,
        dueDateDisplay: definition.dueDateDisplay,
        earned: earned,
        status: status
      };
    });
    const dueRequirements = scheduleEnabled
      ? requirements.filter(function (requirement) { return requirement.dueDate && requirement.dueDate <= today; })
      : requirements;
    const completed = dueRequirements.filter(function (requirement) { return requirement.earned; }).length;
    const total = dueRequirements.length;
    const overallCompleted = requirements.filter(function (requirement) { return requirement.earned; }).length;
    const thisWeekRequirements = requirements.filter(function (requirement) {
      return requirement.dueDate && requirement.dueDate >= week.start && requirement.dueDate <= week.end;
    });
    const overdueRequirements = requirements.filter(function (requirement) { return requirement.status === 'overdue'; });
    const futureRequirements = requirements.filter(function (requirement) { return requirement.dueDate && requirement.dueDate > week.end; });
    const nextDueDate = futureRequirements.reduce(function (earliest, requirement) {
      return !earliest || requirement.dueDate < earliest ? requirement.dueDate : earliest;
    }, '');
    const nextRequirements = nextDueDate
      ? futureRequirements.filter(function (requirement) { return requirement.dueDate === nextDueDate; })
      : [];
    const email = roster[name] || '';
    const resultKey = email || ('tracker:' + normaliseBadgeKey_(name));
    result[resultKey] = {
      name: name,
      email: email,
      trackerOnly: !email,
      completedCount: completed,
      totalCount: total,
      progress: total ? Math.round(completed / total * 100) : (scheduleEnabled ? 100 : 0),
      overallCompletedCount: overallCompleted,
      overallTotalCount: requirements.length,
      overallProgress: requirements.length ? Math.round(overallCompleted / requirements.length * 100) : 0,
      scheduleEnabled: scheduleEnabled,
      asOfDate: today,
      weekStart: week.start,
      weekEnd: week.end,
      weekStartDisplay: displayDateKey_(week.start),
      weekEndDisplay: displayDateKey_(week.end),
      overdueCount: overdueRequirements.length,
      dueTodayCount: requirements.filter(function (requirement) { return requirement.status === 'due_today'; }).length,
      thisWeekCompletedCount: thisWeekRequirements.filter(function (requirement) { return requirement.earned; }).length,
      thisWeekTotalCount: thisWeekRequirements.length,
      requirements: requirements,
      overdueRequirements: overdueRequirements,
      thisWeekRequirements: thisWeekRequirements,
      nextRequirements: nextRequirements,
      pcaScore: trackerColumnValue_(values[i], examColumns.pca_sample.score),
      mock1Score: trackerColumnValue_(values[i], examColumns.mock_exam_1.score),
      mock2Score: trackerColumnValue_(values[i], examColumns.mock_exam_2.score),
      badges: badges
    };
  }
  return result;
}

function requirementStatus_(earned, dueDate, today, weekEnd) {
  if (earned) return 'complete';
  if (!dueDate) return 'unscheduled';
  if (dueDate < today) return 'overdue';
  if (dueDate === today) return 'due_today';
  if (dueDate <= weekEnd) return 'due_this_week';
  return 'upcoming';
}

function badgeAssignmentFor_(item, assignments) {
  const trackerColumn = String(item && item.trackerColumn || '').trim().toUpperCase();
  const badgeKey = String(item && item.badgeKey || '').trim() || normaliseBadgeKey_(item && (item.name || item.badgeName));
  return (assignments || []).find(function (assignment) {
    return assignment.trackerColumn === trackerColumn
      || (badgeKey && assignment.badgeKey === badgeKey)
      || (assignment.badgeName && badgeNamesMatch_(assignment.badgeName, item && (item.name || item.badgeName)));
  }) || null;
}

function scopeEarnedBadgesForClass_(badges, classConfig) {
  const source = Array.isArray(badges) ? badges : [];
  if (!classConfig || classConfig.badgesEnabled === false) return classConfig ? [] : source;
  if (normaliseBadgeAssignmentMode_(classConfig.badgeMode) === 'EXPLICIT') {
    const assignments = Array.isArray(classConfig.badgeRequirements) ? classConfig.badgeRequirements : [];
    return source.filter(function (badge) { return Boolean(badgeAssignmentFor_(badge, assignments)); });
  }
  const badgeColumnSpec = safeBadgeColumnSpec_(classConfig.badgeColumns);
  return source.filter(function (badge) {
    if (badge.trackerColumn) return badgeColumnAllowed_(columnNumber_(badge.trackerColumn), badgeColumnSpec);
    return true;
  });
}

function scopeTrackerProgress_(progress, classConfig) {
  const source = progress || {};
  const featureEnabled = !classConfig || classConfig.badgesEnabled !== false;
  const badgeColumnSpec = classConfig ? safeBadgeColumnSpec_(classConfig.badgeColumns) : BADGE_COLUMN_SPEC_DEFAULT;
  const badgeMode = classConfig ? normaliseBadgeAssignmentMode_(classConfig.badgeMode) : 'LEGACY';
  const today = source.asOfDate || date_(new Date());
  const week = source.weekStart && source.weekEnd
    ? { start: source.weekStart, end: source.weekEnd }
    : weekRangeForDateKey_(today);
  let requirements = [];
  if (featureEnabled && Array.isArray(source.requirements)) {
    if (badgeMode === 'EXPLICIT') {
      const assignments = Array.isArray(classConfig.badgeRequirements) ? classConfig.badgeRequirements : [];
      requirements = source.requirements.map(function (requirement) {
        const assignment = badgeAssignmentFor_(requirement, assignments);
        if (!assignment) return null;
        const dueDate = assignment.dueDateOverride || requirement.dueDate || '';
        return Object.assign({}, requirement, {
          badgeKey: requirement.badgeKey || assignment.badgeKey,
          dueDate: dueDate,
          dueDateDisplay: displayDateKey_(dueDate),
          status: requirementStatus_(requirement.earned, dueDate, today, week.end),
          classDueDateOverride: assignment.dueDateOverride || '',
          classSortOrder: assignment.sortOrder || 0
        });
      }).filter(Boolean).sort(function (left, right) {
        return left.classSortOrder - right.classSortOrder
          || columnNumber_(left.trackerColumn) - columnNumber_(right.trackerColumn);
      });
    } else {
      requirements = source.requirements.filter(function (requirement) {
        return badgeColumnAllowed_(columnNumber_(requirement.trackerColumn), badgeColumnSpec);
      }).map(function (requirement) {
        return Object.assign({}, requirement, {
          status: requirementStatus_(requirement.earned, requirement.dueDate, today, week.end)
        });
      });
    }
  }
  const scheduleEnabled = requirements.some(function (requirement) { return Boolean(requirement.dueDate); });
  const dueRequirements = scheduleEnabled
    ? requirements.filter(function (requirement) { return requirement.dueDate && requirement.dueDate <= today; })
    : requirements;
  const completed = dueRequirements.filter(function (requirement) { return requirement.earned; }).length;
  const overallCompleted = requirements.filter(function (requirement) { return requirement.earned; }).length;
  const thisWeekRequirements = requirements.filter(function (requirement) {
    return requirement.dueDate && requirement.dueDate >= week.start && requirement.dueDate <= week.end;
  });
  const overdueRequirements = requirements.filter(function (requirement) { return requirement.status === 'overdue'; });
  const futureRequirements = requirements.filter(function (requirement) {
    return requirement.dueDate && requirement.dueDate > week.end;
  });
  const nextDueDate = futureRequirements.reduce(function (earliest, requirement) {
    return !earliest || requirement.dueDate < earliest ? requirement.dueDate : earliest;
  }, '');
  const nextRequirements = nextDueDate
    ? futureRequirements.filter(function (requirement) { return requirement.dueDate === nextDueDate; })
    : [];
  const badges = featureEnabled
    ? scopeEarnedBadgesForClass_(source.badges, classConfig)
    : [];
  return Object.assign({}, source, {
    featureEnabled: featureEnabled,
    badgeColumnSpec: badgeColumnSpec,
    badgeAssignmentMode: badgeMode,
    completedCount: completed,
    totalCount: dueRequirements.length,
    progress: dueRequirements.length
      ? Math.round(completed / dueRequirements.length * 100)
      : (scheduleEnabled ? 100 : 0),
    overallCompletedCount: overallCompleted,
    overallTotalCount: requirements.length,
    overallProgress: requirements.length ? Math.round(overallCompleted / requirements.length * 100) : 0,
    scheduleEnabled: scheduleEnabled,
    overdueCount: overdueRequirements.length,
    dueTodayCount: requirements.filter(function (requirement) { return requirement.status === 'due_today'; }).length,
    thisWeekCompletedCount: thisWeekRequirements.filter(function (requirement) { return requirement.earned; }).length,
    thisWeekTotalCount: thisWeekRequirements.length,
    requirements: requirements,
    overdueRequirements: overdueRequirements,
    thisWeekRequirements: thisWeekRequirements,
    nextRequirements: nextRequirements,
    badges: badges
  });
}

function doGet(e) {
  if (!e || !e.parameter || Object.keys(e.parameter).length === 0) {
    return HtmlService.createHtmlOutput('<h2>SISG API is running</h2><p>Open <a href="' + APP_URL + '">the SISG application</a>.</p>')
      .setTitle('SISG API');
  }
  try {
    const requestedAction = e.parameter.action || 'get_trainees';
    const identity = requireIdentity_(e.parameter, requestedAction !== 'get_student');
    const action = e.parameter.action || 'get_trainees';
    if (action === 'get_students') return ok_(Object.keys(getRosterMap()));
    if (action === 'get_student') {
      e.parameter.email = identity.email;
      const person = requirePerson_(e.parameter);
      const classes = activeStudentClasses_(person.email);
      const selectedClass = resolveStudentClass_(person.email, e.parameter.classId);
      const profileUrl = readProfile_(person);
      const badgeSync = selectedClass.badgesEnabled
        ? maybeSyncBadgesForPerson_(person, profileUrl, false)
        : { status: 'disabled', message: 'Badge tracking is disabled for this class.' };
      const baseProgress = readTrackerProgress_()[person.email]
        || { completedCount: 0, totalCount: 0, progress: 0, badges: [], requirements: [] };
      const progress = scopeTrackerProgress_(baseProgress, selectedClass);
      const calendar = readCourseCalendar_(person.email, new Date(), selectedClass.id, e.parameter.month);
      const portalLinks = readPortalSettings_(false);
      // Feedback forms are class-owned. Remove the legacy shared values before
      // adding the selected class's links so an unconfigured class cannot see
      // another class's forms through Portal Settings.
      CLASS_FEEDBACK_LINK_KEYS.forEach(function (key) {
        delete portalLinks[key];
      });
      const classFeedbackLinks = readClassFeedbackLinks_(selectedClass.id, false, false);
      Object.keys(classFeedbackLinks).forEach(function (key) {
        portalLinks[key] = classFeedbackLinks[key];
      });
      const classExamLinks = readClassExamLinks_(selectedClass.id, false, true);
      Object.keys(classExamLinks).forEach(function (key) {
        portalLinks[key] = classExamLinks[key];
      });
      if (!selectedClass.mockExamsEnabled) {
        CLASS_EXAM_LINK_KEYS.forEach(function (key) { delete portalLinks[key]; });
      }
      return ok_({
        person: person,
        classes: classes,
        selectedClass: selectedClass,
        features: {
          portalEnabled: selectedClass.portalEnabled,
          attendanceEnabled: selectedClass.attendanceEnabled,
          badgesEnabled: selectedClass.badgesEnabled,
          resourcesEnabled: selectedClass.resourcesEnabled,
          mockExamsEnabled: selectedClass.mockExamsEnabled
        },
        profileUrl: profileUrl,
        exam: selectedClass.mockExamsEnabled ? readExam_(person) : { status: 'Disabled for this class' },
        examResults: selectedClass.mockExamsEnabled ? readExamResults_(person) : { latest: {}, history: [] },
        portalLinks: portalLinks,
        weeklyResources: selectedClass.resourcesEnabled ? readWeeklyResources_(calendar.weekStart, false, selectedClass.id) : [],
        attendance: selectedClass.attendanceEnabled
          ? readAttendance_(person.email, e.parameter.date || calendar.today).filter(function (log) { return log.classId === selectedClass.id; })
          : [],
        calendar: calendar,
        progress: progress,
        badges: selectedClass.badgesEnabled
          ? scopeEarnedBadgesForClass_(
            mergeEarnedBadges_(progress.badges || [], readEarnedBadges_(person.email)),
            selectedClass
          )
          : [],
        badgeSync: badgeSync,
        projects: readStudentProjectWorkspace_(person, selectedClass)
      });
    }
    const roster = getRosterMap();
    const progress = readTrackerProgress_();
    const classManagement = readClassManagement_();
    const classConfigById = {};
    classManagement.classes.forEach(function (item) { classConfigById[item.id] = item; });
    const examResultMap = readExamResultsMap_();
    const examMap = examMap_();
    const badgeSyncMap = badgeSyncMap_();
    const earnedBadgesMap = earnedBadgesMap_();
    const today = date_(new Date());
    const logs = readAttendance_('', today);
    const courseCalendar = readCourseCalendar_('', new Date(), 'ALL', e.parameter.month);
    const data = Object.keys(roster).map(name => {
      const email = roster[name];
      const personLogs = logs.filter(log => log.email === email);
      const submittedLogs = personLogs.filter(function (log) { return !/^no show$/i.test(log.attendance); });
      const personProgress = progress[email] || { completedCount: 0, totalCount: 0, progress: 0, badges: [] };
      const membershipRows = classManagement.memberships.filter(function (item) { return item.email === email; });
      const classIds = membershipRows.length
        ? membershipRows.filter(function (item) { return item.active; }).map(function (item) { return item.classId; })
        : [DEFAULT_CLASS_ID];
      const progressByClass = {};
      classIds.forEach(function (classId) {
        const classConfig = classConfigById[classId];
        if (classConfig) progressByClass[classId] = scopeTrackerProgress_(personProgress, classConfig);
      });
      return Object.assign({}, personProgress, {
        name: name, email: email,
        classIds: classIds,
        progressByClass: progressByClass,
        attendanceRecords: personLogs,
        todayAttendance: submittedLogs.length ? submittedLogs.map(log => log.session + ': ' + log.attendance).join(', ') : 'Not Checked-in',
        hasSubmittedAttendance: submittedLogs.length > 0,
        hasNoShow: personLogs.some(function (log) { return /^no show$/i.test(log.attendance); }),
        isAcknowledged: submittedLogs.length > 0 && submittedLogs.every(log => log.acknowledged),
        todaySessions: courseCalendar.todayEvents.filter(function (event) { return classIds.indexOf(event.classId) >= 0; }),
        exam: examMap[email] || { status: 'Not scheduled' },
        examResults: examResultMap[email] || { latest: {}, history: [] },
        badges: mergeEarnedBadges_(personProgress.badges || [], earnedBadgesMap[email] || []),
        badgeSync: badgeSyncMap[email] || { status: 'not_synced', message: 'Badge profile has not been synced yet.' }
      });
    });
    Object.keys(progress).forEach(function (key) {
      const trackerPerson = progress[key];
      if (!trackerPerson.trackerOnly) return;
      data.push(Object.assign({}, trackerPerson, {
        name: trackerPerson.name,
        email: '',
        classIds: [DEFAULT_CLASS_ID],
        progressByClass: classConfigById[DEFAULT_CLASS_ID]
          ? { DEFAULT: scopeTrackerProgress_(trackerPerson, classConfigById[DEFAULT_CLASS_ID]) }
          : {},
        attendanceRecords: [],
        todayAttendance: 'Not linked to attendance roster',
        hasSubmittedAttendance: false,
        hasNoShow: false,
        isAcknowledged: false,
        todaySessions: courseCalendar.todayEvents.filter(function (event) { return event.classId === DEFAULT_CLASS_ID; }),
        exam: { status: 'Tracker only' },
        examResults: { latest: {}, history: [] },
        badges: trackerPerson.badges || [],
        badgeSync: { status: 'not_linked', message: 'Add this trainee to Roster with an email to enable attendance and profile sync.' }
      }));
    });
    return ok_({
      trainees: data,
      calendar: courseCalendar,
      weeklyResources: readWeeklyResources_(courseCalendar.weekStart, true, 'ALL'),
      resourceHistory: readWeeklyResourceHistory_('ALL'),
      portalLinks: readPortalSettings_(true),
      classManagement: classManagement,
      mockScores: buildMockScoreShowcase_(data)
    });
  } catch (error) {
    return fail_(error);
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    if (!lock.tryLock(30000)) throw new Error('Server busy. Please try again.');
    const data = JSON.parse(e.postData && e.postData.contents || '{}');
    const action = data.action;
    const trainerAction = [
      'teacher_acknowledge', 'send_attendance_emails', 'sync_all_badges',
      'save_portal_links', 'save_weekly_resource', 'delete_weekly_resource',
      'save_class', 'save_class_members', 'save_class_badges', 'save_class_feedback_links', 'save_class_exam_links',
      'save_project_group', 'save_project_group_assignments', 'save_project', 'save_group_project',
      'save_badge_definition', 'archive_badge_definition', 'save_course', 'archive_course'
    ].indexOf(action) >= 0;
    const identity = requireIdentity_(data, trainerAction);
    data.email = identity.email;
    if (action === 'verify_email') {
      const person = rosterPersonByEmail_(identity.email);
      return person ? ok_(person) : fail_(new Error('Email not found.'));
    }
    if (action === 'student_checkin') return studentCheckin_(data);
    if (action === 'teacher_acknowledge') return acknowledge_(data);
    if (action === 'register_pca_exam') return registerExam_(data);
    if (action === 'submit_exam_result') return submitExamResult_(data);
    if (action === 'submit_feedback') return submitFeedback_(data);
    if (action === 'save_profile') return saveProfile_(data);
    if (action === 'sync_badges') return syncBadgesAction_(data);
    if (action === 'sync_all_badges') return syncAllBadgeProfilesAction_();
    if (action === 'save_portal_links') return savePortalLinks_(data);
    if (action === 'save_weekly_resource') return saveWeeklyResource_(data);
    if (action === 'delete_weekly_resource') return deleteWeeklyResource_(data);
    if (action === 'save_class') return saveClass_(data);
    if (action === 'save_class_members') return saveClassMembers_(data);
    if (action === 'save_class_badges') return saveClassBadges_(data);
    if (action === 'save_class_feedback_links') return saveClassFeedbackLinks_(data);
    if (action === 'save_class_exam_links') return saveClassExamLinks_(data);
    if (action === 'save_project_group') return saveProjectGroup_(data);
    if (action === 'save_project_group_assignments') return saveProjectGroupAssignments_(data);
    if (action === 'save_project') return saveProject_(data);
    if (action === 'save_group_project') return saveGroupProject_(data);
    if (action === 'submit_project_submission') return submitProjectSubmission_(data);
    if (action === 'submit_peer_evaluation') return submitPeerEvaluation_(data);
    if (action === 'save_badge_definition') return saveBadgeDefinition_(data);
    if (action === 'archive_badge_definition') return archiveBadgeDefinition_(data);
    if (action === 'save_course') return saveCourse_(data);
    if (action === 'archive_course') return archiveCourse_(data);
    if (action === 'send_attendance_emails') return sendAttendanceEmails_(data);
    throw new Error('Unknown action: ' + action);
  } catch (error) {
    return fail_(error);
  } finally {
    lock.releaseLock();
  }
}

function studentCheckin_(data) {
  const access = requireStudentFeature_(data, 'attendanceEnabled');
  const person = access.person;
  const classConfig = access.classConfig;
  const now = new Date();
  const day = date_(now);
  const requestedCourseId = normaliseCourseId_(data.courseId);
  const requestedSession = String(data.session || (Number(time_(now).slice(0, 2)) < 13 ? 'Morning' : 'Afternoon'));
  if (!requestedCourseId && ['Morning', 'Afternoon'].indexOf(requestedSession) < 0) throw new Error('Invalid attendance checkpoint.');
  const calendar = readCourseCalendar_(person.email, now, classConfig.id);
  const publishedEvents = calendar.todayEvents.filter(function (event) {
    return event.attendanceEnabled && /^published$/i.test(event.portalStatus);
  });
  if (!publishedEvents.length) throw new Error('Attendance is closed because no session is scheduled for today.');
  const targetEvent = data.isMC
    ? (publishedEvents.find(function (event) { return normaliseCourseId_(event.courseId) === requestedCourseId; }) || publishedEvents[0])
    : (publishedEvents.find(function (event) { return normaliseCourseId_(event.courseId) === requestedCourseId; })
      || publishedEvents.find(function (event) { return event.session === requestedSession; }));
  if (!targetEvent) throw new Error(requestedSession + ' attendance is not scheduled for today.');
  if (!data.isMC && !targetEvent.canCheckIn) {
    if (targetEvent.state === 'upcoming' || targetEvent.state === 'scheduled') {
      throw new Error(targetEvent.attendanceLabel + ' attendance opens at ' + targetEvent.checkInOpens + '.');
    }
    if (['submitted', 'verified', 'excused'].indexOf(targetEvent.state) >= 0) {
      throw new Error(targetEvent.attendanceLabel + ' attendance is already recorded.');
    }
    throw new Error(targetEvent.attendanceLabel + ' attendance is not available right now.');
  }
  const nowMinutes = Number(time_(now).slice(0, 2)) * 60 + Number(time_(now).slice(3, 5));
  const late = !data.isMC && nowMinutes > targetEvent.attendanceMinutes;
  const comment = String(data.comment || '').trim();
  if (late && !comment) throw new Error('A reason is required for a late check-in.');
  const existing = readAttendance_(person.email, day).filter(function (log) { return log.classId === classConfig.id; });
  const existingCompleted = existing.filter(function (log) { return !/^no show$/i.test(String(log.attendance || '')); });
  if (existingCompleted.some(function (log) { return log.session === 'MC'; }) || (data.isMC && existingCompleted.length)) {
    throw new Error('Attendance is already recorded for today.');
  }
  if (existingCompleted.some(function (log) { return normaliseCourseId_(log.courseId) === normaliseCourseId_(targetEvent.courseId); })) {
    throw new Error(targetEvent.attendanceLabel + ' attendance is already recorded today.');
  }

  let fileUrl = '';
  if (data.fileData) {
    const bytes = Utilities.base64Decode(data.fileData);
    if (bytes.length > 5 * 1024 * 1024) throw new Error('MC attachment must be 5 MB or smaller.');
    const folderIterator = DriveApp.getFoldersByName('MC_Uploads');
    const folder = folderIterator.hasNext() ? folderIterator.next() : DriveApp.createFolder('MC_Uploads');
    const safeName = (person.name + '_' + day + '_' + (data.fileName || 'MC')).replace(/[^a-zA-Z0-9._-]/g, '_');
    fileUrl = folder.createFile(Utilities.newBlob(bytes, data.mimeType || 'application/octet-stream', safeName)).getUrl();
  }

  const sheet = getOrCreateSheet_(attendance_(), SHEETS.attendance, HEADERS.attendance);
  const attendanceValue = data.isMC ? 'MC' : (late ? 'Late' : 'In Class');
  const sheetRows = rows_(sheet, HEADERS.attendance.length);
  const noShowIndexes = [];
  sheetRows.forEach(function (row, index) {
    const sameCheckpoint = data.isMC || normaliseCourseId_(row[1]) === normaliseCourseId_(targetEvent.courseId);
    if (
      sameCheckpoint
      && String(row[2] || '').toLowerCase() === person.email
      && trackerDueDateKey_(row[5], row[5]) === day
      && normaliseClassId_(row[10] || DEFAULT_CLASS_ID, true) === classConfig.id
      && /^no show$/i.test(String(row[3] || ''))
    ) noShowIndexes.push(index);
  });
  const noShowIndex = noShowIndexes.length ? noShowIndexes[0] : -1;
  const attendanceRow = [
    noShowIndex >= 0 ? sheetRows[noShowIndex][0] : 'LOG-' + Utilities.getUuid().slice(0, 8).toUpperCase(),
    targetEvent.courseId, person.email, attendanceValue, false,
    day, time_(now), comment, fileUrl, now, classConfig.id,
    noShowIndex >= 0 ? 'Student correction after automatic no-show' : 'Student'
  ];
  if (data.isMC && noShowIndexes.length) {
    noShowIndexes.forEach(function (index) {
      const corrected = attendanceRow.slice();
      corrected[0] = sheetRows[index][0];
      corrected[1] = sheetRows[index][1];
      sheet.getRange(index + 2, 1, 1, HEADERS.attendance.length).setValues([corrected]);
    });
  } else if (noShowIndex >= 0) {
    sheet.getRange(noShowIndex + 2, 1, 1, HEADERS.attendance.length).setValues([attendanceRow]);
  } else {
    sheet.appendRow(attendanceRow);
  }
  const session = data.isMC ? 'MC' : requestedSession;
  try {
    MailApp.sendEmail(
      person.email,
      'Attendance received: ' + targetEvent.attendanceLabel,
      'Hello ' + person.name + ', your ' + targetEvent.attendanceLabel.toLowerCase() + ' attendance for ' + targetEvent.course + ' was recorded at ' + time_(now) + '.'
    );
  } catch (_) {}
  return ok_({
    session: session,
    courseId: targetEvent.courseId,
    attendanceLabel: targetEvent.attendanceLabel,
    late: late,
    time: time_(now)
  }, targetEvent.attendanceLabel + ' attendance recorded successfully!');
}

function acknowledge_(data) {
  const person = requirePerson_({ email: data.studentEmail });
  const session = String(data.session || '').trim();
  const courseId = normaliseCourseId_(data.courseId);
  const classId = normaliseClassId_(data.classId, true);
  const day = String(data.date || date_(new Date()));
  const sheet = getOrCreateSheet_(attendance_(), SHEETS.attendance, HEADERS.attendance);
  const values = rows_(sheet, HEADERS.attendance.length);
  let count = 0;
  values.forEach(function (row, index) {
    const rowCourseId = normaliseCourseId_(row[1]);
    const rowSession = attendanceSessionFromRow_(row);
    const rowClassId = normaliseClassId_(row[10] || DEFAULT_CLASS_ID, true) || DEFAULT_CLASS_ID;
    const sameCheckpoint = (!courseId && !session)
      || (courseId && rowCourseId === courseId)
      || (session && rowSession === session);
    const sameClass = !classId || classId === 'ALL' || rowClassId === classId;
    if (
      String(row[2] || '').trim().toLowerCase() === person.email
      && date_(row[5]) === day
      && sameCheckpoint
      && sameClass
      && !/^no show$/i.test(String(row[3] || '').trim())
      && row[4] !== true
    ) {
      sheet.getRange(index + 2, 5).setValue(true);
      count++;
    }
  });
  if (!count) throw new Error('No unverified student check-in was found for this date.');
  return ok_({ updated: count }, count === 1 ? 'Attendance verified!' : count + ' attendance records verified!');
}

function upsertByEmail_(sheet, width, email, values) {
  const data = rows_(sheet, width);
  const index = data.findIndex(row => String(row[0]).toLowerCase() === email);
  if (index < 0) sheet.appendRow(values);
  else sheet.getRange(index + 2, 1, 1, width).setValues([values]);
}

function registerExam_(data) {
  const person = requireStudentFeature_(data, 'mockExamsEnabled').person;
  if (!data.examDate || !data.examVenue) throw new Error('Exam date and venue are required.');
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.exams, HEADERS.exams);
  const current = readExam_(person);
  upsertByEmail_(sheet, HEADERS.exams.length, person.email, [
    person.email, person.name, data.examDate, data.examVenue,
    data.examStatus || 'Scheduled', data.voucherCode || current.voucher || '', new Date()
  ]);
  return ok_(null, 'PCA exam intent registered successfully!');
}

function submitFeedback_(data) {
  const person = requirePerson_(data);
  if (!String(data.feedbackText || '').trim()) throw new Error('Feedback cannot be empty.');
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.feedback, HEADERS.feedback);
  sheet.appendRow([new Date(), person.name, person.email, data.feedbackType || 'Suggestion', data.feedbackText, data.anonymous === true]);
  return ok_(null, 'Thank you! Your feedback has been recorded.');
}

function saveProfile_(data) {
  const person = requireStudentFeature_(data, 'badgesEnabled').person;
  const url = normaliseSkillsProfileUrl_(data.skillsUrl);
  const sheet = getOrCreateSheet_(tracker_(), SHEETS.profiles, HEADERS.profiles);
  upsertByEmail_(sheet, HEADERS.profiles.length, person.email, [person.email, person.name, url, new Date()]);
  const legacySheet = tracker_().getSheets()[0];
  const legacyRows = legacySheet.getDataRange().getValues();
  for (let i = 2; i < legacyRows.length; i++) {
    if (String(legacyRows[i][1] || '').trim() === person.name) {
      legacySheet.getRange(i + 1, 3).setValue(url);
      break;
    }
  }
  const badgeSync = maybeSyncBadgesForPerson_(person, url, true);
  const message = badgeSync.status === 'success'
    ? 'Profile saved and ' + badgeSync.badgeCount + ' badge(s) synced successfully!'
    : 'Profile saved. Badge sync needs attention: ' + badgeSync.message;
  return ok_({ badgeSync: badgeSync, badges: readEarnedBadges_(person.email) }, message);
}

function syncBadgesAction_(data) {
  const access = requireStudentFeature_(data, 'badgesEnabled');
  const person = access.person;
  const profileUrl = readProfile_(person);
  if (!profileUrl) throw new Error('Save your public Google Skills profile URL first.');
  const badgeSync = maybeSyncBadgesForPerson_(person, profileUrl, true);
  if (badgeSync.status !== 'success') throw new Error(badgeSync.message || 'Badge sync failed.');
  const baseProgress = readTrackerProgress_()[person.email]
    || { completedCount: 0, totalCount: 0, progress: 0, badges: [], requirements: [] };
  const progress = scopeTrackerProgress_(baseProgress, access.classConfig);
  return ok_({
    badgeSync: badgeSync,
    progress: progress,
    badges: scopeEarnedBadgesForClass_(
      mergeEarnedBadges_(progress.badges || [], readEarnedBadges_(person.email)),
      access.classConfig
    )
  }, badgeSync.message);
}

function syncAllBadgeProfiles() {
  const roster = getRosterMap();
  const summary = { synced: 0, skipped: 0, failed: 0, badges: 0, matched: 0 };
  Object.keys(roster).forEach(function (name) {
    const person = { name: name, email: roster[name] };
    const profileUrl = readProfile_(person);
    if (!profileUrl) {
      summary.skipped++;
      return;
    }
    const result = maybeSyncBadgesForPerson_(person, profileUrl, true);
    if (result.status === 'success') {
      summary.synced++;
      summary.badges += result.badgeCount || 0;
      summary.matched += result.matchedCount || 0;
    } else {
      summary.failed++;
    }
  });
  return summary;
}

function syncAllBadgeProfilesAction_() {
  const summary = syncAllBadgeProfiles();
  return ok_(summary, 'Badge sync complete: ' + summary.synced + ' synced, ' + summary.skipped + ' skipped, ' + summary.failed + ' failed.');
}

function installBadgeSyncTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === 'syncAllBadgeProfiles') ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger('syncAllBadgeProfiles').timeBased().everyDays(1).atHour(6).create();
  return 'Daily badge sync installed for approximately 06:00 ' + TZ + '.';
}

function dailyAttendanceReminder() {
  return sendAttendanceReminderForSession_('Morning', new Date());
}

function afternoonAttendanceReminder() {
  return sendAttendanceReminderForSession_('Afternoon', new Date());
}

function sendAttendanceReminderForSession_(session, now) {
  const current = now || new Date();
  const calendar = readCourseCalendar_('', current, 'ALL');
  const events = calendar.todayEvents.filter(function (item) {
    return item.session === session && item.attendanceEnabled && /^published$/i.test(item.portalStatus);
  });
  if (!events.length) return { sent: 0, skipped: true, message: 'No ' + session.toLowerCase() + ' attendance checkpoint is scheduled today.' };
  const roster = getRosterMap();
  const today = calendar.today;
  const logs = readAttendance_('', today);
  let sent = 0;
  events.forEach(function (event) {
    const members = memberEmailsForClass_(event.classId);
    Object.keys(roster).forEach(function (name) {
      const email = roster[name];
      if (members.indexOf(email) < 0) return;
      if (!logs.some(function (log) {
        return log.email === email
          && log.classId === event.classId
          && (normaliseCourseId_(log.courseId) === normaliseCourseId_(event.courseId) || log.session === 'MC');
      })) {
        try {
          MailApp.sendEmail(
            email,
            'Attendance reminder: ' + event.attendanceLabel,
            'Hello ' + name + ',\n\n' + event.attendanceLabel + ' attendance for ' + event.course + ' is due at ' + event.attendanceTime + '.\n\nComplete it here:\n' + APP_URL
          );
          sent++;
        } catch (_) {}
      }
    });
  });
  return { sent: sent, skipped: false, session: session, courseIds: events.map(function (event) { return event.courseId; }) };
}

function markAttendanceNoShows(now) {
  const current = now || new Date();
  const calendar = readCourseCalendar_('', current, 'ALL');
  const minutes = Number(time_(current).slice(0, 2)) * 60 + Number(time_(current).slice(3, 5));
  const dueEvents = calendar.todayEvents.filter(function (event) {
    return event.attendanceEnabled && /^published$/i.test(event.portalStatus)
      && minutes >= event.attendanceMinutes + NO_SHOW_GRACE_MINUTES;
  });
  if (!dueEvents.length) return { created: 0, checkedEvents: 0 };
  const sheet = getOrCreateSheet_(attendance_(), SHEETS.attendance, HEADERS.attendance);
  const recordedCheckpoints = {};
  const medicalCertificates = {};
  rows_(sheet, HEADERS.attendance.length).forEach(function (row) {
    if (date_(row[5]) !== calendar.today) return;
    const email = String(row[2] || '').trim().toLowerCase();
    const classId = normaliseClassId_(row[10] || DEFAULT_CLASS_ID, true) || DEFAULT_CLASS_ID;
    const courseId = normaliseCourseId_(row[1]);
    if (!email || !courseId) return;
    recordedCheckpoints[attendanceCheckpointKey_(email, calendar.today, classId, courseId)] = true;
    if (attendanceSessionFromRow_(row) === 'MC') medicalCertificates[email + '|' + classId] = true;
  });
  const additions = [];
  dueEvents.forEach(function (event) {
    let classConfig;
    try {
      classConfig = classById_(event.classId, false);
    } catch (_) {
      return;
    }
    if (!classConfig.attendanceEnabled) return;
    memberEmailsForClass_(event.classId).forEach(function (email) {
      const checkpointKey = attendanceCheckpointKey_(email, calendar.today, event.classId, event.courseId);
      if (recordedCheckpoints[checkpointKey] || medicalCertificates[email + '|' + event.classId]) return;
      additions.push([
        'LOG-' + Utilities.getUuid().slice(0, 8).toUpperCase(),
        event.courseId,
        email,
        'No Show',
        false,
        calendar.today,
        time_(current),
        'Automatically marked after the ' + NO_SHOW_GRACE_MINUTES + '-minute attendance grace period.',
        '',
        current,
        event.classId,
        'Automation'
      ]);
      recordedCheckpoints[checkpointKey] = true;
    });
  });
  if (additions.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, additions.length, HEADERS.attendance.length).setValues(additions);
  }
  return { created: additions.length, checkedEvents: dueEvents.length };
}

function attendanceCalendarTick() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return 'Attendance check skipped because another run is still active.';
  try {
    const now = new Date();
    const minutes = Number(time_(now).slice(0, 2)) * 60 + Number(time_(now).slice(3, 5));
    const noShows = markAttendanceNoShows(now);
    const calendar = readCourseCalendar_('', now, 'ALL');
    const dueEvent = calendar.todayEvents.find(function (event) {
      return event.attendanceEnabled && /^published$/i.test(event.portalStatus) && minutes >= event.attendanceMinutes && minutes < event.attendanceMinutes + 10;
    });
    if (!dueEvent) return 'No attendance reminder is due now. Automatic no-shows created: ' + noShows.created + '.';
    const properties = PropertiesService.getScriptProperties();
    const key = 'attendance-reminder-' + calendar.today + '-' + dueEvent.session;
    if (properties.getProperty(key)) return 'Reminder already sent for ' + key + '.';
    const result = sendAttendanceReminderForSession_(dueEvent.session, now);
    properties.setProperty(key, new Date().toISOString());
    return 'Attendance reminders sent: ' + result.sent + '. Automatic no-shows created: ' + noShows.created + '.';
  } finally {
    lock.releaseLock();
  }
}

function installAttendanceCalendarTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (['attendanceCalendarTick', 'dailyAttendanceReminder', 'afternoonAttendanceReminder'].indexOf(trigger.getHandlerFunction()) >= 0) {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  ScriptApp.newTrigger('attendanceCalendarTick').timeBased().everyMinutes(5).create();
  return 'Attendance reminders and automatic no-shows installed. The schedule is checked every five minutes in ' + TZ + '.';
}

function sendAttendanceEmails_(data) {
  const roster = getRosterMap();
  const targetUrl = String(data.studentPageUrl || APP_URL);
  const classId = normaliseClassId_(data.classId, true);
  const recipients = classId && classId !== 'ALL' ? memberEmailsForClass_(classId) : Object.keys(roster).map(function (name) { return roster[name]; });
  let sent = 0;
  Object.keys(roster).forEach(name => {
    if (recipients.indexOf(roster[name]) < 0) return;
    try {
      MailApp.sendEmail(roster[name], 'SISG attendance check-in', 'Hello ' + name + ',\n\nPlease complete your attendance check-in:\n' + targetUrl);
      sent++;
    } catch (_) {}
  });
  return ok_({ sent: sent }, 'Attendance link sent to ' + sent + ' trainee(s).');
}

function handleClientRequest(payload) {
  return doPost({ postData: { contents: JSON.stringify(payload) } }).getContent();
}