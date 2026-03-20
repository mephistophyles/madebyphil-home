#!/usr/bin/env bash
set -euo pipefail

cd /home/ubuntu/madebyphil-home

echo "Pulling latest code..."
git fetch origin
git reset --hard origin/main

echo "Building and starting containers..."
docker compose up -d --build

echo "Current container status:"
docker compose ps

echo "Pruning dangling images..."
docker image prune -f

echo "Deploy Complete."