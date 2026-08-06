# Student Portal: mobile and desktop layouts

## Files

- `index.html`: detects the client and redirects to the appropriate layout.
- `mobile.html`: phone-oriented version.
- `desktop.html`: desktop/PC-oriented version.
- `app.js`: shared UI and form submission logic.
- `auth.js`: shared Firebase Authentication logic.
- `teacher.html`: class-aware instructor console for schedules, attendance, badges, resources and scores.
- `teacher-auth.js`: Firebase Authentication guard for approved instructors.
- `firebase.json`: Firebase Hosting configuration example.
- `original-index.html`: untouched backup of the supplied file; excluded from deployment by `firebase.json`.

The student calendar tab contains two independent views:

- **This Week’s Lessons** is fixed to the current Monday–Sunday and shows each lesson title and description.
- **Monthly Delivery Calendar** can move between months and shows only whether scheduled lessons are **Virtual** or **Face to face**.

## Automatic selection

`index.html` uses the following signals:

1. Manual URL override: `?view=mobile`, `?view=desktop`, or `?view=pc`.
2. `navigator.userAgentData.mobile` when supported.
3. A viewport narrower than 768px combined with a coarse pointer.

Examples:

- `https://YOUR-SITE.web.app/?view=mobile`
- `https://YOUR-SITE.web.app/?view=desktop`

## Deploy

Place these files in the Firebase Hosting public directory. If this folder itself is your Hosting directory, run:

```bash
firebase deploy --only hosting
```

If your project already uses a `public` folder, copy the full contents of this directory so the instructor page and shared configuration stay in sync.

## Security note

Firebase web configuration values are public client configuration. However, `company_cloud_tracker_2026` is also visible to every visitor and must not be treated as a secret. For real access control, send the Firebase ID token to the backend and verify it there before processing requests.
