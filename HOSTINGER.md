# Hostinger VPS — Deploy

Next.js 14 + MongoDB Atlas + Cloudinary. **VPS yoki SSH bor hosting** kerak.

## Tez boshlash (serverda)

```bash
# 1. SSH
ssh root@SERVER_IP

# 2. Domeningizni kiriting
export DOMAIN=nxtlvl.uz
export APP_DIR=/var/www/nxtlvl

# 3. Repo klonlash va o'rnatish
git clone https://github.com/samdevbi/nxtlvlnew.git $APP_DIR
cd $APP_DIR
bash deploy/setup-server.sh
```

`setup-server.sh` avtomatik qiladi: Node 20, Nginx, PM2, build, seed, nginx config.

---

## Qo'lda o'rnatish

### 1. Env fayl

Serverda loyiha ildizida `.env.local` yarating (yoki nusxa oling):

```bash
cp deploy/env.production .env.local
```

`NEXT_PUBLIC_SITE_URL` ni o'z domeningizga o'zgartiring:

```
NEXT_PUBLIC_SITE_URL=https://nxtlvl.uz
```

Barcha qiymatlar `deploy/env.production` da tayyor (MongoDB, Cloudinary, admin).

### 2. Build va seed

```bash
npm install
npm run build
npm run seed    # birinchi marta — admin + ma'lumotlar
```

### 3. PM2

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup     # server qayta yonganda avto-ishga tushish
```

### 4. Nginx

```bash
sudo cp deploy/nginx-nxtlvl.conf /etc/nginx/sites-available/nxtlvl
# server_name ni domeningizga o'zgartiring
sudo nano /etc/nginx/sites-available/nxtlvl
sudo ln -s /etc/nginx/sites-available/nxtlvl /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 5. SSL (HTTPS)

Hostinger panel → SSL, yoki:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d nxtlvl.uz -d www.nxtlvl.uz
```

---

## MongoDB Atlas

1. [cloud.mongodb.com](https://cloud.mongodb.com) → **Network Access**
2. **Add IP** → server IP yoki `0.0.0.0/0` (barcha joydan)
3. Database: `WCarProd`

---

## Admin panel

| | |
|---|---|
| URL | `https://Domeningiz.uz/admin/login` |
| Email | `admin@nxtlvl.uz` |
| Parol | `NxtlvlAdmin2026!` |

Productionda parolni o'zgartiring.

---

## Yangilash (keyingi deploylar)

```bash
cd /var/www/nxtlvl
bash deploy/update.sh
```

Yoki qo'lda: `git pull` → `npm install` → `npm run build` → `pm2 restart nxtlvl`

---

## Fayllar

| Fayl | Vazifasi |
|------|----------|
| `deploy/env.production` | Barcha env (serverga `.env.local` sifatida) |
| `ecosystem.config.cjs` | PM2 process manager |
| `deploy/nginx-nxtlvl.conf` | Nginx reverse proxy |
| `deploy/setup-server.sh` | Birinchi marta avtomatik o'rnatish |
| `deploy/update.sh` | Kod yangilash |

---

## Muammolar

**502 Bad Gateway** — PM2 ishlamayapti: `pm2 logs nxtlvl`

**MongoDB ulanmayapti** — Atlas Network Access, `MONGODB_URI` tekshiring

**Rasm yuklanmayapti** — `CLOUDINARY_*` env va admin login

**Port band** — `lsof -i :3000` yoki PM2 da port o'zgartiring

---

## Lokal → server env ko'chirish

```bash
scp deploy/env.production user@SERVER_IP:/var/www/nxtlvl/.env.local
```

Domenni serverda tahrirlang: `nano /var/www/nxtlvl/.env.local`
