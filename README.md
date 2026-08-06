# SISG Student + Instructor Portal

## Included systems

- Separate current-week lesson calendars showing lesson titles and contents.
- Separate monthly delivery calendars showing only **Virtual** and **Face to face** session modes.
- Multi-class management, student membership, and per-class feature toggles.
- Instructor class-session editor feeding the student calendar and attendance schedule.
- 09:00/13:00 attendance, late reasons, MC uploads, trainer verification, reminders, and automatic no-shows.
- Weekly badge deadlines in the instructor overview, weekly summary, and a compact scrollable tracker.
- Scheduled weekly resources with editable start dates, class/course scope, file uploads, and retained history.
- Mock Exam 1/2 score submission and an instructor score showcase backed by the tracker spreadsheet.
- Feedback/mock links, PCA registration, Google Skills badge sync, mobile and desktop student layouts.

## Required deployment order

### 1. Deploy Apps Script

Replace the bound Apps Script project's `Code.gs` with the included `Code.gs`.

In Apps Script:

1. Set the project time zone to `Asia/Singapore`.
2. Run `getRosterMap` once and approve Spreadsheet, Drive, Mail, and external-request permissions.
3. Run `installAttendanceCalendarTrigger` once. It installs the five-minute attendance reminder and automatic no-show worker.
4. Optional: run `installBadgeSyncTrigger` once for daily Google Skills profile synchronization.
5. Select **Deploy > Manage deployments > Edit**.
6. Choose **New version** and deploy as a Web app, executing as the script owner.
7. Keep the existing `/exec` URL. It already matches `public/config.js`.

### 2. Deploy Firebase Hosting

From this project directory:

```sh
firebase use sisg-project
firebase deploy --only hosting
```

Firestore is not used by this version. Spreadsheet data continues to be managed by Apps Script.

## Spreadsheet tabs

The backend reads `Roster` from the attendance spreadsheet and `GCP Badges` from the tracker. Existing columns remain in place; new columns are appended automatically. The first authorized API load creates or upgrades these structured tabs:

- Attendance spreadsheet: `Attendance Logs`, `Classes`, `Class Members`, `Courses`, `Weekly Resources`, `Portal Settings`
- Tracker spreadsheet: `PCA Exams`, `Feedback Logs`, `Trainee Profiles`, `Exam Results`, `Earned Badges`, `Badge Sync`

Existing course rows without a class ID and existing resource rows without a class ID are assigned to `DEFAULT`. Until explicit membership rows are saved, roster students remain members of `DEFAULT`.

Weekly resource dates are normalized to Monday. Archived resources are never deleted from the management history.

## Configuration

All pages use `public/config.js`. If the Apps Script deployment changes in future, update `GAS_URL` there only.
