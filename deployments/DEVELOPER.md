# PSA Job Store Deployments

## Overview

The `PSA Job Store` project consists of two main applications and several supporting services:

- Frontend application (app)
- Backend API service (api)
- Database (PostgreSQL via Crunchy operator)
- Elasticsearch for search functionality
- Kibana for viewing the logs
- Nginx reverse proxy for Kibana access authentication
- Log rotation service
- Report mailer service
- Secrets backup service

## Environment Variables

The `PSA Job Store` is configured using environment variables. The implementation of environment variables depends on the environment.

### Local Development

When developing locally, pass in environment variables using the following `.env` files.

`apps/api/.env`

```sh
# Node Settings
NODE_ENV=

# E2E Settings
USE_MOCKS=  # true/false. When true will use mock services for PeopleSoft, CRM as well as KeyCloak instead of using actual API connections
E2E_TESTING= # true/false. Set this flag when running e2e tests
E2E_AUTH_KEY= # arbitrary string, used by cypress to access certain protected endpoints
SEED_FILE=./prisma/run-e2e-seed.ts

# CRM Settings
CRM_APPLICATION_CONTEXT=
CRM_URL=
CRM_USERNAME=
CRM_PASSWORD=

# Database Settings
CLUSTER_NAME=
DATABASE_URL=
DATABASE_READ_URL=

# Elasticsearch & Kibana Settings
ELASTIC_NODE=
ELASTIC_USERNAME=
ELASTIC_PASSWORD=
# KIBANA_PASSWORD=

# `express-session` Settings
SESSION_SECRET=

# PeopleSoft Settings
PEOPLESOFT_URL=
PEOPLESOFT_USERNAME=
PEOPLESOFT_PASSWORD=

# Keycloak Settings
KEYCLOAK_REALM_URL=
KEYCLOAK_CALLBACK_URL=
KEYCLOAK_LOGOUT_REDIRECT_URL=
KEYCLOAK_CLIENT_ID=
KEYCLOAK_CLIENT_SECRET=

# `@bcgov/citz-imb-sso-css-api` Settings
# See: https://github.com/bcgov/citz-imb-sso-css-api
CSS_API_CLIENT_ID=
CSS_API_CLIENT_SECRET=
SSO_ENVIRONMENT=
SSO_INTEGRATION_ID=

#React App Settings
REACT_APP_URL=

# Debug (see below)
TEST_ENV=
```

#### TEST_ENV flag

Setting `TEST_ENV` flag to `true` will:

