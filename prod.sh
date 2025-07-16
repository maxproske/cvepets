#!/usr/bin/env sh

if [ ! -f .env ]; then
    echo "Missing prod env"
    exit 1
fi

# Create network if it doesn't exist (allows containers to talk to each other by name instead of ip address)
if ! docker network ls | grep -q "cvepets"; then
    docker network create cvepets
fi

# Build and spin up containers in one step, without dropping existing data
# --build ensures images are rebuilt if needed
# --renew-anon-volumes and --remove-orphans are optional; remove if you want to preserve all volumes and orphans

docker compose -f docker-compose.yml \
    -f docker-compose.next.yml \
    -f docker-compose.openvas.yml \
    up --build -d
