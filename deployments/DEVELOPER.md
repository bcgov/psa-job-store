# Digital Talent Deployments

## Overview

The `Job Store` project currently consists of two applications and one service: the app and api, and elasticsearch.

## Environment Variables

The `Job Store` is configured using environment variables. The implementation of environment variables depends on the environment.

### Local Development

When developing locally, pass in environment variables using the following `.env` files.

`apps/api/.env`

```sh
# Node Settings
NODE_ENV=

# E2E Settings
USE_MOCKS=
E2E_TESTING=
E2E_AUTH_KEY=
E2E_JWT_SECRET=
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
```

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

See `Deployment` for instructions how to deploy environment variables to OpenShift.

## Deployment

The deployment of the projects is controlled through kustomize, to deploy to our namespace in OpenShift. The configurations can be found under openshift/kustomize.

To deploy the entire application, you must deploy at least the frontend and backend applications, and elasticsearch:

```
oc apply -k deployments/openshift/kustomize/base/api/crunchy
oc apply -k deployments/openshift/kustomize/base/elasticsearch
oc apply -k deployments/openshift/kustomize/overlays/api/$ENV
oc apply -k deployments/openshift/kustomize/overlays/app/$ENV
```

where $ENV is either dev test or prod. (please only deploy to prod if your sure of what you're doing!)

Once the new postgrescluster is up and running, we simply need to change the URI used by the backend to point to the new cluster. Find the openshift secret "<new-cluster-name>-pguser-admin" and copy the value for the key "uri". Update the "secrets" secret with this value, overwriting the existing value for the key "DATABASE_URL". Find the nestjs-app deployment config and start a rollout; the new pod should pick up the updated secret value and be pointing to the new cluster database.

Optionaly you can also deploy Kibana:

```
oc apply -k deployments/openshift/kustomize/base/kibana
```

These deployments may also depend on secrets; Openshift Templates generally handles secrets and configmaps better, so these can be found under the openshift/templates folder.

Currently there is one secret that must be set up for the api project. To run, log into openshift and run the command:

```
oc process -f templates/secrets/secrets.yml
-p PROJECT_NAMESPACE=
-p ENV_NAME=
-p NODE_ENV=
-p EVENT_STORE_URL=
-p KEYCLOAK_REALM_URL=
| oc create -f -
```

Additionally, if you would like to seed the database, create a secret using a seed.ts file

```
oc create secret generic seed-secret --from-file=seed.ts=./seed.ts
```

If you are running the seed on a fresh database, uou can then remote into the nestjs pod and run

```
npx -w api prisma db seed
```

to apply the seeds to the database. If the database has been previously seeded, you should instead run:

```
npx -w api prisma migrate reset
```

The above will delete all data, re-apply migrations and run the seed command

The elasticsearch cluster may also need to be restarted.
and then restart the nestjs container. This will trigger data population from PeopleSoft, such as departments info. If the nestjs container cannot connect to the elasticsearch service (and elasticsearch has finished initializing), delete the elasticsearch statefulset and recreate it.

Image streams are deployed seperately. This should only have to be done once (for all enviroments), as the image streams are linked to artifactory and will automatically be updated when an image is updated there. Image streams can be deployed as kustomize objects:

```
oc apply -k deployments/openshift/images
```

In order for deployments to be able to pull these images, a docker pull secret must be created in each (dev/test/prod) namespace, and linked to the default service account:

```
oc create secret docker-registry artifacts-pull-default-hucvei \
    --docker-server=artifacts.developer.gov.bc.ca \
    --docker-username=******** \
    --docker-password==******** \
    --docker-email==********

oc secrets link default artifacts-pull-default-hucvei --for=pull
```

It is important to note that the imagestreams only refresh from artifactory every 15 minutes, meaning you will have to wait a period of time before it is actually deployed. A way to circumvent this waiting period is to delete and recreate the imagestreams, like so:

```
oc project f3c07a-tools
oc delete -k deployments/openshift/kustomize/images/image-streams/
oc apply -k deployments/openshift/kustomize/images/image-streams/
```

## Backups:

Backups are scheduled by the postgres operator using pgbackrest. The schedule is under
spec.backups.pgbackrest.global.repos.schedules. The current schedule is full backups at 2AM and incrementals every 15 minutes.

You can also perform a one-off backup by changing:

```
spec:
  backups:
    pgbackrest:
      manual:
        repoName: repo1
        options:
         - --type=full
```

and then applying the annotation to trigger it:

```
kubectl annotate -n <namespace> postgrescluster <postgres-cluster-name> \
  postgres-operator.crunchydata.com/pgbackrest-backup="$(date)"
```

## Restores:

Before running the restore, verify that only one, primary, cluster instance is running by checking the stateful sets view in OpenShift.
There should be 3 objects - 2 for each of horizontally scaled pods and one for the backup/restore process. In order to remove an instance,
update `metadata.name` in `deployments/openshift/kustomize/overlays/crunchy/<ENV>/patch.yml` and
`deployments/openshift/kustomize/base/crunchy/postgrescluster.yml` to match the name of the instance you'd like to remove. Then run
`oc delete -k deployments/openshift/kustomize/overlays/crunchy/<ENV>`

To perform a restore apply the following changes to the `deployments/openshift/kustomize/overlays/crunchy/<ENV>/patch.yml` file:

1. Change the metadata.name to the new cluster name that will become the restored database. Ensure it is different from the current
   live cluster name (ON OPENSHIFT).
2. Add `dataSource` block under `spec` as below.
3. Change the spec.dataSource.postgresCluster.clusterName to the existing database.
4. Specify under options the exact time you would like to restore from. The restore will happen precisely to that point in time.

Example:

```
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

And also change the metadata.name in the base file (`deployments/openshift/kustomize/base/crunchy/postgrescluster.yml`),
so the patch can identify the base.

Then run

```
oc apply -k deployments/openshift/kustomize/overlays/crunchy/<ENV>
```

To start up the restored cluster. You can then run

```
oc describe postgrescluster.postgres-operator.crunchydata.com/<new-cluster-name>
```

to check the status of the new cluster. To definitively check that restore is complete and database is ready, check the
pod log for the database.

Once the new cluster is up and running, we simply need to change the URI used by the backend to point to the new cluster:

1. Find the openshift secret "<new-cluster-name>-pguser-admin" and copy the value for the key "uri".
2. Update the "secrets" secret with this value, overwriting the existing value for the key "DATABASE_URL".
3. Find the nestjs-app deployment config and start a rollout; the new pod should pick up the updated secret value and be pointing to the new cluster database. Note it may appear like the action had no effect, be patient or monitor the progress in the ReplicationControllers window.

If the restored database is sufficiently old not to include latest migrations, you may need to roll back API and App images to older versions
So that the application is compatible with the database.

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

```
metadata:
 name: api-postgres-old
```

Record the new name of the PV here:

### PV NAME

```
	pvc-ce49ee87-1376-42fb-8afd-558947184500
```

PVCs should be marked with a custom finalizer, to prevent them from being accidentally deleted. If you have run the oc delete command, the PVCs will be stuck in a terminating state. To permanently delete them, simply remove the 'kubernetes' finalizer.

If you have indeed swapped over to a new cluster, you should mark the new PVCs with a finalizer, which prevents PVCs from automatically being deleted. There should be an exisiting finalizer; you can add 'kubernetes' as an additional finalizer, like so:

```
finalizers:
  - kubernetes.io/pvc-protection
  - kubernetes
```

In the event that the postgrescluster is totally lost and a restore process is not possible, it is still possible to recover the backup files as they are stored in netapp-file-backup storage. You can contact the platforms team and ask them to restore it to another PVC by referencing the PV name, as listed above.

### Creating a sql dump from a restore

Restore to a folder:

```pgbackrest restore \
--stanza=db \
--type=time \
--target="2024-11-04 09:40:00-08:00" \
--pg1-path=/pgdata/restore \
--delta
```

Start a temp psql server with restored data:

`pg_ctl -D /pgdata/restore start -o "-p 5533"`

View the actual restore timestamp:

`psql -p 5533 -c "SELECT pg_last_xact_replay_timestamp();"`

Dump data to .sql:

`pg_dump -p 5533 -d api --create -F plain > /pgdata/restore.sql`

Shut down temporary sql instance:

`pg_ctl -D /pgdata/restore stop`

### Secret Backup and Restore

There is a cron job (secrets-backup) that backs up the openshift secrets object daily. These backups are stored on a PVC, and stored for 60 days.

The PVC is mounted to the sidecar under /backups for easy access. If the secrets ever need to be restored, you can fetch
from here, and decode the base64 values.

## Notes:

For the api project, stateful sets are contained within the overlays instead of the base. This is due to a kubernetes/kustomize limitation that prevents the storage amount for a volumeclaimtemplate from being changed. If we use the same storage amount in every enviroment, this can be moved back to the base.

There is a command:

```
ALTER USER $POSTGRESQL_USER WITH CREATEDB;
```

That is run as part of the startup for the postgres deploymentconfig. This is necessary to allow for prisma to make changes to the database from the nestjs app, that contains the prisma client.
