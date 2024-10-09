#!/bin/bash

OPENSHIFT_SERVER=$1
TOKEN=$2
PROJECTS=$3

#Log in to OpenShift
echo "Redeploying $PROJECTS"

NAMESPACE="f3c07a-tools"

oc login $OPENSHIFT_SERVER --token=$TOKEN --insecure-skip-tls-verify=true

for PROJECT in $(echo "$PROJECTS" | jq -r '.[]'); do
    oc rollout restart deployment/$PROJECT
done