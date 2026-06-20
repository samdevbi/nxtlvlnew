import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ActivitiesPageClient from "@/components/ActivitiesPageClient";
import { fetchBooks } from "@/lib/data-server";
import booksFallback from "@/data/books.json";

export const revalidate = 60;

export default async function ActivitiesPage() {
  let books = booksFallback;
  try {
    const data = await fetchBooks();
    if (data) books = data as typeof booksFallback;
  } catch {
    // fallback
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ActivitiesPageClient books={books} />
      <Footer />
    </div>
  );
}
