# NXTLVL CLUB — Design Spec (Cursor uchun)

> Bu faylni loyiha root'iga qo'ying. Cursor'ga: "NXTLVL-DESIGN-SPEC.md va design/ papkadagi mockuplarga qarab qur" deb ayting.

## Stack
- HTML + Tailwind CSS (yoki Next.js + Tailwind)
- Mobile-first (390px asos), breakpointlar: `md:768px`, `lg:1280px`
- Light mode default, `dark:` klasslar bilan dark mode (toggle tugma headerда)
- i18n: UZ default, EN qo'shimcha (JSON fayllar: `locales/uz.json`, `locales/en.json`)

## Design tokenlar (tailwind.config)
```js
colors: {
  navy:   { DEFAULT: '#0B1B33', deep: '#081426', card: '#0E2038', line: '#1B3050' },
  gold:   { DEFAULT: '#C9A227', light: '#E8C766', ink: '#9A7B1A' }, // ink = oq fonda matn uchun
  paper:  { DEFAULT: '#F7F6F2', card: '#FFFFFF', line: '#E4E1D6', chip: '#F1EFE7' },
  inkc:   { DEFAULT: '#0B1B33', sub: '#5C6678' },
}
fontFamily: {
  display: ['Italiana', 'serif'],   // sarlavhalar — Google Fonts
  sans: ['Outfit', 'sans-serif'],   // matn va UI — Google Fonts
}
```

## Dizayn qoidalari (muhim!)
1. **Diagonal motiv** — brend belgisi. Kartalarning o'ng-yuqori burchagi diagonal kesilgan:
   `clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)`
2. **Overline pattern** — har section sarlavhasi oldidan: 18px tilla chiziq + UPPERCASE label, `letter-spacing: 3px`, 10px, gold-ink rang.
3. Navy kartalar pastida 2px tilla chiziq (border-bottom).
4. Gradientlar: navy karta `linear-gradient(135deg,#13294A,#081426)`, tilla tugma `linear-gradient(135deg,#E8C766,#C9A227)`.
5. Tugmalar: pill (border-radius: 9999px). Primary = navy fill (dark mode'da gold fill), Gold = gradient, Outline = 1.3px gold border.
6. Display sarlavhalar Italiana, oxirgi so'z/qator ko'pincha gold rangda.
7. Bo'sh joy saqlansin — sectionlar orasi mobile'da ~py-10, desktop'da ~py-16. Hairline (1px paper-line) ajratgichlar.
8. Statistika raqamlari Italiana, katta (36-54px), tepasida 26px tilla tick.
9. Hover: kartalar `translateY(-4px)` + soya, linklar gold'ga o'tadi. Scroll'da fade-up animatsiya (IntersectionObserver yoki AOS).

## Sahifalar (design/ papkadagi PNG raqamlariga mos)
| Fayl | Sahifa | Route |
|------|--------|-------|
| 01,02 (mobile) 10,11 (desktop) | Landing | `/` |
| 03 | Biz haqimizda | `/about` |
| 04, 12 | A'zolar | `/members` |
| 05 | A'zo profili | `/members/[slug]` |
| 06 | Meetinglar | `/meetings` |
| 07, 13 | Meeting sahifasi | `/meetings/[slug]` |
| 08 | Faoliyatlar | `/activities` |
| 09 | Qo'shilish | `/join` |

## Komponentlar
- `Header` — logo, nav (5 link), UZ/EN switch, dark toggle, mobile'da hamburger + slide-in menyu
- `Footer` — har doim navy-deep, 3 ustun (logo+slogan, sahifalar, kontakt), socials
- `Button` (primary/gold/outline/ghost), `SectionLabel` (overline pattern), `CutCard`, `StatBlock`
- `MemberCard`, `MeetingCard`, `Countdown` (keyingi meetingga real countdown), `Timeline` (natijalar uchun, tilla nuqtalar)
- `BookCard`, `Chip`, `PhotoPlaceholder` (foto kelguncha navy gradient + diagonal chiziqlar)

## Ma'lumotlar
Hozircha statik JSON: `data/members.json`, `data/meetings.json`, `data/books.json`.
Join forma: maydonlar (ism, telefon, telegram, kasb, sabab) + 2 tugma: Telegram deep-link (`https://t.me/nxtlvladmin`) va `mailto:club@nxtlvl.uz`. Submit hozircha Telegram botga yoki Formspree'ga.

## Logo
`public/logo.svg` — navy fonda gold, oq fonda navy varianti. (Asl PNG fayllardan foydalaning yoki vektorlashtiring.)
