# CVE Pets

## Getting Started

```
# Copy environment variables
$ cp env/dev.env.sample env/dev

# Install dev dependencies for automatic code formatting
$ yarn install

$ ./debug.sh
```

- Next app: http://localhost:1337
- OpenVAS dashboard: https://localhost
- Mixeway REST API: https://localhost:8443

## Fun facts
The atomicorp/openvas Docker image is based on Centos 7 for FIPS-140-2 compliance.


Notes:
```
$ cd mixeway

$ docker build -t mixeway --no-cache . && docker run -p 8443:8443 mixeway

$ curl --insecure --header "Content-Type: application/json" --request POST --data '{"username":"admin","password":"rest"}' "https://localhost:8443/initialize"
$ curl --insecure --cert cert.crt --key private.key --header "Content-Type: application/json" --request POST --data '{"username":"admin","password":"rest"}' "https://localhost:8443/initialize"
```

curl: (56) OpenSSL SSL_read: error:14094416:SSL routines:ssl3_read_bytes:sslv3 alert certificate unknown, errno 0