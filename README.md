# CVE Pets

What if you had a tamagotchi that could explore websites and collect shiny objects in the form of CVEs (Common Vulnerabilities and Exposures)?

Web developers rarely consider common vulnerabilities when developing websites. CVE Pets aims to gamify [Greenbone Vulnerability Manager](https://www.greenbone.net/en/) (formerly OpenVAS) to get developers excited about web app security.

## Getting Started

```sh
# Copy environment variables
cp .env.sample .env

# Install dependencies for automatic code formatting
yarn install

# Up
kubectl config use-context docker-desktop

tilt up

# Down
tilt down
```

- Next.js app: **http://localhost:3000**
- GVM dashboard: **http://localhost:8080**
- Tilt dashboard: **http://localhost:10350**

## Roadmap

- [x] Dockerize Next, configure automatic code formatting
- [x] Dockerize GVM using [atomicorp/openvas](https://github.com/atomicorp/openvas), scan manually
- [x] Try [Mixeway/MixewayOpenVASRestAPI](https://github.com/Mixeway/MixewayOpenVASRestAPI) abandonware ([unsuccessfully](https://github.com/Mixeway/MixewayOpenVASRestAPI/issues/8))
- [x] Fork [RyanRiffle/node-omp](https://github.com/RyanRiffle/node-omp) to develop my own custom OMP library
- [x] Switch to [immauss/openvas](https://github.com/immauss/openvas) for OMP support, scan via API request, and render CVEs
- [x] Pokémon-style choose your starter pet
- [x] Revalidate report on interval using [SWR](https://swr.vercel.app/docs/revalidation#revalidate-on-interval)
- [x] Scan user's host
- [x] Kubernetes w/ plain directory of YAML manifests
- [x] Tilt
- [x] Deploy to DigitalOcean Kubernetes
- [x] Setup CI with GitHub Actions
- [x] Save/clear progress using localstorage
- [ ] Vulnerability details
- [ ] TypeScript
- [ ] Scan your host -> 0: You're safe! 1+: How to fix -> Next scan
- [ ] XP, level up
- [ ] CVE icons
- [ ] Nginx
- [ ] Helm
- [ ] Basic animations
- [ ] Dockerize Postgres for persistent data layer
- [ ] Add more idle RPG/gacha elements
- [ ] Add more pets
- [ ] Google login
- [ ] GitOps
- [ ] ArgoCD
- [ ] Next replicaset + OpenVas statefulset
- [ ] Trading
- [ ] Patch notes
- [ ] Community/playerbase

## Issues

- Is it really necessary for OpenVAS to rebuild the NVT Cache every time it gets run? https://github.com/mikesplain/openvas-docker/issues/149
- Scan takes a while to startup and complete. How can we speed this up?

## Resources

- UI: https://worldflipper.jp/demo/src/index.html
