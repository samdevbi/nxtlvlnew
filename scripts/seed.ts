/**
 * Bir martalik MongoDB seed — JSON va locale fayllardan import.
 * Ishga tushirish: npm run seed
 */
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

import bcrypt from "bcryptjs";
import { connectDB } from "../lib/db/mongoose";
import {
  Member,
  Meeting,
  Books,
  Stats,
  LocaleString,
  SiteSettings,
  Admin,
} from "../lib/db/models";
import { flattenLocales } from "../lib/api-utils";
import membersData from "../data/members.json";
import meetingsData from "../data/meetings.json";
import booksData from "../data/books.json";
import uz from "../locales/uz.json";
import en from "../locales/en.json";

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required");
  }

  await connectDB();
  console.log("Connected to MongoDB");

  // Admin
  const adminEmail = process.env.ADMIN_EMAIL || "admin@nxtlvl.uz";
  const adminPassword = process.env.ADMIN_PASSWORD || "NxtlvlAdmin2026!";
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await Admin.findOneAndUpdate(
    { email: adminEmail },
    { email: adminEmail, passwordHash },
    { upsert: true, new: true }
  );
  console.log(`Admin: ${adminEmail}`);

  // Members
  await Member.deleteMany({});
  for (const m of membersData) {
    const { photo, ...rest } = m as typeof m & { photo?: string };
    await Member.create({ ...rest, photoUrl: photo?.startsWith("http") ? photo : undefined });
  }
  console.log(`Members: ${membersData.length}`);

  // Meetings
  await Meeting.deleteMany({});
  const next = meetingsData.next;
  await Meeting.create({
    type: "next",
    slug: next.slug,
    number: next.number,
    title: next.title,
    iso: next.iso,
    dateLabel: next.dateLabel,
    time: next.time,
    timeRange: next.timeRange,
    location: next.location,
    speaker: next.speaker,
    topics: next.topics,
  });
  for (const m of meetingsData.archive) {
    await Meeting.create({
      type: "archive",
      slug: m.slug,
      number: m.number,
      title: m.title,
      dateLabel: m.dateLabel,
      dateLong: m.dateLong,
      timeRange: m.timeRange,
      location: m.location,
      attendance: m.attendance,
      speaker: m.speaker,
      summary: m.summary,
      topics: m.topics,
      slides: m.slides,
      takeaways: m.takeaways,
      galleryCount: m.galleryCount,
      galleryUrls: [],
    });
  }
  console.log(`Meetings: 1 next + ${meetingsData.archive.length} archive`);

  // Books
  await Books.findOneAndUpdate(
    { singleton: "default" },
    {
      singleton: "default",
      current: booksData.current,
      finishedCount: booksData.finishedCount,
      finished: booksData.finished,
    },
    { upsert: true, new: true }
  );
  console.log("Books: seeded");

  // Stats
  await Stats.findOneAndUpdate(
    { singleton: "default" },
    {
      singleton: "default",
      members: "8",
      meetings: "4",
      sport: "12",
      presentations: "4",
      membersPeriodUz: "Jamoada",
      membersPeriodEn: "On the team",
      periodUz: "1 oy ichida",
      periodEn: "In 1 month",
    },
    { upsert: true, new: true }
  );
  console.log("Stats: seeded");

  // Site settings
  await SiteSettings.findOneAndUpdate(
    { singleton: "default" },
    {
      singleton: "default",
      email: "club@nxtlvl.uz",
      telegram: "https://t.me/nxtlvladmin",
      instagram: "https://instagram.com/nxtlvl.club",
      linkedin: "https://linkedin.com/company/nxtlvl-club",
      heroDesktopUrl: "/hero-mountain.jpg",
      heroMobileUrl: "/hero-mountain-mobile.jpg",
    },
    { upsert: true, new: true }
  );
  console.log("Site settings: seeded");

  // Locales
  const flat = flattenLocales(
    uz as Record<string, unknown>,
    en as Record<string, unknown>
  );
  await LocaleString.deleteMany({});
  await LocaleString.insertMany(flat);
  console.log(`Locale strings: ${flat.length}`);

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
