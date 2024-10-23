# 🌟 BC Public Service Agency (PSA) Job Store βeta 🌟

![JobStore Beta Screenshot](/screenshot.PNG?raw=true)

Welcome to the BC Public Service Agency's Job Store βeta, the all-in-one solution for navigating and managing your organization chart with ease and efficiency. This tool is designed to streamline the way you view, edit, and create positions within your organization, all while integrating seamlessly with PeopleSoft and CRM systems.

## Features

### 🗺️ Navigate Your Org Chart

- Effortlessly explore your organizational structure with our intuitive navigation system.
- Visualize the hierarchy and relationships within your organization at a glance.

### 📈 Create & Edit Positions Instantly

- Create New Positions: Add new roles to your organization in real-time, customizing as per your needs or using provided job profiles.

### 📚 Library of Job Profiles

- Access a comprehensive library of predefined job profiles.
- Find the perfect match for your organizational needs with ease.

### ✏️ In-Situ Job Profile Editing

- Directly edit job profiles within the platform.
- Make quick updates and revisions without leaving the app.

### 📨 Classification Review Requests

- Submit position requests for classification review.
- Ensure compliance and accuracy in role classifications.

### 🔄 Integration with PeopleSoft and CRM

- Create positions in PeopleSoft
- Keep track of position requests in CRM and view status changes inside JobStore

## Get Started

## Running the project

### Requirements

- node >=20.11.1 <21.0.0

### Installation

First, clone the repository:

`git clone https://github.com/bcgov/psa-job-store.git`

Install dependencies:

`npm i`

Rename `/sample.env` to `.env` and configure the variables

Start elastic search and postgres containers:

`docker compose up`

Build common-kit:

`npm -w common-kit run build`

Setup the database and seed it with test data:

`npx -w api npm run migrate:reset:e2e-test`

Rename `/apps/app/sample.env` to `.env` and configure the environment.

Start API project:

`npm -w api run start:dev`

Start the web project:

`npm -w app run dev`