- Circumvent any role checks, allowing users to access any API endpoint
- Limit loading or employee data to a specific list of position numbers for accelerated org chart loading (to configure which positions, modify the source code by searching for instances of this flag usage)
- Allows users to go through the position request process without actually creating the position in PeopleSoft to avoid polluting the org chart (since we don't have the ability to delete positions out of PeopleSoft). It will still create an entry in the CRM
- Uses a hard-coded value for CRM contactId if it's not available in User model

Use this flag in development environment if you find that org chart take a long time to load or if you would like to go through the position creation process without actually creating a position in PeopleSoft. This flag is also helpful if you need to test API with Postman while disregarding role checks.

`apps/app/.env`

```sh
# URI of api server
VITE_BACKEND_URL=

# development | production
VITE_ENV=

# Job Store email address
VITE_SUPPORT_EMAIL=
```

### GitHub

Merging with `develop`, `staging` or `main` will kick off the CI/CD pipeline. The following **Environment secrets** are required in `GitHub > Settings > Environments > [dev|test|prod]`:

```sh
# Used when running tests
KEYCLOAK_CALLBACK_URL=

# Used to trigger database migrations, backups and restores
OPENSHIFT_API_TOKEN=

# URI of api server
VITE_BACKEND_URL=

# development | production
VITE_ENV=

# Job Store email address
VITE_SUPPORT_EMAIL=
```

### OpenShift

See `Deployment` section for instructions on how to deploy environment variables to OpenShift.

## Deployment

The deployment of the project is controlled through Kustomize for OpenShift. The configurations can be found under `deployments/openshift/kustomize`.

### Deployment Components

To deploy the entire application, you must deploy at least the following components:

1. **Database (Crunchy PostgreSQL)**
2. **Elasticsearch**
3. **API Service**
4. **Frontend Application**

Optional components include:

- Kibana for Elasticsearch visualization
- Nginx reverse proxy for Kibana authentication
- Report Mailer service
- Secrets Backup service
- Log rotation service

### Deployment Commands

Deploy the components in the following order:

```bash
# Deploy the database
oc apply -k deployments/openshift/kustomize/overlays/crunchy/$ENV

# Deploy Elasticsearch
oc apply -k deployments/openshift/kustomize/base/elasticsearch

# Deploy the API service
oc apply -k deployments/openshift/kustomize/overlays/api/$ENV

# Deploy the frontend application
oc apply -k deployments/openshift/kustomize/overlays/app/$ENV

# Optional: Deploy Kibana
oc apply -k deployments/openshift/kustomize/base/kibana

# Optional: Deploy Report Mailer
oc apply -k deployments/openshift/kustomize/base/report-mailer

# Optional: Deploy Secrets Backup
oc apply -k deployments/openshift/kustomize/base/secrets-backup
```

Where `$ENV` is either `dev`, `test`, or `prod`. (Please only deploy to prod if you're sure of what you're doing!)

Once the new postgrescluster is up and running, we simply need to change the URI used by the backend to point to the new cluster. Find the
openshift secret "<new-cluster-name>-pguser-admin" and copy the value for the key "uri". Update the "secrets" secret with this value, overwriting
the existing value for the key "DATABASE_URL". Find the nestjs-app deployment config and start a rollout; the new pod should pick up the updated
secret value and be pointing to the new cluster database.

### Secrets Configuration

These deployments depend on secrets. OpenShift Templates handle secrets and configmaps better than Kustomize, so these can be found under the `deployments/openshift/templates` folder.

To set up the required secrets for the API project, log into OpenShift and run:

```bash
oc process -f deployments/openshift/templates/secrets/secrets.yml | oc create -f -
```

For the Nginx reverse proxy, set up the required secrets:

```bash
oc process -f deployments/openshift/templates/secrets/nginx_secrets.yml | oc create -f -
```

### Database Seeding

If you would like to seed the database, create a secret using a seed.ts file:

```bash
oc create secret generic seed-secret --from-file=seed.ts=./seed.ts
```

The seed file is located at `apps/api/src/utils/seed.ts`

If you are running the seed on a fresh database, you can then remote into the nestjs pod and run:

```bash
npx -w api prisma db seed
```

If the database has been previously seeded, you should instead run:

```bash
npx -w api prisma migrate reset
```

The above will delete all data, re-apply migrations, and run the seed command.

The elasticsearch cluster may also need to be restarted. And then restart the nestjs container. This will trigger data population from PeopleSoft, such as departments info. If the nestjs container cannot connect to the elasticsearch service (and elasticsearch has finished initializing), delete the elasticsearch statefulset and recreate it.

### Image Streams

Image streams are deployed separately. This should only have to be done once (for all environments), as the image streams are linked to artifactory and will automatically be updated when an image is updated there. Image streams can be deployed as Kustomize objects:

```bash
oc apply -k deployments/openshift/kustomize/images
```

In order for deployments to be able to pull these images, a docker pull secret must be created in each (dev/test/prod) namespace, and linked to the default service account:

```bash
oc create secret docker-registry artifacts-pull-default-hucvei \
    --docker-server=artifacts.developer.gov.bc.ca \
    --docker-username=******** \
    --docker-password=******** \
    --docker-email=********

oc secrets link default artifacts-pull-default-hucvei --for=pull
```

Note that imagestreams only refresh from artifactory every 15 minutes. To circumvent this waiting period, you can delete and recreate the imagestreams:

```bash
oc project f3c07a-tools
oc delete -k deployments/openshift/kustomize/images/image-streams/
oc apply -k deployments/openshift/kustomize/images/image-streams/
```

## Database Management

### Backups

Backups are scheduled by the PostgreSQL operator using pgbackrest. The schedule is under `spec.backups.pgbackrest.global.repos.schedules`. The current schedule is full backups at 2AM and incrementals every 15 minutes.

You can also perform a one-off backup by changing:

```yaml
spec:
  backups:
    pgbackrest:
      manual:
        repoName: repo1
        options:
          - --type=full
```

and then applying the annotation to trigger it:

```bash
kubectl annotate -n <namespace> postgrescluster <postgres-cluster-name> \
  postgres-operator.crunchydata.com/pgbackrest-backup="$(date)"
```

### Restores

Before running the restore, verify that only one primary cluster instance is running by checking the stateful sets view in OpenShift.
There should be 3 objects - 2 for each of horizontally scaled pods and one for the backup/restore process. In order to remove an instance,
update `metadata.name` in `deployments/openshift/kustomize/overlays/crunchy/<ENV>/patch.yml` and
`deployments/openshift/kustomize/base/crunchy/postgrescluster.yml` to match the name of the instance you'd like to remove. Then run:

```bash
oc delete -k deployments/openshift/kustomize/overlays/crunchy/<ENV>
```

To perform a restore, apply the following changes to the `deployments/openshift/kustomize/overlays/crunchy/<ENV>/patch.yml` file:

1. Change the `metadata.name` to the new cluster name that will become the restored database. Ensure it is different from the current live cluster name (ON OPENSHIFT).
2. Add `dataSource` block under `spec` as below.
3. Change the `spec.dataSource.postgresCluster.clusterName` to the existing database.
4. Specify under options the exact time you would like to restore from. The restore will happen precisely to that point in time.

Example:

```yaml
metadata:
  name: api-postgres-clone
spec:
  dataSource:
    postgresCluster:
      clusterName: api-postgres-alpha
      repoName: repo1
      options:
        - --type=time
        - --target="2024-02-06 19:50:11 PST"
```

Also change the `metadata.name` in the base file (`deployments/openshift/kustomize/base/crunchy/postgrescluster.yml`),
so the patch can identify the base.

Then run:

```bash
oc apply -k deployments/openshift/kustomize/overlays/crunchy/<ENV>
```

To start up the restored cluster. You can check the status with:

```bash
oc describe postgrescluster.postgres-operator.crunchydata.com/<new-cluster-name>
```

To definitively check that restore is complete and database is ready, check the pod log for the database.

Once the new cluster is up and running, change the URI used by the backend to point to the new cluster:

1. Find the OpenShift secret "<new-cluster-name>-pguser-admin" and copy the value for the key "uri".
2. Update the "secrets" secret with this value, overwriting the existing value for the key "DATABASE_URL".
3. Find the nestjs-app deployment config and start a rollout; the new pod should pick up the updated secret value and be pointing to the new cluster database. Note it may appear like the action had no effect, be patient or monitor the progress in the ReplicationControllers window.

If the restored database is sufficiently old not to include latest migrations, you may need to roll back API and App images to older versions
so that the application is compatible with the database.

To do so:

1. Login to artifactory and find the API image that was created at or before the time which you specified during db restore.
   To check at what time the image was created select a tag (for example 0.1.0), then navigate to "Docker Info" and check the `org.opencontainers.image.created` field.
2. Update `spec.triggers.imageChangeParams.from.name` in `deployments/openshift/kustomize/overlays/api/<ENV>/patch.yml` and `deployments/openshift/kustomize/overlays/app/<ENV>/patch.yml` files with the image version you would like to roll back to
3. Apply changes by running `oc apply -k deployments/openshift/kustomize/overlays/api/<ENV>` and
   `oc apply -k deployments/openshift/kustomize/overlays/app/<ENV>`

NOTE: Perform a rollout on the sidecar deployment - this will reload the secrets and prevent
`Can't reach database server at...` and `Please make sure your database server is running at...` GitHub Actions errors during
subsequent migrations.

Once the new cluster is connected, verify the application is working. You can then delete the old cluster (although a waiting period of a few days might not be a bad idea!). Before deleting, RECORD THE NAME OF THE PERSISTANT VOLUME (PV) ATTACHED TO THE BACKUP PVC BELOW, AND ENSURE THAT YOU ARE REFERENCING THE CORRECT CLUSTER. In the metadata section of the postgrescluster.yml file, it must be set to the resource name you want to delete (Similarily, if you testing out backup and restore, make sure this is set to your cloned cluster's name when cleaning up!):

```yaml
metadata:
  name: api-postgres-old
```

### PV NAME

```
	pvc-ce49ee87-1376-42fb-8afd-558947184500
```

PVCs should be marked with a custom finalizer, to prevent them from being accidentally deleted. If you have run the oc delete command, the PVCs will be stuck in a terminating state. To permanently delete them, simply remove the 'kubernetes' finalizer.

If you have indeed swapped over to a new cluster, you should mark the new PVCs with a finalizer, which prevents PVCs from automatically being deleted. There should be an exisiting finalizer; you can add 'kubernetes' as an additional finalizer, like so:

```yaml
finalizers:
  - kubernetes.io/pvc-protection
  - kubernetes
```

In the event that the postgrescluster is totally lost and a restore process is not possible, it is still possible to recover the backup files as they are stored in netapp-file-backup storage. You can contact the platforms team and ask them to restore it to another PVC by referencing the PV name, as listed above.

### Creating a SQL Dump from a Restore

Restore to a folder:

```bash
pgbackrest restore \
--stanza=db \
--type=time \
--target="2024-11-04 09:40:00-08:00" \
--pg1-path=/pgdata/restore \
--delta
```

Start a temp PostgreSQL server with restored data:

```bash
pg_ctl -D /pgdata/restore start -o "-p 5533"
```

View the actual restore timestamp:

```bash
psql -p 5533 -c "SELECT pg_last_xact_replay_timestamp();"
```

Dump data to .sql:

```bash
pg_dump -p 5533 -d api --create -F plain > /pgdata/restore.sql
```

Shut down temporary SQL instance:

```bash
pg_ctl -D /pgdata/restore stop
```

## Secret Backup and Restore

There is a cron job (secrets-backup) that backs up the openshift secrets object daily. These backups are stored on a PVC, and stored for 60 days.

The PVC is mounted to the sidecar under /backups for easy access. If the secrets ever need to be restored, you can fetch
from here, and decode the base64 values.

## GitHub Actions for Database Management

In addition to the manual backup and restore processes described above, you can run a manual backup and restore using GitHub actions. Note that the restore function here will overwrite the current state of the cluster, as opposed to setting up a clone cluster.

### Database Backup Action

This action creates a full backup of a specified PostgreSQL cluster. You need to specify a name for the backup ("annotation"), which can then be used in the restore action.

#### Usage

1. Navigate to the "Actions" tab in your GitHub repository.
2. Select the "Database Backup" workflow.
3. Click "Run workflow" and provide the following inputs:
   - PostgreSQL Cluster Name (default: api-postgres-clone)
   - Environment to backup (dev, test, or prod)
   - Backup annotation (default: manual_backup)

### Database Restore Action

This action restores a PostgreSQL cluster from an annotated backup OR to a specific point in time.

#### Usage

1. Navigate to the "Actions" tab in your GitHub repository.
2. Select the "Database Restore" workflow.
3. Click "Run workflow" and provide the following inputs:
   - PostgreSQL Cluster Name (default: api-postgres-clone)
   - Environment to restore (dev, test, or prod)
   - Restore timestamp (for point-in-time recovery) OR
   - Backup annotation (for restoring a specific backup)

## Secret Backup and Restore

There is a cron job (secrets-backup) that backs up the OpenShift secrets object daily. These backups are stored on a PVC and kept for 60 days.

The PVC is mounted to the sidecar under /backups for easy access. If the secrets ever need to be restored, you can fetch
from here, and decode the base64 values.

## Kibana Service

### Overview

Kibana is an open-source data visualization and exploration tool used for log and time-series analytics, application monitoring, and operational intelligence use cases. In the PSA Job Store project, Kibana is integrated with Elasticsearch to provide logging, monitoring, and debugging capabilities.

### Key Features

- **Log Visualization**: View and analyze application logs in real-time
- **Search and Filter**: Quickly search through logs using Elasticsearch's query language
- **Dashboard Creation**: Build custom dashboards for monitoring application health and performance
- **Error Analysis**: Identify and troubleshoot errors and exceptions

### Using Kibana

#### Viewing Application Logs

1. Navigate to **Discover** in the Kibana sidebar
2. Select the appropriate index pattern (typically `alexandria-api-log` and `alexandria-app-log`)
3. Use the time picker to select the relevant time range
4. Search for specific log entries using the search bar (e.g., `error`, `position-request`, etc.)

There also a number of presets that have been saved. To open these, open the discover window and then select `Open`. You will see options like `API error log`, `App error log` etc.

### Kibana in Production

In production environments, Kibana is deployed as part of the Elasticsearch stack in OpenShift. Access is restricted to users with `super-admin` role. To find the Kibana URL, go to OpenShift -> Networking -> Routes

## Additional Notes

- For the api project, stateful sets are contained within the overlays instead of the base. This is due to a kubernetes/kustomize limitation that prevents the storage amount for a volumeclaimtemplate from being changed. If we use the same storage amount in every enviroment, this can be moved back to the base.

There is a command:

```sql
ALTER USER $POSTGRESQL_USER WITH CREATEDB;
```

That is run as part of the startup for the postgres deploymentconfig. This is necessary to allow for prisma to make changes to the database from the nestjs app, that contains the prisma client.

- The Nginx reverse proxy is built on OpenResty with OpenIDC support for authentication. It serves as the authentication layer for accessing Kibana using IDIR.

- The log rotation service is a dedicated container for managing application logs efficiently using Alpine Linux and logrotate.
