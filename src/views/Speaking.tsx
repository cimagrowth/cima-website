import Image from "next/image";
import Link from "next/link";
import { BTN_OUTLINE, BTN_PRIMARY, Eyebrow, H2, SectionHead, WRAP } from "@/components/map/ui";
import SpeakerInquiryForm from "@/components/speaking/SpeakerInquiryForm";
import CopyBioButton from "@/components/speaking/CopyBioButton";
import { brandonProfile } from "@/content/social";
import {
  APPEARANCES,
  FORMATS,
  FORMATS_NOTE,
  PANEL_TOPICS,
  SPEAKER,
  TALKS,
  type Appearance,
} from "@/content/speaking";

const CARD =
  "rounded-2xl border border-[#E3E7ED] bg-white p-6 shadow-soft md:p-8 dark:border-white/10 dark:bg-white/5";
const CHIP =
  "inline-flex items-center rounded-full bg-mist px-3 py-1 text-sm font-semibold text-teal dark:bg-white/10 dark:text-white";
const BODY = "text-base leading-relaxed text-teal-deep/80 dark:text-white/80";
const HEAD_DARK = "dark:[&_h2]:text-white dark:[&_p]:text-white/80";
const OUTLINE = `${BTN_OUTLINE} dark:border-white/60 dark:text-white dark:hover:bg-white/10`;

function AppearanceRow({ a }: { a: Appearance }) {
  return (
    <li className="grid gap-1 border-t border-[#E3E7ED] py-5 first:border-t-0 md:grid-cols-12 md:gap-6 dark:border-white/10">
      <p className="text-sm font-bold uppercase tracking-[0.08em] text-teal md:col-span-3 dark:text-clay-soft">
        {a.dateLabel}
      </p>
      <div className="flex flex-col gap-1 md:col-span-9">
        <p className="text-lg font-semibold text-teal-deep dark:text-white">
          {a.url ? (
            <a href={a.url} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-teal">
              {a.event}
            </a>
          ) : (
            a.event
          )}
        </p>
        <p className={BODY}>
          {a.role}
          {a.place ? ` · ${a.place}` : ""}
        </p>
      </div>
    </li>
  );
}

function AppearanceGroup({ title, items }: { title: string; items: Appearance[] }) {
  if (items.length === 0) return null;
  return (
    <div className={CARD}>
      <h3 className="mb-2 font-display text-2xl font-semibold text-teal-deep dark:text-white">{title}</h3>
      <ul>
        {items.map((a) => (
          <AppearanceRow key={`${a.date}-${a.event}`} a={a} />
        ))}
      </ul>
    </div>
  );
}

