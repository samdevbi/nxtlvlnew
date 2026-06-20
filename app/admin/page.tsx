import Link from "next/link";
import { connectDB } from "@/lib/db/mongoose";
import { Member, Meeting, Application } from "@/lib/db/models";

export default async function AdminDashboard() {
  await connectDB();
  const [members, meetings, newApps] = await Promise.all([
    Member.countDocuments(),
    Meeting.countDocuments(),
    Application.countDocuments({ status: "new" }),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl text-gold-light sm:text-3xl">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-navy-line bg-navy-card p-4 sm:p-6">
          <p className="text-3xl font-bold">{members}</p>
          <p className="mt-1 text-sm text-paper-line">A&apos;zolar</p>
          <Link href="/admin/members" className="mt-3 inline-block text-xs text-gold-light hover:underline">
            Boshqarish →
          </Link>
        </div>
        <div className="rounded-xl border border-navy-line bg-navy-card p-4 sm:p-6">
          <p className="text-3xl font-bold">{meetings}</p>
          <p className="mt-1 text-sm text-paper-line">Uchrashuvlar</p>
          <Link href="/admin/meetings" className="mt-3 inline-block text-xs text-gold-light hover:underline">
            Boshqarish →
          </Link>
        </div>
        <div className="rounded-xl border border-navy-line bg-navy-card p-4 sm:p-6">
          <p className="text-3xl font-bold">{newApps}</p>
          <p className="mt-1 text-sm text-paper-line">Yangi arizalar</p>
          <Link href="/admin/applications" className="mt-3 inline-block text-xs text-gold-light hover:underline">
            Ko&apos;rish →
          </Link>
        </div>
      </div>
    </div>
  );
}