Visit [http://localhost:5173/](http://localhost:5173/) to see the application!

## Running end-to-end tests

First, ensure that `TEST_ENV=true` is set in your `apps/api/.env` file. This disables verification
step for the JWT token and enables passing of a mock token for authentication and does other API modifications.

Also set `VITE_TEST_ENV=true` in `apps/app/.env` file. This applies minor UI changes to facilitate cypress automation

Ensure that database has been reset to defaults with the special seed for e2e tests:

`npx -w api npm run migrate:reset:e2e-test`

Run `npm -w app run test-e2e`

## Running component tests

Run `npx -w app jest`

_Note:_ If you receive a `EBUSY: resource busy or locked, open..` error, run with a --no-cache flag

To genereate coverage report, run with `--coverage` flag

Project is also configured to generate reports with `jest-html-reporter`, which outputs test results to `app/test-report.html`

## Updating seed file secret

To update the seed file, run `oc set data secret/seed-secret --from-file=seed.ts`

## To generate new changeset entry

When completing a feature, run

`npx changeset`

in the project root and follow the prompts. This info is going to be automatically included in change log.

## To publish a hotfix to production

- Make a hotfix branch off main
- Create pull request from hotfix into develop to test it on develop
- Create pull request from develop to stage to test on stage
- If looks good, create a pull request from hotfix to main

If there's a conflict because develop is ahead of main:

- Create a branch off develop
- Merge hotfix into this branch and resolve conflicts
- Make a pull request from this branch into develop

## @generated files and slow commits

NOTE: this is no longer necessary - generated files were added to .gitignore and are no longer source controlled

To avoid slow commits when auto-generation takes place, run `git add .` and then `npm run lint-generated` (in the api project)

If above doesn't work, use `lacroixdavid1.vscode-format-context-menu` VS Code extension. After installing, right click on the @generated folder and click `Format`

## To apply a db change via db migration

If first time, set the baseline migration:
`npx -w api prisma migrate resolve --applied 0_init`

To reset database with migrations:

`npx -w api prisma migrate reset` - this will reset the schema and apply the migrations in order.

Create migration:
`npx -w api prisma migrate dev --name MIGRATION_NAME`

To apply new migrations after pulling latest code:

`npx -w api prisma migrate deploy`

`npx -w api prisma generate`

## Making a database backup to local drive

Login to psql pod:
`oc exec -it  SQL_POD_NAME -- /bin/bash`
`cd /pgdata`

Get db info:

`psql`
`\l`

Create dump:
`pg_dump -U USER_NAME DB_NAME > backup.sql`

Exit pod and copy file:
`oc rsync SQL_POD_NAME:pgdata/backup.sql ~/`

Remove remote backup file:

`oc exec SQL_POD_NAME -- rm pgdata/backup.sql`

## To replicate production database to dev/test

Make a backup of production as above first.

Upload backup file to dev/test sql pod:

`oc cp ~/profiles.sql SQL_POD_NAME:/pgdata`

Login to sql, and clear all data:

`psql -d api -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"`

If importing to local:

`psql -d api -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" -h localhost -p 5432 -U admin`

`docker cp backup.sql api-postgres-1:/home/backup.sql`

Import production data:

`psql -U postgres -d api -f backup.sql`

If on local:

`psql -U postgres -d api -f /home/backup.sql -h localhost -p 5432 -U admin`

Clear position requests:

`TRUNCATE TABLE position_request;`

## To connect to local db

Open container terminal and enter:

`psql -h localhost -p 5432 -U admin -d api`

## To accelerate new image uptake on openshift after publishing

NOTE: these changes have been integrated into the pipeline and now happen automatically on every publish

Openshift may take up to 15 minutes to pick a new image from artifactory. There is no way to change this frequency. If needed, as a workaround
perform these operations to get openshift to pick up the image from artifactory faster:

`oc project xxxx-tools`

`oc delete -k deployments/openshift/kustomize/images/image-streams/`

`oc apply -k deployments/openshift/kustomize/images/image-streams/`

## Recursive relationships in schema.prisma

To avoid maximum call stack depth for cases where there is recursive relationship in schema.prisma, cast the input object into
a type generated by prisma itself instead of prisma-nestjs-graphql, e.g.:

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

## To retreive Artifactory username and password

In the tools namespace:

```
oc get secret/artifacts-default-[random] -o json | jq '.data.username' | tr -d "\"" | base64 -d
oc get secret/artifacts-default-[random] -o json | jq '.data.password' | tr -d "\"" | base64 -d
```

## Run Prisma Studio with a remote database

NOTE: this no longer works since OS installation now uses crunchy postgresql cluster configuration instead of standalone configuration.

To run Prisma Studio that is connected to a remote database follow these steps:

- Setup local port forwarding using `oc port-forward POD_NAME 5432` command, where POD_NAME is the name of the PostgreSQL pod
- Update .env file entry for the `DATABASE_URL` parameter, change it to `postgresql://username:password@localhost:5432/db-name`. You can find the database address from the secrets in openshift (ensure it's `@localhost`)
- Run prisma studio as usual using `npx -w api prisma studio`

## "Uknown blob" or "manifest invalid" build issue

If you get an "Unknown blob" or "manifest invalid" error message during build process, this is likely caused by artifactory being full. To resolve, delete old images from the artifactory repository to free up space and retry the action.

## DB Troubleshooting

_Note_ Below is for high availbility configuration. For MVP, configuraiton is using single database pod

There are two stateful sets, each with their own PVC:

- `api-postgres-00-64ql` - primary component, stores actual data. Runs following containers:
  - _Crunchy PostgreSQL_: Runs the PostgreSQL database.
  - _Replication Cert Copy_: This container is responsible for managing replication certificates for secure data replication.
  - _pgBackRest_: Provides reliable backups and disaster recovery solutions for PostgreSQL.
    Note: /pgdata is mounted to api-postgres-00-64ql-pgdata. To see what's taking up space, run `du -h` in the directory
- `api-postgres-repo-host` - handles the pgBackRest repository. pgBackRest is a backup and restore solution for PostgreSQL

### Remoting into db pod

`kubectl exec -it api-postgres-00-64ql-0 -c database -- /bin/bash`

backrest pod:

`kubectl exec -it api-postgres-repo-host-0 -c pgbackrest -- /bin/bash`

### Downloading a log

`kubectl cp -n NAMESPACE api-postgres-00-64ql-0:/pgdata/pg15/log/postgresql-Thu.log postgresql-Thu.log`

### get pgData location

`echo $PGDATA`

Will output `/pgdata/pg15`

### db config file location

`/pgdata/pg15/postgresql.conf`

Do not edit this file directly

### View file sizes

`ls -lh`

### Log location

Logs are located at `/pgdata/pg15/log`

### Reliability and the Write-Ahead Log location

These are stored at `/pgdata/pg15_wal`

WAL files record all changes to the database's data files before those changes are written to the actual data files. If your database is under heavy write load, the volume of WAL files can increase significantly.WAL is designed to ensure that the database can recover from crashes and maintain data integrity. It's also crucial for replication and point-in-time recovery. Before any changes (like INSERT, UPDATE, DELETE) are made to the actual data files on disk, they are first recorded in the WAL files. This ensures that in case of a crash, the database can replay these logs and reconstruct the state of the database up to the last committed transaction.

Periodically, a checkpoint occurs where the current state of the database is written to the data files. Checkpoints help reduce recovery time by marking a known good point in the WAL stream where the database can start replaying logs during recovery.

Each WAL file is ALWAYS 16mb in size.

Archive Process: WAL archiving involves copying completed WAL files to a secondary location (disk, cloud storage, etc.) for safekeeping. This is handled by the archive_command configuration parameter, which specifies a shell command to run for each WAL file that needs to be archived.

`max_wal_size` parameter in config determines the maximum amount of WAL data that can accumulate before a checkpoint is forced. Checkpoints are moments when PostgreSQL writes all the changes from WAL files to the actual data files. With a larger max_wal_size, checkpoints occur less frequently because PostgreSQL allows more WAL data to accumulate before triggering a checkpoint.
`checkpoint_timeout` parameter specifies the maximum amount of time between automatic WAL checkpoints. Essentially, this setting controls how often PostgreSQL will force a checkpoint to occur, regardless of the amount of WAL activity
`checkpoint_completion_target` parameter specifies the target of checkpoint completion, as a fraction of total time between checkpoints. The default is 0.9, which spreads the checkpoint across almost all of the available interval, providing fairly consistent I/O load while also leaving some time for checkpoint completion overhead. Reducing this parameter is not recommended because it causes the checkpoint to complete faster. This results in a higher rate of I/O during the checkpoint followed by a period of less I/O between the checkpoint completion and the next scheduled checkpoint

### Clean up WAL files manually

`pg_archivecleanup -d /pgdata/pg15_wal 0000000300000009000000CD` where "0000000300000009000000CD" would the file name after which the files should be removed

To expire from the archive pod (there needs to be space on the volume to perform this operation):

`pgbackrest expire --stanza=db --repo1-retention-full=1`

### Get db size

`psql`
`\l` - get a list of dbs
`SELECT pg_size_pretty( pg_database_size('api') );`

## Husky pre-commit hook issues on windows with GitHub desktop

If getting this type of error when commiting changes:

```
.husky/pre-commit: line 13: npx: command not found
husky - pre-commit hook exited with code 127 (error)
husky - command not found in PATH=/mingw64/libexec/git-core:/mingw64/bin:/usr/bin...:undefined
``

- Reinstall GitHub desktop
- Check that system PATH variable contains `C:\Program Files\Git\bin` (path containing sh.exe) AND that it's first in the list
```

## Upgrade psql on CrunchyDB

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
