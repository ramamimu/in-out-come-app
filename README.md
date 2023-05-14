# Kubernetes deployment

```sh
gcloud builds submit --tag gcr.io/$PROJECT_ID/shell-image .

gcloud container clusters create $CLUSTER_NAME --num-nodes 1 --zone $ZONE_NAME
kubectl get nodes

kubectl apply -f deployment.yaml
kubectl get pods

kubectl apply -f service.yaml
kubectl get services
```

# Automation setup

- build image

- push image to container registry

- apply changes container and service

# env

```
_REGION
_CLUSTER
_TARGET_PORT
```
