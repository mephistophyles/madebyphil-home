#!/usr/bin/env bash
set -euxo pipefail

echo "=== whoami ==="
whoami

echo "=== pwd ==="
pwd

cd /home/ubuntu/madebyphil-home

echo "=== git status ==="
git status || true

echo "=== git remote -v ==="
git remote -v || true

echo "=== fetch ==="
git fetch origin

echo "=== reset ==="
git reset --hard origin/main

echo "=== docker compose config ==="
docker compose config

echo "=== docker compose build ==="
docker compose build

echo "=== docker compose up ==="
docker compose up -d

echo "=== docker compose ps ==="
docker compose ps

echo "=== docker compose logs ==="
docker compose logs --tail=100 || true

echo "=== prune ==="
docker image prune -f

echo "=== done ==="