# Digital Talent Deployments

# Overview

The `PSA Job Store` project currently consists of 2 applications: the app and api.

The deployment of the projects is controlled through kustomize, to deploy to our namespace in OpenShift. The deployments configurations can be found under openshift/kustomize.

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

You can then remote into the nestjs pod and run

```
npx -w api prisma db seed
```

to apply the seeds to the database.

To deploy the project (or patch the exiting infrastructure), simply run

```
oc apply -k openshift/kustomize/overlays/api/$ENV
```

where $ENV is either dev test or prod. (please only deploy to prod if your sure of what you're doing!)

\*\*Notes:

Image streams are deployed seperately. This should only have to be done once, as the image streams are linked to artifactory and will automatically be updated when an image is updated there. Image streams can be deployed as kustomize objects, found under openshift/kustomize/images.

For the api project, stateful sets are contained within the overlays instead of the base. This is due to a kubernetes/kustomize limitation that prevents the storage amount for a volumeclaimtemplate from being changed. If we use the same storage amount in every enviroment, this can be moved back to the base.
