#!/usr/bin/env sh

if [ ! -f .env ]; then
    echo "Missing staging env"
    exit 1
fi

# Spin down any running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)

# Create network (allows containers to talk to each other by name instead of ip address)
docker network create cvepets

# Build image using new BuildKit engine
docker compose -f docker-compose.yml \
    -f docker-compose.next.yml \
    -f docker-compose.next.local.yml \
    -f docker-compose.openvas.yml \
    build --parallel

# Spin up development containers
# --renew-anon-volumes prevents Postgres from retrieving volumes from previous containers after being killed
# --remove-orphans removes any renamed containers
docker compose -f docker-compose.yml \
    -f docker-compose.next.yml \
    -f docker-compose.next.local.yml \
    -f docker-compose.openvas.yml \
    up --renew-anon-volumes --remove-orphans -d
