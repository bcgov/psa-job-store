# BC Public Service Agency (PSA) Job Store

## Running end-to-end tests

First, ensure that `SKIP_JWT_SIGNATURE_VERIFICATION=true` is set in your `apps/api/.env` file. This disables verification
step for the JWT token and enables passing of a mock token for authentication.

Run `npm -w app run test-e2e`

## Running component tests

Run `npx -w app jest`

_Note:_ If you receive a `EBUSY: resource busy or locked, open..` error, run with a --no-cache flag

To genereate coverage report, run with `--coverage` flag

Project is also configured to generate reports with `jest-html-reporter`, which outputs test results to `app/test-report.html`
