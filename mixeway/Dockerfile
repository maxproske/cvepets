FROM openjdk:8-jre

WORKDIR /app

COPY MixewayOpenVasRestAPI-*.jar .
COPY pki ./pki

EXPOSE 8443

CMD java -jar MixewayOpenVasRestAPI-*.jar \
    --server.port=8443 \
    --server.ssl.key-alias=localhost \
    --server.ssl.key-store=/app/pki/certificate.p12 \
    --server.ssl.key-store-password=changeit \
    --server.ssl.trust-store=/app/pki/trust.jks \ 
    --server.ssl.trust-store-password=changeit \
    --openvasmd.socket=/var/run/openvas/openvasmd.sock \
    --allowed.users=localhost \
    --spring.profiles.active=noauth
