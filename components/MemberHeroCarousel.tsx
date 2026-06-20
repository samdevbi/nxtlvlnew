"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import MemberPhoto from "@/components/MemberPhoto";
import type { Member } from "@/lib/members";

const INTERVAL_MS = 3000;

export default function MemberHeroCarousel({ members }: { members: Member[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const member = members[index];
  if (!member) return null;

  const goTo = useCallback((next: number) => {
    setVisible(false);
    window.setTimeout(() => {
      setIndex(next);
      setVisible(true);
    }, 280);
  }, []);

  useEffect(() => {
    if (members.length <= 1) return;
    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % members.length);
        setVisible(true);
      }, 280);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [members.length]);

  return (
    <section className="border-b border-paper-line pb-10 pt-8 dark:border-navy-line lg:pb-14 lg:pt-12">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className={`flex min-h-[10rem] flex-col justify-center transition-opacity duration-300 lg:min-h-[18rem] ${visible ? "opacity-100" : "opacity-0"}`}>
          <Link href={`/members/${member.slug}`} className="group block">
            <h2 className="font-display text-[2.125rem] leading-[1.12] text-inkc dark:text-paper md:text-5xl lg:text-[3.5rem]">
              <span className="text-gold-ink dark:text-gold-light">{member.name}</span>
              <span className="mt-3 block text-[1.45rem] font-medium leading-snug text-inkc-sub dark:text-paper-line/85 md:text-2xl lg:text-[1.75rem]">
                {member.role}
              </span>
            </h2>
          </Link>
          <div className="mt-8 flex flex-wrap gap-2">
            {members.map((m, i) => (
              <button
                key={m.slug}
                type="button"
                aria-label={m.name}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-gold-ink dark:bg-gold-light" : "w-1.5 bg-paper-line hover:bg-gold/60 dark:bg-navy-line"}`}
              />
            ))}
          </div>
        </div>
        <Link
          href={`/members/${member.slug}`}
          className={`group relative block aspect-[4/5] overflow-hidden bg-navy-deep transition-opacity duration-300 md:aspect-[5/6] lg:aspect-[4/5] ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <MemberPhoto initials={member.initials} photoUrl={member.photo} size="lg" />
        </Link>
      </div>
    </section>
  );
}
