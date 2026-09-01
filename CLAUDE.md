# SISG Traineeship Platform — Project Context

This file is auto-read by Claude Code at the start of every session in this
project. It exists so context doesn't have to be re-explained each time.

## What this is

A Firebase-hosted web app for Street Smart Singapore's GCP/Cloud traineeship
program. Two portals:
- **Student Portal** (`app.js` + `desktop.html`, `mobile.html`)
- **Instructor Portal** (`teacher.html` — self-contained HTML + CSS + JS)

**Backend:** a single Google Apps Script project (`Code.gs`), deployed as a
Web App. No database — the datastore is two Google Sheets:
- **Tracker spreadsheet** (`TRACKER_SPREADSHEET_ID`): Badge Tracker main
  sheet (legacy, wide checkbox matrix), PCA Exams, Exam Results, Badge Sync,
  Trainee Profiles, Earned Badges, Badge Definitions, Feedback Logs,
  Behavior Reports.
- **Attendance spreadsheet** (`ATTENDANCE_SPREADSHEET_ID`): Roster,
  Instructors, Attendance Logs, Courses, Classes, Class Members, Class Badge
  Requirements, Class Feedback/Exam Links, Weekly Resources, Portal
  Settings, Project Groups/Members/Definitions/Assignments/Submissions,
  Peer Evaluations.

`SHEETS` and `HEADERS` constants at the top of `Code.gs` define every sheet
name and its column headers — keep these in sync with the real sheets if
columns ever change.

Frontend files live in `public/` and deploy via Firebase Hosting.
`config.js` holds `GAS_URL` (the Apps Script Web App URL) and `API_KEY`.

## Critical rules — do not violate these

1. **Never create a new Apps Script deployment.** Always update the
   *existing* one (pencil icon → New version → Deploy in the Apps Script
   editor; with `clasp`, use `clasp deploy -i <existing-deployment-id>`).
   A new deployment gets a new URL, silently breaking `GAS_URL` in
   `config.js` — this is the single easiest way to take the whole app down
   without an obvious error.
2. After any `Code.gs` redeploy, confirm the Deployment ID still matches
   `GAS_URL` in `config.js`.
3. **Google Drive converts uploaded HTML to Google Docs format**, destroying
   the markup. Zip files before sharing/uploading via Drive if that's ever
   needed.
4. Test risky changes on the sandbox Firebase Hosting site ("streetsmarts")
   before `firebase deploy --only hosting:production`.
5. The legacy Badge Tracker main sheet must always be accessed via the
   `badgeTrackerSheet_()` helper (name-based lookup, currently pointing at
   the "Copy of GCP Badges" tab, falling back to tab-position-0 only if the
   name isn't found). Never revert to `tracker_().getSheets()[0]` directly
   — that was the original fragility (breaks on tab reorder/rename) and was
   deliberately fixed across 12 call sites.

## Performance architecture (already built — don't undo without reason)

- The Sheets Advanced Service (`Sheets` identifier, v4) is enabled and used
  by `warmSheetBatchCache_()` to fetch most sheets in **2 `batchGet` calls**
  instead of ~20 sequential live reads, on both the `get_trainees` and
  `get_student` paths in `doGet`. This took the trainer-overview response
  from ~23s to ~4.5s.
- `rows_()`, `dataRangeValues_()`, and `getOrCreateSheet_()` are all
  cache-aware: they check the batch cache first and transparently fall back
  to live `SpreadsheetApp` reads if the cache isn't warmed, a sheet wasn't
  included, or the Advanced Service isn't enabled. Nothing breaks if the
  cache is unavailable — it just runs at the old (slower) speed.
- **Deliberately excluded from the batch cache:** Feedback Logs and
  Behavior Reports sheets. They're low-volume, and caching them would
  introduce a timezone-conversion bug for precise timestamps, since the
  Sheets API can only return serial numbers, never native `Date` objects.
- `date_()` / `trackerDueDateKey_()` handle Date objects, Sheets serial
  numbers, *and* string dates — this matters because batch-cached data
  always arrives as raw serial numbers, never `Date` objects.
- `dateKeyOffset_()` / `displayDateKey_()` use plain JS date math, **not**
  `Utilities.formatDate()` — the latter has real per-call bridge overhead
  in Apps Script that becomes a serious bottleneck in loops over large
  sheets (this was the actual root cause of most of the original slowness,
  more than the network round-trips themselves).
- `getOrCreateSheet_()` checks the batch cache for a sheet's header row
  before doing a live header-verification call. If headers genuinely don't
  match, it invalidates only *that one sheet's* cache entry, not the whole
  cache.
- Separately, there's a 20-second full-response cache
  (`readTraineeCache_`/`writeTraineeCache_`,
  `readStudentCache_`/`writeStudentCache_`) via `CacheService` — this
  caches the whole computed JSON payload and is distinct from the
  Sheets-API batch cache, which only lives for the duration of one request.

## Recently built features (for context, not necessarily final)

- PCA exam status (Unscheduled/Scheduled/Pass/Fail), color-coded.
- Peer evaluation removed from both portals' UI (backend functions left
  dormant/unused — harmless, not cleaned up).
