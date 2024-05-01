#!/bin/bash

OPENSHIFT_SERVER=$1
TOKEN=$2

#Log in to OpenShift
echo "Rebuilding imagestreams"

NAMESPACE="f3c07a-tools"

oc login $OPENSHIFT_SERVER --token=$TOKEN --insecure-skip-tls-verify=true
oc project $NAMESPACE

#delete and apply rebuilds the imagestream instead of waiting 
oc delete -k deployments/openshift/kustomize/images/image-streams/

oc apply -k deployments/openshift/kustomize/images/image-streams/