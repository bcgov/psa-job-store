# api

## 0.1.1

### Patch Changes

- [#490](https://github.com/bcgov/psa-job-store/pull/490) [`c1e5770a3ca11ce92bcedc7f9d8a5b9f60b8a0d8`](https://github.com/bcgov/psa-job-store/commit/c1e5770a3ca11ce92bcedc7f9d8a5b9f60b8a0d8) Thanks [@kmandryk](https://github.com/kmandryk)! - add updated_by and published_by fields

- [#473](https://github.com/bcgov/psa-job-store/pull/473) [`5f742a9ef90e80d3f52c7fc346bc9f9e2f713aa7`](https://github.com/bcgov/psa-job-store/commit/5f742a9ef90e80d3f52c7fc346bc9f9e2f713aa7) Thanks [@kmandryk](https://github.com/kmandryk)! - AL-263 add ellipses menu actions for total comp view
  AL-253 Total Comp - display grade in report-to box to disambiguate entries

- [#494](https://github.com/bcgov/psa-job-store/pull/494) [`8e58c75e0a8753f53b3dea6a99e51e0b90a08e66`](https://github.com/bcgov/psa-job-store/commit/8e58c75e0a8753f53b3dea6a99e51e0b90a08e66) Thanks [@alex-struk](https://github.com/alex-struk)! - AL-669 Create a migration for db cleanup
  AL-727 Total comp unable to delete draft profiles

## 0.1.0

### Minor Changes

- [#98](https://github.com/bcgov/psa-job-store/pull/98) [`4fe3611329a2b4f6d2ca835adc59fc87d1966e7d`](https://github.com/bcgov/psa-job-store/commit/4fe3611329a2b4f6d2ca835adc59fc87d1966e7d) Thanks [@sidmclaughlin](https://github.com/sidmclaughlin)! - Implement BI endpoints.

- [#183](https://github.com/bcgov/psa-job-store/pull/183) [`75f0490c0a16dc1899c5931683d15c2732a34318`](https://github.com/bcgov/psa-job-store/commit/75f0490c0a16dc1899c5931683d15c2732a34318) Thanks [@alex-struk](https://github.com/alex-struk)! - Additional information form for HM views
  Added nursing employee group

- [#433](https://github.com/bcgov/psa-job-store/pull/433) [`3dbe033c67d20cf5f07e5b5ed113fd526765e854`](https://github.com/bcgov/psa-job-store/commit/3dbe033c67d20cf5f07e5b5ed113fd526765e854) Thanks [@sidmclaughlin](https://github.com/sidmclaughlin)! - Add CRM lookupName to ease referencing data in different systems.

- [#78](https://github.com/bcgov/psa-job-store/pull/78) [`ba47c0215b7c8e1f837b0d3cc55f985f5a39359f`](https://github.com/bcgov/psa-job-store/commit/ba47c0215b7c8e1f837b0d3cc55f985f5a39359f) Thanks [@sidmclaughlin](https://github.com/sidmclaughlin)! - Implement improved search

- [#225](https://github.com/bcgov/psa-job-store/pull/225) [`2cb29c5fc409a7139bf7f388e526d81fe16cb892`](https://github.com/bcgov/psa-job-store/commit/2cb29c5fc409a7139bf7f388e526d81fe16cb892) Thanks [@alex-struk](https://github.com/alex-struk)! - HM view improvements

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

- [#121](https://github.com/bcgov/psa-job-store/pull/121) [`b29d14fa0493a565aba0f63b7611a0176f6dcfd0`](https://github.com/bcgov/psa-job-store/commit/b29d14fa0493a565aba0f63b7611a0176f6dcfd0) Thanks [@sidmclaughlin](https://github.com/sidmclaughlin)! - Add endpoint to get single position

- [#237](https://github.com/bcgov/psa-job-store/pull/237) [`2f25da4695016783d466cfa564dd3c3e6e9ec065`](https://github.com/bcgov/psa-job-store/commit/2f25da4695016783d466cfa564dd3c3e6e9ec065) Thanks [@alex-struk](https://github.com/alex-struk)! - API Integrations

  - position request creation now accounts for different classification unions

  HM View Improvements

  - Can now search for departments by department ID on the org chart views
  - Redesigned behavioural competencies picker to be easier to select competencies from
  - All wizard steps are now aligned to Figma designs
  - Improved performance on the edit form

  Other

  - Improved docx generation

- [#31](https://github.com/bcgov/psa-job-store/pull/31) [`6191785aa0836e096b8df7b3f744338f33b87d0b`](https://github.com/bcgov/psa-job-store/commit/6191785aa0836e096b8df7b3f744338f33b87d0b) Thanks [@sidmclaughlin](https://github.com/sidmclaughlin)! - Add initial filters

- [#21](https://github.com/bcgov/psa-job-store/pull/21) [`f58a30fcb325cdb58a98d81132b61bdcc9e0f391`](https://github.com/bcgov/psa-job-store/commit/f58a30fcb325cdb58a98d81132b61bdcc9e0f391) Thanks [@sidmclaughlin](https://github.com/sidmclaughlin)! - Implement basic Job Profile search

### Patch Changes

- [#416](https://github.com/bcgov/psa-job-store/pull/416) [`ed596d8ec18262f45c5d307ba7615163353d830d`](https://github.com/bcgov/psa-job-store/commit/ed596d8ec18262f45c5d307ba7615163353d830d) Thanks [@sidmclaughlin](https://github.com/sidmclaughlin)! - [AL-642] Filter out deleted and frozen positions when requesting an org chart

- [#457](https://github.com/bcgov/psa-job-store/pull/457) [`011d412bb86c1545d4963b84122229bf06d88ba3`](https://github.com/bcgov/psa-job-store/commit/011d412bb86c1545d4963b84122229bf06d88ba3) Thanks [@alex-struk](https://github.com/alex-struk)! - AL-683 Deactivate field level validations
  AL-685 Navigating to the review step from the edit step removed a section which was initially listed as a significant change
  AL-709 Logout does not function properly due to UUID/GUID mismatch
  AL-710 Clicking on a saved profile navigates user to ‘Explore job profiles'
  AL-670 Submitted job profile doesn't save all values from the original profile
  AL-708 Take a snapshot of the existing JP when submitting for review
  AL-275 Total Comp - implement missing info on position details page
  AL-715 Order job profiles alphabetically

- [#453](https://github.com/bcgov/psa-job-store/pull/453) [`fefb211dd1d3177007e2b2d81465bab65da2c9f2`](https://github.com/bcgov/psa-job-store/commit/fefb211dd1d3177007e2b2d81465bab65da2c9f2) Thanks [@alex-struk](https://github.com/alex-struk)! - AL-695 Can't undo changes on non-significant education fields on HM
  AL-673 Total comp validation triggers before data loads
