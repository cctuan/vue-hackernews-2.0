#!/bin/bash

# Exit on any error
set -e

sudo /opt/google-cloud-sdk/bin/gcloud docker push us.gcr.io/${PROJECT_NAME}/1shot
sudo chown -R ubuntu:ubuntu /home/ubuntu/.kube
kubectl patch deployment drink-vue -p '{"spec":{"template":{"spec":{"containers":[{"name":"drink-vue","image":"us.gcr.io/circle-ctl-test/1shot:'"$CIRCLE_SHA1"'"}]}}}}'
