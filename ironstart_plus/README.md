# IronStart — Android-first strength workout PWA

IronStart is a local-first Progressive Web App (PWA) for strength training. It supports a custom hybrid, a Starting Strength-inspired 3×5 rotation, a StrongLifts-style 5×5 rotation, and 3/4/6-session Push/Pull/Legs rotations. Workout logs remain on the device unless you export them or explicitly back them up to a private GitHub Gist.

## Included features

- Mobile-first touch interface with bottom navigation and safe-area padding.
- Installable PWA manifest, Android icons, offline service worker, and cache revalidation.
- Exercise library in `exercise-library.json`, designed to be edited and contributed to independently.
- Alternating A/B strength routines and session-based PPL rotations. Recording a rest day does not advance the workout rotation.
- Automatic per-lift load progression; a 10% deload after three consecutive failed exposures to a strength lift.
- PPL double progression across rep ranges; after every set reaches the top of the range, the next load increases and target reps reset to the range minimum.
- Previous-session overlay with logged load/reps and approximate Epley estimated 1RM.
- One-tap set completion, rep steppers, quick load steppers, rest countdown, audio/haptic cues, optional notification, and optional exercise supersets.
- Plate calculator for kg or lb plate sets and configurable bar weight / fractional plates.
- Client-side SVG volume, muscle-group and estimated-strength charts, plus plateau/deload insights.
- Full JSON export/import and optional private-Gist upload/restore, including opt-in auto-backup after saved workouts while the token remains in the open tab. The GitHub token is held only in page memory and is never added to the app's local saved settings.
- GitHub Actions deployment workflow for GitHub Pages.

## Deploy to GitHub Pages (recommended)

1. Create a GitHub repository (for example, `ironstart`).
2. Upload the **contents** of this project to the repository root. `index.html`, `app.js`, `styles.css`, `manifest.webmanifest`, `sw.js`, `exercise-library.json`, and `icons/` must be at the root level. Keep `.github/workflows/pages.yml` too.
3. In the repo, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. Do not choose `Deploy from a branch` when using the included workflow.
4. Commit/push to the `main` branch. Open the repo's **Actions** tab and wait for “Deploy IronStart to GitHub Pages” to complete.
5. Visit `https://YOUR-USERNAME.github.io/ironstart/` (replace `YOUR-USERNAME` and repository name as appropriate). Open the URL in Chrome on Android and choose **Install app** or **Add to Home screen** from the browser menu.

Subsequent pushes to `main` deploy automatically. The app is static; there is no server/database to pay for. GitHub Pages requires HTTPS for PWA installation and service worker access.

## Test locally

Service workers generally require `localhost` or HTTPS. From the project root, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. To test Android installation, deploy over HTTPS first.

## Workout programme definitions

- **Custom hybrid (default):** A = squat 3×5, bench 5×5, deadlift 1×5; B = squat 3×5, overhead press 5×5, row 5×5.
- **Starting Strength-inspired:** A = squat 3×5, overhead press 3×5, deadlift 1×5; B = squat 3×5, bench 3×5, row 3×5. This is an adaptation, not an exact official Starting Strength template.
- **StrongLifts-style:** A = squat 5×5, bench 5×5, row 5×5; B = squat 5×5, overhead press 5×5, deadlift 1×5. This is a simplified style-compatible template, not a reproduction of any proprietary app.
- **PPL:** three sessions = Push/Pull/Legs; four = Push/Pull/Legs/Upper; six = Push/Pull/Legs repeated twice. It follows completed workouts rather than strict weekdays.

Strength exercises progress only when all target reps are logged as completed. Any set below target counts as a failed exposure; three consecutive failed exposures on a lift trigger an approximately 10% load reduction. PPL accessories use double progression: target reps rise within the range and working load increases when every set reaches the top of the range. Adjust the plan sensibly and stop a movement if it causes sharp pain.

## Customising the exercise library

Edit `exercise-library.json` in GitHub. Each exercise contains an `id`, `name`, `muscles`, `category`, `equipment`, `instruction`, `startKg`, `incrementKg`, `sets`, `repMin`, `repMax`, and `restSeconds`. Keep `id` values stable so saved data remains associated with the same exercise. Commit a change and reload the PWA while online; the service worker revalidates cached resources in the background.

To propose a library improvement, fork the repo, edit the JSON, validate it (valid JSON, unique IDs), and open a pull request.

## Backup and privacy

- Data uses browser `localStorage`; no account or remote database is required. Clearing browser site data or losing the phone can erase local logs, so export backups regularly.
- JSON export/import works offline and includes workout history, loads, failure counters, settings, and any active workout.
- Optional GitHub Gist backup talks directly to `api.github.com` from your browser. Use a token with only Gists permission. The token is not saved in IronStart, but it is necessarily sent to GitHub for authentication. Your backup Gist is created as private. The Gist ID is saved locally; keep the token private and revoke it when no longer needed.
- Data is not uploaded unless the user presses a Gist backup action or explicitly enables auto-backup. Auto-backup works only while the token remains in the current open tab; re-enter the token after a reload or browser restart.

## Technical note

This edition intentionally uses vanilla JavaScript and CSS without runtime/CDN dependencies instead of React/Svelte + Tailwind. This keeps the published files self-contained, fast to start, and usable in a basement gym without a network connection or a separate build dependency. It is a static PWA, not an APK; installation is managed by Chrome/Android.

## Safety note

The routine is a configurable training template, not personal medical advice. Start with loads you can control, get technique checked if new to lifting, use a spotter or correctly set safeties for benching, and seek qualified coaching for pain or persistent stalls. Estimated 1RM and volume charts are rough training indicators, not medical or performance guarantees.
