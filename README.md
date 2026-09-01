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

`Code.gs` is pushed from the terminal with [clasp](https://github.com/google/clasp). There are **two separate Apps Script projects**, one per environment:

| Environment | clasp config | Deployment ID (the `AKfycb…` in the `/exec` URL) |
| --- | --- | --- |
| Sandbox (default) | `.clasp.json` | `AKfycbx6ICSTL8Uj1uvunwvGxOeoXYEsMQ95wCuA_G43vkWVOsK3A_82NUEuWbeWhWWzhH84` |
| Production | `.clasp.production.json` | `AKfycbwmfQODe5NJGfq2bzywPFASTa6Ds4RHPSJ28OLSjH5_cmsgNeNhqhtHbv18YxNvjMJFSg` |

A bare `clasp` command targets **sandbox**. Production always requires an explicit `-P` with an absolute path — clasp rejects a relative one.

```sh
# Sandbox: push code, then update the existing deployment
clasp push
clasp deploy -i AKfycbx6ICSTL8Uj1uvunwvGxOeoXYEsMQ95wCuA_G43vkWVOsK3A_82NUEuWbeWhWWzhH84 -d "what changed"

# Production
clasp -P "$PWD/.clasp.production.json" push
clasp -P "$PWD/.clasp.production.json" deploy -i AKfycbwmfQODe5NJGfq2bzywPFASTa6Ds4RHPSJ28OLSjH5_cmsgNeNhqhtHbv18YxNvjMJFSg -d "what changed"
```

> **Always pass `-i`.** A bare `clasp deploy` creates a *new* deployment with a *new* `/exec` URL. The old URL keeps serving the old code and `public/config.js` still points at it, so the live app silently runs stale code. `clasp redeploy <deploymentId>` is an equivalent that cannot omit the ID.

`clasp push` replaces the whole remote project. Run `clasp status` first — it must list only `Code.gs` and `appsscript.json`. Never run `clasp pull` or `clasp clone` in this directory; both overwrite your local `Code.gs`.

One-time setup per Apps Script project, in the browser editor:

1. Set the project time zone to `Asia/Singapore`.
2. Run `getRosterMap` once and approve Spreadsheet, Drive, Mail, and external-request permissions.
3. Run `installAttendanceCalendarTrigger` once. It installs the five-minute attendance reminder and automatic no-show worker.
4. Optional: run `installBadgeSyncTrigger` once for daily Google Skills profile synchronization.

Terminal setup: `npm install -g @google/clasp`, then `clasp login`. The Apps Script API must be enabled once at <https://script.google.com/home/usersettings> or every push fails.

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
