#!/usr/bin/env bash
# Yangilash: bash deploy/update.sh
set -euo pipefail

cd "$(dirname "$0")/.."

git pull origin main
npm install
npm run build
pm2 restart nxtlvl

echo "Yangilandi: $(date)"
