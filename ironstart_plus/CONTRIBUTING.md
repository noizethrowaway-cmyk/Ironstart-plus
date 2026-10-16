# Contributing

Thanks for helping improve IronStart.

## Exercise-library changes

1. Fork the repository and create a branch.
2. Edit `exercise-library.json`.
3. Preserve stable `id` values for existing exercises; add a new unique ID for new exercises.
4. Keep `category` as `compound` or `isolation`, use kilograms for `startKg` and `incrementKg`, and keep `repMin <= repMax`.
5. Use short, actionable technique descriptions. Avoid claims that an exercise is appropriate for every user.
6. Validate JSON before submitting. A quick check is `python -m json.tool exercise-library.json`.
7. Open a pull request explaining what changed and why.

The PWA loads `exercise-library.json` at runtime. Existing exercise IDs can be edited directly; adding a new exercise to a default workout also requires adding its ID to the relevant template in `app.js`. No build step is required for the static client.

## App changes

Keep offline behavior intact: avoid runtime dependencies from CDNs, maintain the service worker's precache list when adding required static assets, and verify JSON export/import if changing saved data structures.
