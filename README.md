# CVE Pets

What if you had a tamagotchi that could explore websites and collect shiny objects in the form of anonymized CVEs (Common Vulnerabilities and Exposures)?

Web developers rarely consider common vulnerabilities when developing websites. CVE Pets aims to gamify [Greenbone Vulnerability Manager](https://www.greenbone.net/en/) (formerly OpenVAS) to get developers excited about web app security.

## Roadmap

- [x] Dockerize Next, automatic code formatting
- [x] Dockerize GVM using [atomicorp/openvas](https://github.com/atomicorp/openvas), scan manually
- [x] Try [Mixeway/MixewayOpenVASRestAPI](https://github.com/Mixeway/MixewayOpenVASRestAPI) abandonware ([unsuccessfully](https://github.com/Mixeway/MixewayOpenVASRestAPI/issues/8))
- [x] Fork [RyanRiffle/node-omp](https://github.com/RyanRiffle/node-omp) to develop my own custom OMP library
- [x] Switch to [immauss/openvas](https://github.com/immauss/openvas) for OMP support, scan via API request, and render CVEs
- [x] Pokémon-style choose your starter pet
- [ ] Revalidate report on interval using [SWR](https://swr.vercel.app/docs/revalidation#revalidate-on-interval)
- [ ] Basic animations
- [ ] Scan user's IP address
- [ ] Dockerize Postgres for persistent data layer
- [ ] Add more idle RPG gacha elements

## Getting Started

```
# Copy environment variables
$ cp env/dev.env.sample env/dev

# Install dev dependencies for automatic code formatting
$ yarn install

$ ./debug.sh
```

- Next app: http://localhost:1337
- GVM dashboard: http://localhost:8080