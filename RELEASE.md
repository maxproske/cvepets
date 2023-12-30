```sh
# Docker Hub
docker login

docker build --build-arg OV_PASSWORD=password -t maxproske/cvepets-next:latest -f next/release.Dockerfile ./next

docker push maxproske/cvepets-next:latest

# Digital Ocean
doctl auth init

doctl kubernetes cluster kubeconfig save 2353f96a-1142-4b5a-9188-c980729091d3

kubectl get nodes

kubectl apply -f manifests/app.yaml
```