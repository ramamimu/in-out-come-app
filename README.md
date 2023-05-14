# Kubernetes Deployment

```sh
# reserve IP addresses
gcloud compute addresses create $ADDRESS_NAME --region $REGION_NAME

# build image
gcloud builds submit --tag gcr.io/$PROJECT_ID/$IMAGE_NAME .

# create cluster
gcloud container clusters create $CLUSTER_NAME --num-nodes 1 --region $REGION_NAME
kubectl get nodes

# apply cluster
kubectl apply -f deployment.yaml
kubectl get pods

# apply service
kubectl apply -f service.yaml
kubectl get services
```

# Automation setup

- build image

- push image to container registry

- apply changes container and service

# Env Variable Cloud Build

```
_REGION
_CLUSTER
_TARGET_PORT
```

# Docs

### cloud builder image API

- https://cloud.google.com/build/docs/cloud-builders

### example CI/CD Google Kubernetes Engine

- https://medium.com/platformer-blog/ci-cd-with-gke-and-google-cloud-build-98a797ecf346

### reserve IP addresses on GKE as service

- https://cloud.google.com/kubernetes-engine/docs/tutorials/configuring-domain-name-static-ip#step_2b_using_an_ingress
