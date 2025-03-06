# 🌟 BC Public Service Agency (PSA) Job Store 🌟

![JobStore Screenshot](/screenshot.PNG?raw=true)

## Introduction

Welcome to the BC Public Service Agency's Job Store, a comprehensive platform designed to streamline position management and organizational structure visualization across the BC Public Service. This enterprise-grade application integrates seamlessly with PeopleSoft HCM and Oracle CRM systems to provide a unified workflow for position creation, classification, and management.

### What is Job Store?

Job Store is a modern web application that addresses the challenges of position management in large government organizations. It provides an intuitive interface for navigating organizational hierarchies, creating positions, and managing job profiles—all while maintaining synchronization with core HR systems.

### Core Capabilities

- **Organizational Visualization**: Interactive org charts that provide a clear view of reporting relationships and position hierarchies
- **Position Management**: End-to-end workflow for creating, modifying, and tracking position requests
- **Job Profile Library**: Centralized repository of standardized job profiles with search capabilities
- **Classification Process**: Streamlined workflow for position classification requests and approvals
- **System Integration**: Bidirectional synchronization with PeopleSoft HCM and Oracle CRM

### Technical Foundation

Built on a modern technology stack, Job Store leverages:

- **Frontend**: React with TypeScript, Redux Toolkit, and Ant Design
- **Backend**: NestJS with GraphQL, Prisma ORM, and Elasticsearch
- **Authentication**: Keycloak integration with IDIR/BCeID via SiteMinder
- **Infrastructure**: Containerized deployment on OpenShift with PostgreSQL database
- **DevOps**: CI/CD pipelines with automated testing and deployment

### Who Uses Job Store?

- **Hiring Managers**: Create position requests and track their progress
- **Classification Specialists**: Review and process classification requests
- **Total Compensation**: Creates and updates job profiles

## Project Structure

### Architecture

This architecture integrates authentication, frontend and backend services, and PeopleSoft and CRM external systems. Users authenticate via SiteMinder and Keycloak using Active Directory credentials (IDIR/BCeID). The frontend, built with React, communicates with a NestJS backend hosted in Docker containers on the SILVER OpenShift cluster, with PostgreSQL managing the database schema. The backend interacts with Oracle CRM endpoints to create, retrieve, and update incidents via REST APIs and connects to PSA PeopleSoft APIs for data retrieval and updates using an Integration Broker and Component Interfaces. For detailed interactions, refer to the [architecture diagram](/docs/architecture/readme.md).

### Applications

Turborepo monorepo architecture using npm workspaces:
Apps Directory - Contains standalone applications:

- api - The NestJS backend API [Read more](/apps/api/README.md)
- app - The frontend application [Read more](/apps/app/README.md)
- jobstore-cypress - End-to-end testing with Cypress [Read more](/apps/jobstore-cypress/README.md)
- report-mailer - a utility for sending reports. [Read more](/apps/report-mailer/README.md)
- css-migration-util - a utility for keycloak migrations [Read more](/apps/css-migration-util/README.md)

### Shared Code (common-kit)

- Custom shared library package for cross-application functionality
- Built with Vite and TypeScript
- Used for organizatonal chart generation as well as docx generation for job profiles

[Read more](/packages/common-kit/README.md)

### Database

- PostgreSQL with Prisma as the ORM
- PGLite for in-memory database during testing

### Testing

- Jest for unit testing
- Cypress v13.x for end-to-end testing
- Cucumber for behavior-driven testing (via cypress-cucumber-preprocessor)

### Development Tooling

