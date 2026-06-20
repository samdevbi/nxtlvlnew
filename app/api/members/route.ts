import { connectDB } from "@/lib/db/mongoose";
import { Member } from "@/lib/db/models";
import { jsonOk } from "@/lib/api-utils";

export const revalidate = 60;

export async function GET() {
  await connectDB();
  const members = await Member.find().sort({ name: 1 }).lean();
  return jsonOk(
    members.map((m) => ({
      slug: m.slug,
      name: m.name,
      shortName: m.shortName,
      initials: m.initials,
      age: m.age,
      role: m.role,
      photoUrl: m.photoUrl,
      location: m.location,
      telegram: m.telegram,
      email: m.email,
      bio: m.bio,
      education: m.education,
      experience: m.experience,
      skills: m.skills,
      results: m.results,
      books: m.books,
      hobbies: m.hobbies,
    }))
  );
}
