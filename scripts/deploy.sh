#!/usr/bin/env bash
set -Eeuo pipefail

REPO_DIR="/home/ubuntu/madebyphil-home"

echo "Deploying from ${REPO_DIR}"
cd "${REPO_DIR}"

echo "Current directory:"
pwd
ls -la

echo "Checking repo and compose file..."
git rev-parse --is-inside-work-tree
test -f docker-compose.yml -o -f compose.yml -o -f compose.yaml

echo "Fetching latest code..."
git fetch origin
git reset --hard origin/main

echo "Pre-build cleanup..."
docker image prune -af || true
docker builder prune -af || true

echo "Building containers..."
docker compose build --pull

echo "Starting containers..."
docker compose up -d

echo "Container status:"
docker compose ps

echo "Recent logs:"
docker compose logs --tail=50 || true

echo "Post-deploy cleanup..."
docker image prune -af || true
docker builder prune -af || true

echo "Local HTTP check..."
curl -I http://localhost || true

echo "Deploy complete."