- TypeScript v5.x across all packages
- ESLint and Prettier for code formatting and linting
- Husky for Git hooks [Read more about Husky scripts](#husky-scripts)
- Changesets for versioning and changelog management
- Cross-env for environment variable management across platforms
- SWC for fast TypeScript compilation (for running tests only)
- Vite for frontend bundling and development server

### Utilities

- UUID for unique identifier generation
- Day.js for date manipulation
- CSV parsing with csvtojson
- Diff utilities (deep-object-diff, diff-match-patch)

### DevOps

The project uses GitHub Actions workflows and custom actions for automating the CI/CD processes of the application. The workflows handle tasks such as building Docker images, running tests, performing database migrations, deploying to OpenShift environments, and managing database backups and restores. See [.github/ACTIONS_README.md](/.github/ACTIONS_README.md) for more details.

### Deployments

The project is deployed on OpenShift using templates and Kustomize. For more information, see [deployments/README.md](/deployments/README.md) and [deployments/DEVELOPER.md](/deployments/DEVELOPER.md)

## Running the project

### Requirements

- node >=20.11.1 <21.0.0

### Installation

First, clone the repository:

`git clone https://github.com/bcgov/psa-job-store.git`

Install dependencies:

`npm i`

Copy and rename `/sample.env` to `.env` and configure the variables

Start elastic search and postgres containers:

`docker compose up -d`

Build common-kit:

`npm -w common-kit run build`

Setup the database and seed it with test data:

`npx -w api npm run migrate:reset:e2e-test`

("Failed to create group: NUR" warning is normal)

Copy and rename `/apps/app/sample.env` to `.env` and configure the environment.

Copy and rename `/apps/api/sample.env` to `.env` and configure the environment.

To see details about the meaning of various variables, see [DEVELOPER.md](deployments/DEVELOPER.md)

Start API project:

`npm -w api run start:dev`

Start the web project:

`npm -w app run dev`

Visit [http://localhost:5173/](http://localhost:5173/) to see the application!

## Running end-to-end tests locally

First, ensure that `USE_MOCKS=true` and `E2E_TESTING=true` are set in your `apps/api/.env` file. Copy and rename `sample.env` to `.env` in `/apps/jobstore-cypress`. Ensure `VITE_E2E_AUTH_KEY` flag in that `.env` matches `E2E_AUTH_KEY` variable in `apps/api/.env`

See the [API documentation](/apps/api/README.md#e2e-testing-configuration) for more details on E2E testing configuration.

Ensure that database has been reset to defaults with the seed data:

`npx -w api npm run migrate:reset:e2e-test`

("Failed to create group: NUR" error is normal)

Run `npx -w jobstore-cypress cypress open`. It's recommended to use Edge browser to run e2e tests.

To run in same environment as GitHub actions:

`npx -w jobstore-cypress cypress run --browser edge --headless`

This will run all test without any Cypress user interface.

Note that tests need to be run in alphabetical order and the database would need to be reset between runs as there is some dependence between tests, such as front page checking for the number of position requests and some later tests creating position requests, altering that count.

### E2E tests in GitHub actions

The `e2e.yml` GitHub Action is designed to run end-to-end (E2E) tests for after database migrations and deployments have been completed. The workflow initiated automatically by the "Migrate DB Schema" workflow.

#### Main Jobs

1. **Wait for Deployment**
2. **E2E Tests**
3. **Cleanup E2E**

### How It Works

1. **Deployment Verification**: Checks if the deployment is ready by verifying the versions of the API and APP match the provided SHA.
2. **Database Preparation**: Dumps the database schema for use in tests.
3. **Environment Setup**: Configures the deployment on OpenShift to run in E2E mode (in-memory database, use mocks and loads db schema from the dump)
4. **Dependency Management**: Caches Node modules and Cypress binary to optimize workflow speed.
5. **Test Execution**: Runs Cypress tests in headless mode using the Edge browser.
6. **Artifact Handling**: Uploads screenshots and videos if tests fail.
7. **Cleanup**: Removes E2E environment settings after test completion.

### Mock services

For information about mock services, see the [API documentation](/apps/api/README.md#mock-services).

## Running Unit Tests locally

To run app tests:

`npx -w app jest`

To run api tests:

`npx -w api jest`

To run common-kit tests:

`npx -w common-kit jest`

_Note:_ If you receive a `EBUSY: resource busy or locked, open..` error, run with a --no-cache flag

To genereate coverage report, run with `--coverage` flag

### Unit tests in GitHub actions

Unit tests also run automatically on GitHub actions any time there is a commit to the `test` branch

## Logging System

The PSA Job Store implements a comprehensive logging system that captures both backend API logs and frontend application errors. This system helps with debugging, monitoring, and troubleshooting issues in production and development environments.

### API Logging

The backend API uses a structured logging approach based on the following components:

#### Logger Configuration

- **Pino Logger**: The API uses [Pino](https://getpino.io/) as the primary logging library, configured through the `nestjs-pino` module.
- **Request ID Tracking**: Each request is assigned a unique ID for tracing through the system.
- **User Context**: Logs include user information when available, helping to trace actions to specific users.

#### Log Storage

- **Console Output**: In development, logs are formatted with `pino-pretty` for readability.
- **File Storage**: In production, logs are stored in `/tmp/log/api.log` for persistence.
- **Log Rotation**: The system handles log rotation to prevent excessive file sizes.

#### GraphQL Error Logging

- **Apollo Plugin**: A custom Apollo Server plugin captures and logs GraphQL errors.
- **Error Formatting**: GraphQL errors are formatted before being returned to clients, with sensitive information, such as stack trace removed in production (see `graphql-error.formatter.ts` file).

#### Service-Level Logging

- **Global Logger**: Services can use the `globalLogger` for consistent logging across the application. This is used to keep track of sensitive changes in the application, such as user role changes, position request status changes, etc.

### Frontend Error Logging

The frontend application implements error logging that sends errors to the backend:

#### Error Capture Mechanisms

- **Error Boundary**: React Error Boundary components capture component errors and prevent the entire application from crashing. Any time users are presented with a front end error, that error gets submitted to the server.

#### Error Logging Service

- **`sendLogToServer` Function**: Captures error details including message, stack trace, timestamp, and URL path.
- **REST Endpoint**: Errors are sent to the `/logs/log` endpoint on the backend API.

#### Backend Storage

- **App Log Service**: The backend stores frontend errors in a dedicated log file (`/tmp/log/app.log`).
- **Error Context**: Logs include user ID and path information for better context.

### Log Analysis

- **Structured Format**: All logs are in JSON format for easy parsing and analysis.
- **Correlation**: Request IDs and user IDs help correlate related log entries.
- **Environment Variables**: Logging behavior can be controlled through environment variables:
  - `NODE_ENV`: Controls log level and formatting
  - `SKIP_LOGGING`: Can disable file logging when set to 'true'

### Note

- **GraphQL Query Redaction**: Large binary data in GraphQL queries (like PNG images) is redacted with `[REDACTED]`.

## Husky Scripts

This repository uses [Husky](https://typicode.github.io/husky/#/) to manage Git hooks, ensuring code quality and security before commits and pushes. The following scripts are included:

## 1. `pre-commit`

The `pre-commit` script is executed before a commit is finalized. Its main functions are:

- **Branch Protection**: It checks if the current branch is one of the protected branches (`main`, `stage`, or `develop`). If so, it prevents direct commits to these branches, prompting the user to create a feature branch instead.
- **Secret and Environment Variable Check**: It runs the `check_secrets.sh` script to scan for any secrets or sensitive environment variables in the staged files. If any are found, the commit is aborted, and the user is notified to remove or secure them.

- **Linting**: If the checks pass, it runs `lint-staged` to ensure that only staged files are linted according to the project's linting rules.

## 2. `pre-push`

The `pre-push` script is executed before pushing changes to a remote repository. Its main function is:

- **Branch Protection**: Similar to the `pre-commit` script, it checks if the current branch is one of the protected branches. If so, it prevents the push and instructs the user to push their feature branch and create a Pull Request instead.

## 3. `check_secrets.sh`

This script is responsible for scanning staged files for potential secrets and sensitive environment variables. Its main features include:

- **Regex Pattern for Secrets**: It defines a regex pattern to identify potential secrets in the code.

- **Whitelisting**: It maintains a list of environment variables that are allowed and skips checking for them.

- **Skipping Folders**: It specifies folders to skip during the check, such as `.git`, `.husky`, and `node_modules`.

- **Environment Variable Extraction**: It extracts environment variable values from `.env` files located in the `apps/app` and `apps/api` directories to check for their presence in code.

- **Secret Detection**: It processes each staged file, checking for secrets and environment variables used as literals. If any are found, it reports them and exits with an error code.

## To generate new changeset entry

When completing a feature, run

`npx changeset`

in the project root and follow the prompts. This info is going to be automatically included in change log.

## To publish a hotfix to production

Normal publishing follows the pattern of using a feature branch off develop, merging it into develop, then merging develop into stage, and finally stage into main. However sometimes it is necessary to publish a hotfix into production while holding off the publishing of code on dev/stage branches. For this:

- Make a hotfix branch off main and implement your hotfix
- Create pull request from hotfix into develop to test it on develop
- Create pull request from develop to stage to test on stage
- If looks good, create a pull request from hotfix to main

If there's a conflict because develop is ahead of main:

- Create a branch off develop
- Merge hotfix into this branch and resolve conflicts
- Make a pull request from this branch into develop

## Making a database backup to a local drive

Login to psql pod:
`oc exec -it  SQL_POD_NAME -- /bin/bash`
`cd /pgdata`

To get db info:

`psql`
`\l`

Create dump:
`pg_dump -U USER_NAME DB_NAME > backup.sql`

Exit pod and copy file:
`oc cp --retries=-1 SQL_POD_NAME:pgdata/backup.sql ~/backup.sql`

Remove remote backup file:

`oc exec SQL_POD_NAME -- rm pgdata/backup.sql`

## To replicate production database to dev/test environment or locally

Make a backup of production as above first.

### To load data to dev/test environment on OpenShift

Upload backup file to dev/test sql pod:

`oc cp ~/profiles.sql SQL_POD_NAME:/pgdata`

Login to sql, and clear all data:

`psql -d api -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"`

Import production data:

`psql -U postgres -d api -f backup.sql`

Apply any migrations that are not present in backup:
`npx -w api prisma migrate deploy`

## To load data into local environment

In docker terminal for the db, delete all records:

`psql -d api -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" -h localhost -p 5432 -U admin`

Copy backup dump into the container:

`docker cp backup.sql api-postgres-1:/home/backup.sql`

Load data from backup:

`psql -U postgres -d api -f /home/backup.sql -h localhost -p 5432 -U admin`

Apply any migrations that are not present in backup:
`npx -w api prisma migrate deploy`

## Upgrading psql on CrunchyDB

Modify pgupgrade to include your desired upgrade then run:

`oc apply -f base\crunchy\pgupgrade.yml`

annotate cluster to enable the upgrade to proceed:

`oc annotate postgrescluster api-postgres-clone postgres-operator.crunchydata.com/allow-upgrade="api-postgres-clone-upgrade"`

Shutdown the cluster with the flag in `postgrescluster.yml`:

```
spec:
  shutdown: true
```

`oc apply -k overlays/crunchy/test`

Monitor for upgrade:

`oc describe pgupgrade.postgres-operator.crunchydata.com/api-postgres-clone-upgrade`

Cleanup. Remove the pgupgrade object:

`oc delete -f base\crunchy\pgupgrade.yml`

Remove annotation:

`oc annotate postgrescluster api-postgres-clone postgres-operator.crunchydata.com/allow-upgrade-`

## Running load test

Install K6, then in `apps\api\test`, run (PowerShell):

`$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="report.html"; $env:SCENARIO="api"; $env:SECRET_KEY="INSERT_E2E_AUTH_KEY_HERE"; $env:TARGET="http://localhost:4000"; k6 run load-test.js`

To load test the frontend:

`$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="report.html"; $env:SCENARIO="frontend"; $env:SECRET_KEY="INSERT_E2E_AUTH_KEY_HERE"; $env:TARGET="http://localhost:5173"; k6 run load-test.js`

You can view live results at `http://localhost:5665/`. After the test is finished, a report will be generated to `report.html` in the same folder

## Special mode for video recordings

This was a setup on dev to allow recording of videos. It uses mock data in combination with custom seed data.

Set `DATABASE_URL` to blank by setting this in the api deployment:

```
name: api
          env:
            - name: DATABASE_URL
          ports:
            - containerPort: 4000
```

In secrets, set:

`E2E_TESTING` to `true`
`USE_MOCKS` to `true`

Load js files containing extra seed data to `api-POD:/tmp/log`. Follow script like below. Note you may need to manually adjust the data if you get errors:

```
// In db pod on prod:

COPY (
SELECT json_agg(row_to_json(t))::text
FROM job_profile t
) TO '/pgdata/other-profiles.json';

COPY (
SELECT json_agg(row_to_json(t))::text
FROM job_profile_classification t
) TO '/pgdata/job_profiles_classification.json';


COPY (
SELECT json_agg(row_to_json(t))::text
FROM job_profile_job_family_link t
) TO '/pgdata/job_profile_job_family_link.json';

COPY (
SELECT json_agg(row_to_json(t))::text
FROM job_profile_stream_link t
) TO '/pgdata/job_profile_stream_link.json';


COPY (
SELECT json_agg(row_to_json(t))::text
FROM job_profile_behavioural_competency t
) TO '/pgdata/job_profile_behavioural_competency.json';

COPY (
SELECT json_agg(row_to_json(t))::text
FROM job_profile_reports_to t
) TO '/pgdata/job_profile_reports_to.json';

COPY (
SELECT json_agg(row_to_json(t))::text
FROM classification t
) TO '/pgdata/classifications.json';


COPY (
SELECT json_agg(row_to_json(t))::text
FROM job_profile_organization t
) TO '/pgdata/job_profile_organization.json';

COPY (
SELECT json_agg(row_to_json(t))::text
FROM organization t
) TO '/pgdata/organization.json';


COPY (
SELECT json_agg(row_to_json(t))::text
FROM job_profile_organization t
) TO '/pgdata/job_profile_organization.json';

// pull dump files to local space
oc cp --retries=-1 db_pod:pgdata/other-profiles.json ~/other-profiles.json
oc cp --retries=-1 db_pod:pgdata/job_profiles_classification.json ~/job_profiles_classification.json
oc cp --retries=-1 db_pod:pgdata/job_profile_job_family_link.json ~/job_profile_job_family_link.json
oc cp --retries=-1 db_pod:pgdata/job_profile_stream_link.json ~/job_profile_stream_link.json
oc cp --retries=-1 db_pod:pgdata/job_profile_reports_to.json ~/job_profile_reports_to.json
oc cp --retries=-1 db_pod:pgdata/classifications.json ~/classifications.json
oc cp --retries=-1 db_pod:pgdata/job_profile_organization.json ~/job_profile_organization.json
oc cp --retries=-1 db_pod:pgdata/organization.json ~/organization.json

// Generate ts files with this format using json data from before:
// export const otherProfileClassifications = [{"classification_id":"5..}]

// build ts files

tsc other-profiles.ts
tsc other-job-profile-classifications.ts
tsc other-job-profile-family-link.ts
tsc other-job-profile-stream-link.ts
tsc job-profile-reports-to.ts
tsc other-classifications.ts
tsc job_profile_organization.ts
tsc organization.ts

// upload to api pod

oc cp ~/job-profile-reports-to.js api-POD:/tmp/log
oc cp ~/other-classifications.js api-POD:/tmp/log
oc cp ~/other-job-profile-classifications.js api-POD:/tmp/log
oc cp ~/other-job-profile-family-link.js api-POD:/tmp/log
oc cp ~/other-job-profile-stream-link.js api-POD:/tmp/log
oc cp ~/other-profiles.js api-POD:/tmp/log
oc cp ~/organization.js api-POD:/tmp/log
oc cp ~/job_profile_organization.js api-POD:/tmp/log
```

## Miscellaneous and troubleshooting

### To accelerate new image uptake on openshift after publishing

NOTE: these changes have been integrated into the pipeline and now happen automatically on every publish

Openshift may take up to 15 minutes to pick a new image from artifactory. There is no way to change this frequency. If needed, as a workaround
perform these operations to get openshift to pick up the image from artifactory faster:

`oc project xxxx-tools`

`oc delete -k deployments/openshift/kustomize/images/image-streams/`

`oc apply -k deployments/openshift/kustomize/images/image-streams/`

### Recursive relationships in schema.prisma

To avoid maximum call stack depth for cases where there is recursive relationship in schema.prisma, cast the input object into a type generated by prisma itself instead of prisma-nestjs-graphql, e.g.:

```
async createJobProfile(data: JobProfileCreateInput) {
    return this.prisma.jobProfile.create({
      data: {
        ...
      } as any as Prisma.JobProfileCreateInput,
    });
  }
```

Without this, you may encounter errors of this type:

```
error TS2322: Type 'JobProfileCreateNestedManyWithoutParentInput' is not assignable to type 'JobProfileUncheckedCreateNestedManyWithoutParentInput | JobProfileCreateNestedManyWithoutParentInput'
```

### To retreive Artifactory username and password

In the tools namespace:

```
oc get secret/artifacts-default-[random] -o json | jq '.data.username' | tr -d "\"" | base64 -d
oc get secret/artifacts-default-[random] -o json | jq '.data.password' | tr -d "\"" | base64 -d
```

### "Uknown blob" or "manifest invalid" build issue

If you get an "Unknown blob" or "manifest invalid" error message during build process, this is likely caused by artifactory being full. To resolve, delete old images from the artifactory repository to free up space and retry the action.

Login to artifactory at https://artifacts.developer.gov.bc.ca/ui/admin and select the tools-alexandria project. On the left, select Artifactory->Artifacts
to show the list of builds.

Under api and app projects, delete old versions, for example "0.0.0" or "0.1.0" to free up space.

## Husky pre-commit hook issues on windows with GitHub desktop on Windows

If getting this type of error when commiting changes:

```
.husky/pre-commit: line 13: npx: command not found
husky - pre-commit hook exited with code 127 (error)
husky - command not found in PATH=/mingw64/libexec/git-core:/mingw64/bin:/usr/bin...:undefined
``

- Reinstall GitHub desktop
- Check that system PATH variable contains `C:\Program Files\Git\bin` (path containing sh.exe) AND that it's first in the list
```

## Technical debt or pending improvements

### Education verification override for "Administrative Services" Job Family

Profiles that have "Administrative Services" Job Family do not require verification if user makes any changes to the "Education" section when going throught he position request creation wizard. This is hard-coded throughout the application and ideally should be formalized into a formal feature. A similar request was received for a different case, so it may be desirable to implemnt this feature for Total Compensation users (https://citz-do.atlassian.net/browse/AL-1144)

### React code restructuring

Some React modules, such as Total Compensation Job Profile editing forms could be refactored into smaller, more reusable components.

### Automated testing

While the project contains E2E tests as well as unit tests for front end and backend, they are far from being comprehensive and the coverage of them could be improved.

### Accessibility improvements

The job profile view currently uses a tabular approach to displaying the data, which is not accessible to screen readers. To deal with this issue, the tabular view is made invisible to screen readers and an alternative, plain text view is displayed. The issue with this approach is that the page does not focus on relevant elements as user goes through the content, making it more challenging for users who use both the screen reader as well as visual cues. Replace the tabular view with a custom component that has similar visual layout but that can be followed by the screen reader as if it's a plain text document.

### Dependency management and updates

The project uses a variety of dependencies across its monorepo structure. Regular audits and updates of these dependencies should be scheduled to ensure security patches are applied and to take advantage of new features. Consider implementing automated dependency update checks as part of the CI/CD pipeline.

### Type safety improvements

There instances of `any` types in the codebase. Improving type safety by replacing these with proper interfaces or type definitions would enhance code maintainability and reduce potential runtime errors.

### Documentation todo

- verify developer.md deployment info
- package upgrades
- monorepo, linting, tsconfig
- the deployment process to openshift, including seeding hasn't been verified since the application was deployed initially
- accessibility notes: accessible components, need for accessible profile view
