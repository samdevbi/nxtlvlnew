#!/usr/bin/env bash
# Hostinger VPS — birinchi marta o'rnatish
# Ishlatish: bash deploy/setup-server.sh
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/nxtlvl}"
REPO_URL="${REPO_URL:-https://github.com/samdevbi/nxtlvlnew.git}"
DOMAIN="${DOMAIN:-YOUR_DOMAIN.uz}"

echo "==> Node.js 20"
if ! command -v node &>/dev/null || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt 18 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

echo "==> Nginx + PM2"
sudo apt-get update
sudo apt-get install -y nginx git
sudo npm install -g pm2

echo "==> Loyiha klonlash: $APP_DIR"
sudo mkdir -p "$(dirname "$APP_DIR")"
if [ ! -d "$APP_DIR/.git" ]; then
  sudo git clone "$REPO_URL" "$APP_DIR"
fi
sudo chown -R "$USER:$USER" "$APP_DIR"
cd "$APP_DIR"

echo "==> Env fayl"
if [ ! -f .env.local ]; then
  cp deploy/env.production .env.local
  sed -i "s|YOUR_DOMAIN.uz|${DOMAIN}|g" .env.local
  sed -i "s|https://YOUR_DOMAIN.uz|https://${DOMAIN}|g" .env.local
fi

echo "==> Build"
npm install
npm run build

echo "==> Seed (birinchi marta)"
npm run seed || true

echo "==> PM2"
pm2 delete nxtlvl 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save

echo "==> Nginx"
sudo cp deploy/nginx-nxtlvl.conf /etc/nginx/sites-available/nxtlvl
sudo sed -i "s/YOUR_DOMAIN.uz/${DOMAIN}/g" /etc/nginx/sites-available/nxtlvl
sudo ln -sf /etc/nginx/sites-available/nxtlvl /etc/nginx/sites-enabled/nxtlvl
sudo nginx -t
sudo systemctl reload nginx

echo ""
echo "Tayyor! https://${DOMAIN} oching."
echo "Admin: https://${DOMAIN}/admin/login"
echo "Email: admin@nxtlvl.uz"
