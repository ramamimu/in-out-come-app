# Kubernetes steps manually

```sh
gcloud builds submit --tag gcr.io/dcdingprject/shell-image .

gcloud container clusters create shell-gke-cluster --num-nodes 1 --zone asia-southeast2-a
kubectl get nodes

kubectl apply -f deployment.yaml
kubectl get pods

kubectl apply -f service.yaml
kubectl get services
```

# Problem

[] create cluster manually

[] cannot apply -f service.yaml

[] web view been deployed not changed

# To Do

# Done

- build image

- push image to container registry

- ? apply cluster
