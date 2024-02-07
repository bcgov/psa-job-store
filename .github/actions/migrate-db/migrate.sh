#!/bin/bash

ENVIRONMENT=$1
OPENSHIFT_SERVER=$2
TOKEN=$3
export DATABASE_URL=$4

#Log in to OpenShift
echo "Deploying to $ENVIRONMENT"

npm install prisma

NAMESPACE="f3c07a-$ENVIRONMENT"

oc login $OPENSHIFT_SERVER --token=$TOKEN --insecure-skip-tls-verify=true
oc project $NAMESPACE

#set up port forwarding to access the database
POD_NAME=$(oc get pod -l name=nestjs-app -o jsonpath="{.items[0].metadata.name}")

oc cp ./apps/api/prisma $POD_NAME:/tmp/prisma

oc exec $POD_NAME -- npx prisma migrate deploy --schema=/tmp/prisma/schema.prisma