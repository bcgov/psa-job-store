---
'api': minor
'app': minor
---

HM view improvements

- Now showing 10 items per page, hidden page picker
- New fields on profiles (preferences, knowledge skills and abilities, etc.)
- Removed modal prompts warning users changes may cause classification reivew
- Orgchart in the wizard now shows users department by default

- Notifes user about fields that have been changed that trigger review (on the final status screen)
- Transitions to readonly status with complete screen if successfully created position
- Wording changes across the app according to Figma

- Replaced all loading messages with loading indicators
- Fixed date format ('d' means day of the week, "D" means day of month)
- Added status transitions for HM screens
- add positions context menu link to edit/view request, to HM screens
- implement ability to delete position request from context menu
- behavioral competency regression bug fix

- wizard org chart now uses next/back mechanic instead of creating position on org chart directly
- org chart no longer truncates classifications, shows tooltip for long position titles
- popover on orgchart now moves with the org chart when user pans
- org chart now uses proper color scheme
- org chart on wizard expands to remaining screen height instead of fixed height

- Aligned header text to baseline
- Created a component to show person(s) info from position number, showing that info in wizard profile selection step
- Added header menu on profile selection screen with delete and save and close features

HM Views filter options:

- Classifications now shows name instead of code
- Classifications filter now only shows options that are available in profiles on the page
- Added profession/stream tree view filter
- Improved filters responsiveness

DevOps

- update for prod deployment - update infra code and github action for applying database migrations to work with the crunchy db operator.
- switch IS to use main-latest - the build scripts currently overwrite latest regardless of ENV. switch prod to use main-latest for now.
- Change migrate-db action to use sidecar deployment, so its not dependant on a running API pod, which can be finicky in dev/test.
- fix build-apps bug where the paths-filter is always using main branch for comparison

PeopleSoft Integrations

- WIP initial createPosition
- add REPORTS_TO to createPositionForPositionRequest
- move sync code to module to ensure it only runs once
- add logging to sync methods

Other

- refactor document generation code
