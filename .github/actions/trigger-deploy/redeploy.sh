#!/bin/bash

OPENSHIFT_SERVER=$1
TOKEN=$2
PROJECTS=$3
ENVIRONMENT=$4

echo "Re-deploying $PROJECTS to $ENVIRONMENT"

NAMESPACE="f3c07a-$ENVIRONMENT"
#Log in to OpenShift

oc login $OPENSHIFT_SERVER --token=$TOKEN --insecure-skip-tls-verify=true

for PROJECT in $(echo "$PROJECTS" | jq -r '.[]'); do
    oc rollout restart deployment/$PROJECT
done