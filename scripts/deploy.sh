#!/usr/bin/env bash
set -euxo pipefail

cd /home/ubuntu/madebyphil-home

git fetch origin
git reset --hard origin/main

docker compose build
docker compose up -d

docker compose ps
docker image prune -f