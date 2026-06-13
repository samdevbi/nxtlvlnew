import sharp from "sharp";

// Manba: 2000x1333, cho'qqi tip ~ (800, 167)
const SRC = "/tmp/src-b.jpg";

// Desktop: 16:9, cho'qqi gorizontal markazda (left = 800 - 1600/2 = 0)
await sharp(SRC)
  .extract({ left: 0, top: 0, width: 1600, height: 900 })
  .jpeg({ quality: 86 })
  .toFile("public/hero-mountain.jpg");

// Mobil: portret 950x1300, cho'qqi markazda (left = 800 - 950/2 = 325)
await sharp(SRC)
  .extract({ left: 325, top: 0, width: 950, height: 1300 })
  .jpeg({ quality: 86 })
  .toFile("public/hero-mountain-mobile.jpg");

for (const f of ["public/hero-mountain.jpg", "public/hero-mountain-mobile.jpg"]) {
  const m = await sharp(f).metadata();
  console.log(`${f}: ${m.width}x${m.height}`);
}