- Project groups/definitions/group-project assignments with delete +
  cascading cleanup.
- Instructor portal "Feedback" tab covers two distinct things: **Feedback
  Logs** (student → trainer, view/search/filter/delete) and **Behavior
  Reports** (trainer → trainee, categorized red-flag reporting with
  optional evidence file upload, scoped to the active class filter).
- "Manage class sessions" and weekly-resource scheduling are merged into
  one form — resources auto-derive their week/course from the session
  being created; no separate week/course picker. Supports a "Both" (AM+PM)
  checkpoint option that creates two linked session records
  (`<id>-AM` / `<id>-PM`). The combined "Sessions & resources" list groups
  everything by week, with each session showing its own nested resources,
  plus multi-select bulk delete for both sessions and resources (a real
  hard-delete, distinct from the existing soft-delete "Archive").
- Instructor portal now uses a left sidebar nav (icons via Lucide,
  mirroring the student portal's layout) instead of a horizontal tab bar —
  purely visual; `switchTeacherView()` JS logic is unchanged.

## Working style / preferences

- Prefer full working files over partial diffs when the file size allows.
- Validate `Code.gs` syntax with `node --check` on a temp `.js` copy before
  considering a change done (Apps Script has no local linter).
- Validate `teacher.html`'s embedded `<script>` block by extracting it
  (regex) and running `node --check` on the extracted JS.
- Wants the *why*, not just the *what* — explain reasoning, not just
  instructions.
- Prefers rolling back over live-patching when something breaks in
  production.
- Restate the deployment steps whenever something changes:
  1. `Code.gs`: Apps Script editor → pencil icon on the existing Web App
     deployment → New version → Deploy. Confirm Deployment ID still
     matches `GAS_URL`. (Or, once `clasp` is set up: `clasp push` then
     `clasp deploy -i <existing-deployment-id>`.)
  2. Frontend: `firebase deploy --only hosting:production` (sandbox first
     for risky changes).

## Known fragilities

- The Badge Tracker main sheet is a wide, dynamically-columned legacy
  sheet (checkbox-per-badge layout) — any structural change there needs
  care.
- `ensureInstructorsSheet_()` has a one-time seeding migration that could
  in theory double-seed under concurrent execution — extremely low risk,
  documented but not hardened further.
- Weekly Resources, Behavior Reports, and Feedback Logs sheets grow
  indefinitely; there's no archival/pruning strategy beyond manual
  Archive/Delete.
- Several `.xlsx` files sit in the repo root (e.g. "Attendance Database"
  and "Skills boost badge tracker" copies) — these appear to be local
  reference snapshots, not something the running code reads from. Worth
  confirming with Nash before assuming they're safe to ignore or delete.
