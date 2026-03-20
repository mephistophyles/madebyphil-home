#!/usr/bin/env bash
set -euo pipefail

cd /home/ubuntu/madebyphil-home

docker run --rm \
  -v "$(pwd)/certbot/www:/var/www/certbot" \
  -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
  certbot/certbot renew --webroot -w /var/www/certbot --non-interactive

docker compose exec nginx nginx -s reload