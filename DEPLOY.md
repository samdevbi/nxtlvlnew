# Netlify Deploy

## Environment variables (Netlify → Site settings → Environment variables)

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

## MongoDB Atlas

- **Network Access** → Allow `0.0.0.0/0` (yoki Netlify IP)
- Database nomi: `WCarProd` yoki alohida `nxtlvl`

## Birinchi marta ma'lumot yuklash

Lokalda (`.env.local` bilan):

```bash
npm run seed
```

## Admin panel

- URL: `https://your-site.netlify.app/admin/login`
- Default (seed): `admin@nxtlvl.uz` / `NxtlvlAdmin2026!` — **parolni o'zgartiring**

## Cloudinary

Dashboard → Settings → API Keys → 3 ta qiymatni Netlify env ga qo'shing.
Rasm yuklash admin panelda: A'zolar, Sozlamalar (hero).
