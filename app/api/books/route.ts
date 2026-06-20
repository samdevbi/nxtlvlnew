import { connectDB } from "@/lib/db/mongoose";
import { Books } from "@/lib/db/models";
import { jsonOk, jsonError } from "@/lib/api-utils";

export const revalidate = 60;

export async function GET() {
  await connectDB();
  const books = await Books.findOne({ singleton: "default" }).lean();
  if (!books) return jsonError("Not found", 404);
  return jsonOk({
    current: books.current,
    finishedCount: books.finishedCount,
    finished: books.finished,
  });
}
