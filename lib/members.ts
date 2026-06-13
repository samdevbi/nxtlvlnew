import membersJson from "@/data/members.json";

export interface LocalizedText {
  uz: string;
  en: string;
}

export interface MemberExperience {
  title: string;
  period: LocalizedText;
}

export interface MemberResult {
  label: LocalizedText;
  text: LocalizedText;
}

export interface MemberEducation {
  degree: "bachelor" | "master" | "phd";
  field: string;
  university: string;
  period: LocalizedText;
}

export interface Member {
  slug: string;
  name: string;
  shortName: string;
  initials: string;
  age: number;
  role: string;
  photo?: string;
  location: string;
  telegram: string;
  email: string;
  bio: LocalizedText;
  education: MemberEducation[];
  experience: MemberExperience[];
  skills: string[];
  results: MemberResult[];
  books: string[];
  hobbies: LocalizedText[];
}

export const members = membersJson as Member[];

export function getMember(slug: string): Member | undefined {
  return members.find((m) => m.slug === slug);
}
