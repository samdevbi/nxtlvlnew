import { connectDB } from "@/lib/db/mongoose";
import { Member } from "@/lib/db/models";
import { jsonOk, jsonError } from "@/lib/api-utils";

export const revalidate = 60;

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  await connectDB();
  const member = await Member.findOne({ slug: params.slug }).lean();
  if (!member) return jsonError("Not found", 404);
  return jsonOk({
    slug: member.slug,
    name: member.name,
    shortName: member.shortName,
    initials: member.initials,
    age: member.age,
    role: member.role,
    photoUrl: member.photoUrl,
    location: member.location,
    telegram: member.telegram,
    email: member.email,
    bio: member.bio,
    education: member.education,
    experience: member.experience,
    skills: member.skills,
    results: member.results,
    books: member.books,
    hobbies: member.hobbies,
  });
}
