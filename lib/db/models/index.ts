import mongoose, { Schema, models, model } from "mongoose";
import { LocalizedTextSchema, MeetingSpeakerSchema } from "@/lib/db/schemas";

const MemberEducationSchema = new Schema(
  {
    degree: { type: String, enum: ["bachelor", "master", "phd"], required: true },
    field: String,
    university: String,
    period: LocalizedTextSchema,
  },
  { _id: false }
);

const MemberSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    shortName: String,
    initials: String,
    age: Number,
    role: String,
    photoUrl: String,
    location: String,
    telegram: String,
    email: String,
    bio: LocalizedTextSchema,
    education: [MemberEducationSchema],
    experience: [
      new Schema({ title: String, period: LocalizedTextSchema }, { _id: false }),
    ],
    skills: [String],
    results: [
      new Schema({ label: LocalizedTextSchema, text: LocalizedTextSchema }, { _id: false }),
    ],
    books: [String],
    hobbies: [LocalizedTextSchema],
  },
  { timestamps: true }
);

const MeetingSchema = new Schema(
  {
    type: { type: String, enum: ["next", "archive"], required: true },
    slug: { type: String, required: true, unique: true },
    number: Number,
    title: String,
    iso: String,
    dateLabel: LocalizedTextSchema,
    dateLong: LocalizedTextSchema,
    time: String,
    timeRange: String,
    location: String,
    attendance: String,
    speaker: MeetingSpeakerSchema,
    summary: LocalizedTextSchema,
    topics: [LocalizedTextSchema],
    slides: new Schema({ pages: Number, url: String }, { _id: false }),
    takeaways: [LocalizedTextSchema],
    galleryCount: Number,
    galleryUrls: [String],
  },
  { timestamps: true }
);

const BooksSchema = new Schema(
  {
    singleton: { type: String, default: "default", unique: true },
    current: new Schema(
      {
        title: String,
        author: String,
        note: LocalizedTextSchema,
        progressPercent: Number,
        chapter: Number,
        totalChapters: Number,
      },
      { _id: false }
    ),
    finishedCount: Number,
    finished: [new Schema({ title: String, author: String }, { _id: false })],
  },
  { timestamps: true }
);

const StatsSchema = new Schema(
  {
    singleton: { type: String, default: "default", unique: true },
    members: { type: String, default: "8" },
    meetings: { type: String, default: "4" },
    sport: { type: String, default: "12" },
    presentations: { type: String, default: "4" },
    membersPeriodUz: { type: String, default: "Jamoada" },
    membersPeriodEn: { type: String, default: "On the team" },
    periodUz: { type: String, default: "1 oy ichida" },
    periodEn: { type: String, default: "In 1 month" },
  },
  { timestamps: true }
);

const ApplicationSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    telegram: String,
    profession: String,
    reason: String,
    status: {
      type: String,
      enum: ["new", "reviewed", "accepted", "rejected"],
      default: "new",
    },
  },
  { timestamps: true }
);

const LocaleStringSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    uz: { type: String, required: true },
    en: { type: String, required: true },
  },
  { timestamps: true }
);

const SiteSettingsSchema = new Schema(
  {
    singleton: { type: String, default: "default", unique: true },
    email: { type: String, default: "club@nxtlvl.uz" },
    telegram: { type: String, default: "https://t.me/nxtlvladmin" },
    instagram: { type: String, default: "https://instagram.com/nxtlvl.club" },
    linkedin: { type: String, default: "https://linkedin.com/company/nxtlvl-club" },
    heroDesktopUrl: String,
    heroMobileUrl: String,
  },
  { timestamps: true }
);

const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export const Member = models.Member || model("Member", MemberSchema);
export const Meeting = models.Meeting || model("Meeting", MeetingSchema);
export const Books = models.Books || model("Books", BooksSchema);
export const Stats = models.Stats || model("Stats", StatsSchema);
export const Application = models.Application || model("Application", ApplicationSchema);
export const LocaleString = models.LocaleString || model("LocaleString", LocaleStringSchema);
export const SiteSettings = models.SiteSettings || model("SiteSettings", SiteSettingsSchema);
export const Admin = models.Admin || model("Admin", AdminSchema);

export type MemberDoc = mongoose.InferSchemaType<typeof MemberSchema>;
export type MeetingDoc = mongoose.InferSchemaType<typeof MeetingSchema>;
export type ApplicationDoc = mongoose.InferSchemaType<typeof ApplicationSchema>;
