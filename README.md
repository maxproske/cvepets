# CVE Pets

Uses GVM (formerly OpenVAS)

## Getting Started

```
# Copy environment variables
$ cp env/dev.env.sample env/dev

# Install dev dependencies for automatic code formatting
$ yarn install

$ ./debug.sh
```

- Next app: http://localhost:1337
- OpenVAS dashboard: http://localhost:8080
- Mixeway REST API: http://localhost:8443

## Fun facts
The atomicorp/openvas Docker image is based on Centos 7 for FIPS-140-2 compliance.


Notes:

Although OpenVAS offers TCP API, it is really hard to use, especially if you want to download a large report.
```
$ cd mixeway

$ docker build -t mixeway --no-cache . && docker run -p 8443:8443 mixeway

$ curl --insecure --header "Content-Type: application/json" --request POST --data '{"username":"admin","password":"rest"}' "https://localhost:8443/initialize"

$ cd cvepets/mixeway/pki
$ curl --insecure --cert cert.crt --key private.key --header "Content-Type: application/json" --request POST --data '{"username":"admin","password":"rest"}' "https://localhost:8443/initialize"
```

curl: (56) OpenSSL SSL_read: error:14094416:SSL routines:ssl3_read_bytes:sslv3 alert certificate unknown, errno 0