# Deploy

## Hostinger VPS (tavsiya)

To'liq yo'riqnoma: **[HOSTINGER.md](./HOSTINGER.md)**

```bash
ssh root@SERVER_IP
git clone https://github.com/samdevbi/nxtlvlnew.git /var/www/nxtlvl
cd /var/www/nxtlvl
export DOMAIN=sizning-domen.uz
bash deploy/setup-server.sh
```

Env tayyor: `deploy/env.production` → serverda `.env.local`

---

## Netlify

### Environment variables (Netlify → Site settings → Environment variables)

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=random-32-char-secret
ADMIN_EMAIL=admin@nxtlvl.uz
ADMIN_PASSWORD=your-secure-password
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
```

### MongoDB Atlas

- **Network Access** → Allow `0.0.0.0/0`
- Database: `WCarProd`

### Birinchi marta ma'lumot

```bash
npm run seed
```

### Admin

- URL: `/admin/login`
- Email: `admin@nxtlvl.uz`
- Parol: seed dagi `ADMIN_PASSWORD`

---

## Cloudinary

Dashboard → Settings → API Keys. Admin panelda: A'zolar, Sozlamalar (hero).
