# Digital Talent Deployments

## Overview

The `PSA Job Store` project currently consists of two applications and one service: the app and api, and elasticsearch.

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

Performing a restore can be done by changing the file:

```
oc apply -k deployments/openshift/kustomize/base/api/crunchy/postgrescluster.yml
```

Change the metadata.name to the new cluster name that will become the restored database; change the spec.dataSource.postgresCluster.clusterName to the existing database. Specify under options the exact time you would like to restore from; the closest backup to the date-time specified will be used.

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
     - --target="2024-02-06 19:50:11-04"
```

You can run

```
oc describe postgrescluster.postgres-operator.crunchydata.com/<new-cluster-name>
```

to check the status of the new cluster.

Once the new cluster is up and running, we simply need to change the URI used by the backend to point to the new cluster. Find the openshift secret "<new-cluster-name>-pguser-admin" and copy the value for the key "uri". Update the "secrets" secret with this value, overwriting the existing value for the key "DATABASE_URL". Find the nestjs-app deployment config and start a rollout; the new pod should pick up the updated secret value and be pointing to the new cluster database.

## Notes:

For the api project, stateful sets are contained within the overlays instead of the base. This is due to a kubernetes/kustomize limitation that prevents the storage amount for a volumeclaimtemplate from being changed. If we use the same storage amount in every enviroment, this can be moved back to the base.

There is a command:

```
ALTER USER $POSTGRESQL_USER WITH CREATEDB;
```

That is run as part of the startup for the postgres deploymentconfig. This is necessary to allow for prisma to make changes to the database from the nestjs app, that contains the prisma client.