export default function SpeakingView() {
  const today = new Date().toISOString().slice(0, 10);
  const linkedin = brandonProfile("linkedin");
  // APPEARANCES is newest first; upcoming reads soonest first.
  const upcoming = APPEARANCES.filter((a) => a.date >= today).reverse();
  const past = APPEARANCES.filter((a) => a.date < today);

  // bg-background follows the theme, like the Contact page.
  return (
    <div className="bg-background">
      {/* Hero */}
      <section id="top" aria-labelledby="speaking-title" className="scroll-mt-24 pb-16 pt-6 md:pb-24 md:pt-10">
        <div className={`${WRAP} grid items-center gap-10 md:grid-cols-12`}>
          <div className="relative aspect-[2000/1599] w-full overflow-hidden rounded-2xl bg-sand md:col-span-5">
            <Image
              src={SPEAKER.headshot}
              alt={SPEAKER.headshotAlt}
              fill
              priority
              sizes="(min-width: 1200px) 480px, (min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-5 md:col-span-7">
            <Eyebrow as="p" className="dark:text-clay-soft">
              Speaking
            </Eyebrow>
            <h1
              id="speaking-title"
              className="font-display text-[clamp(38px,5vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em] text-teal-deep dark:text-white"
            >
              {SPEAKER.name}
            </h1>
            <p className="text-lg font-semibold text-teal dark:text-clay-soft">{SPEAKER.title}</p>
            <p className="text-lg leading-relaxed text-teal-deep/80 dark:text-white/85">{SPEAKER.oneLiner}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#invite" className={BTN_PRIMARY}>
                Invite Brandon to speak
              </a>
              <a href={SPEAKER.headshot} download className={OUTLINE}>
                Download headshot
              </a>
            </div>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-teal-deep/70 dark:text-white/70">
              <span>{SPEAKER.languagesNote}</span>
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-[48px] items-center font-semibold text-teal underline underline-offset-2 dark:text-clay-soft"
              >
                Brandon on LinkedIn
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Talks */}
      <section id="talks" aria-labelledby="talks-title" className="scroll-mt-24 bg-clay-wash py-20 md:py-24 dark:bg-white/[0.03]">
        <div className={`${WRAP} flex flex-col gap-12`}>
          <div className={HEAD_DARK}>
            <SectionHead eyebrow="Talks" titleId="talks-title" title="What Brandon speaks about" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {TALKS.map((t) => (
              <article key={t.id} id={`talk-${t.id}`} className={`${CARD} flex flex-col gap-4`}>
                <span className={`${CHIP} self-start`}>{t.vertical}</span>
                <h3 className="font-display text-2xl font-semibold leading-tight text-teal-deep dark:text-white">{t.title}</h3>
                <p className="text-sm font-semibold text-teal dark:text-clay-soft">{t.formats}</p>
                <p className={BODY}>{t.summary}</p>
                <ul className="flex list-disc flex-col gap-1.5 pl-5 text-base text-teal-deep/80 marker:text-teal dark:text-white/80">
                  {t.takeaways.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
                <Link
                  href={`/speaking?topic=${t.id}#invite`}
                  className="mt-auto inline-flex min-h-[48px] items-center self-start pt-2 font-semibold text-teal underline underline-offset-2 hover:text-teal-deep dark:text-clay-soft"
                >
                  Ask for this talk
                </Link>
              </article>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-teal-deep dark:text-white">Also available for panels on:</p>
            <ul className="flex flex-wrap gap-2">
              {PANEL_TOPICS.map((p) => (
                <li key={p} className={CHIP}>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Appearances */}
      {(upcoming.length > 0 || past.length > 0) && (
        <section id="appearances" aria-labelledby="appearances-title" className="scroll-mt-24 py-20 md:py-24">
          <div className={`${WRAP} flex flex-col gap-10`}>
            <div className={HEAD_DARK}>
              <SectionHead eyebrow="Appearances" titleId="appearances-title" title="Where Brandon is speaking" />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <AppearanceGroup title="Upcoming" items={upcoming} />
              <AppearanceGroup title="Past" items={past} />
            </div>
          </div>
        </section>
      )}

      {/* Formats */}
      <section id="formats" aria-labelledby="formats-title" className="scroll-mt-24 pb-20 md:pb-24">
        <div className={`${WRAP} flex flex-col gap-5`}>
          <Eyebrow as="p" className="dark:text-clay-soft">
            Formats
          </Eyebrow>
          <h2 id="formats-title" className="sr-only">
            Formats
          </h2>
          <ul className="flex flex-wrap gap-2">
            {FORMATS.map((f) => (
              <li key={f} className={CHIP}>
                {f}
              </li>
            ))}
          </ul>
          <p className={BODY}>{FORMATS_NOTE}</p>
        </div>
      </section>

      {/* Bios */}
      <section id="bio" aria-labelledby="bio-title" className="scroll-mt-24 bg-clay-wash py-20 md:py-24 dark:bg-white/[0.03]">
        <div className={`${WRAP} flex flex-col gap-12`}>
          <div className={HEAD_DARK}>
            <SectionHead
              eyebrow="For organizers"
              titleId="bio-title"
              title="Bios and headshot"
              side="Copy a bio for your program, website or show notes."
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className={`${CARD} flex flex-col gap-4 lg:col-span-4`}>
              <h3 className="font-display text-xl font-semibold text-teal-deep dark:text-white">Short bio</h3>
              <p id="bio-short" className={BODY}>
                {SPEAKER.shortBio}
              </p>
              <div className="mt-auto pt-2">
                <CopyBioButton text={SPEAKER.shortBio} targetId="bio-short" label="Copy short bio" />
              </div>
            </div>
            <div className={`${CARD} flex flex-col gap-4 lg:col-span-5`}>
              <h3 className="font-display text-xl font-semibold text-teal-deep dark:text-white">Long bio</h3>
              <p id="bio-long" className={BODY}>
                {SPEAKER.longBio}
              </p>
              <div className="mt-auto pt-2">
                <CopyBioButton text={SPEAKER.longBio} targetId="bio-long" label="Copy long bio" />
              </div>
            </div>
            <div className={`${CARD} flex flex-col gap-4 lg:col-span-3`}>
              <h3 className="font-display text-xl font-semibold text-teal-deep dark:text-white">Headshot</h3>
              <div className="relative aspect-[2000/1599] w-full overflow-hidden rounded-xl bg-sand">
                <Image
                  src={SPEAKER.headshot}
                  alt={SPEAKER.headshotAlt}
                  fill
                  sizes="(min-width: 1024px) 260px, 100vw"
                  className="object-cover"
                />
              </div>
              <a href={SPEAKER.headshot} download className={`${OUTLINE} mt-auto text-center`}>
                Download headshot (JPG, 2000 x 1599)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Invite */}
      <section id="invite" aria-labelledby="invite-title" className="scroll-mt-24 py-20 md:py-24">
        <div className="mx-auto w-full max-w-[720px] px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-4">
            <H2 id="invite-title" className="text-teal-deep dark:text-white">
              Invite Brandon
            </H2>
            <p className="text-lg leading-relaxed text-teal-deep/80 dark:text-white/85">
              Conferences, podcasts, webinars and internal team sessions. Brandon reads every inquiry and replies
              within two business days.
            </p>
          </div>
          <SpeakerInquiryForm />
          <p className="mt-8 text-base text-teal-deep/80 dark:text-white/80">
            Prefer email?{" "}
            <a href={`mailto:${SPEAKER.email}`} className="font-semibold text-teal underline underline-offset-2 dark:text-clay-soft">
              {SPEAKER.email}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
