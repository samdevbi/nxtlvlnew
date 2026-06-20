import { Schema } from "mongoose";

export const LocalizedTextSchema = new Schema(
  { uz: { type: String, required: true }, en: { type: String, required: true } },
  { _id: false }
);

export const MeetingSpeakerSchema = new Schema(
  {
    slug: String,
    name: String,
    shortName: String,
    initials: String,
    role: String,
  },
  { _id: false }
);
