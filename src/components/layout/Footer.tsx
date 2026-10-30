import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import cimaLogoDarkImg from "@/assets/cima-logo-dark.png";
import { IOS_APP_STORE_URL } from "@/content/apps";
import { BRANDON_SOCIAL, CIMA_SOCIAL, type SocialProfile } from "@/content/social";
import {
  FIRST_REPLY_SOURCE_SHORT,
  FORMS_CONNECT_LINE,
  firstReplyCommitment,
  getGrowthosMap,
  getPlatformStats,
  stageHref,
} from "@/lib/growthos-map";
import { specializeMap } from "@/lib/specialty-map";
import { SPECIALTIES } from "@/content/specialty";
import BySpecialty from "@/components/specialty/BySpecialty";
import SocialIcon from "./SocialIcon";
import CookiePreferencesButton from "./CookiePreferencesButton";
import RouteClosingBand from "./RouteClosingBand";

const cimaLogoDark = typeof cimaLogoDarkImg === 'string' ? cimaLogoDarkImg : cimaLogoDarkImg.src;

type FooterLink = { label: ReactNode; href: string; external?: boolean };

const platformLinks: FooterLink[] = [
  { label: "Platform overview", href: "/product" },
  { label: "Features", href: "/product#features" },
  { label: "AI front desk", href: "/ai-agent" },
  { label: "Ads Manager", href: "/ads" },
  { label: "ChartAI", href: "/chartai" },
  { label: "Consent and education", href: "/consent" },
  { label: "Keep", href: "/keep" },
  { label: "Training", href: "/training" },
  { label: "Privacy-safe tracking", href: "/hipaa-safe-tracking" },
];

const specialtyLinks: FooterLink[] = [
  { label: "Fertility & IVF", href: "/fertility-clinic-marketing" },
  { label: "Med spa & aesthetics", href: "/med-spa-marketing" },
  { label: "Regenerative medicine", href: "/regenerative-medicine-marketing" },
  { label: "Wellness & hormone", href: "/wellness-marketing" },
  { label: "Medical practice", href: "/medical-practice-marketing" },
  { label: "Patient acquisition", href: "/patient-acquisition" },
  { label: "Healthcare CRM", href: "/healthcare-crm" },
  { label: "Patient engagement platform", href: "/patient-engagement-platform" },
];

const companyLinks: FooterLink[] = [
  { label: "Research", href: "/map#sources" },
  { label: "Blog", href: "/blog" },
  { label: "Speaking", href: "/speaking" },
  { label: "GrowthOS app for iPhone", href: IOS_APP_STORE_URL, external: true },
  { label: "Get your Leak Map", href: "/growth" },
  { label: "Book a demo", href: "/demo" },
];

const linkClass = "text-sm md:text-base text-primary-foreground/75 hover:text-sand transition-colors";

function LinkColumn({ title, links, titleHref }: { title: string; links: FooterLink[]; titleHref?: string }) {
  return (
    <div>
      <h2 className="font-semibold text-base md:text-lg text-primary-foreground mb-4">
        {titleHref ? (
          <Link href={titleHref} className="hover:text-sand transition-colors">
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href + (typeof link.label === "string" ? link.label : "")}>
            {link.external ? (
              <a href={link.href} target="_blank" rel="noopener" className={linkClass}>
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLinks({ profiles, size }: { profiles: SocialProfile[]; size: "lg" | "sm" }) {
  const box = size === "lg" ? "w-10 h-10" : "w-9 h-9";
  const icon = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <ul className="flex flex-wrap gap-2">
      {profiles.map((p) => (
        <li key={p.url}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener"
            aria-label={p.label}
            className={`${box} rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-clay-deep transition-colors`}
          >
            <SocialIcon network={p.network} className={icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}

const Footer = async () => {
  const [map, stats] = await Promise.all([getGrowthosMap(), getPlatformStats()]);
  const currentYear = new Date().getFullYear();
  // Stage names follow the visitor's specialty (stage 7 is named per specialty).
  const specialized = SPECIALTIES.map(({ key }) => [key, specializeMap(map, key)] as const);
  const stageLabel = (i: number): ReactNode => {
    const names = Object.fromEntries(specialized.map(([key, m]) => [key, m.stages[i].name]));
    return new Set(Object.values(names)).size === 1 ? names.fertility : <BySpecialty fertility={names.fertility} {...names} />;
  };
  const mapLinks: FooterLink[] = [
    ...map.stages.map((s, i) => ({ label: stageLabel(i), href: stageHref(s.stage_key) })),
    { label: "Measure", href: "/map#measure" },
  ];
  const half = Math.ceil(mapLinks.length / 2);

  return (
    <>
      {/* Pre-footer CTA: teal anchor block. /training shows its own, without the stat. */}
      <RouteClosingBand
        shared={
          <section className="bg-teal py-[clamp(80px,10vw,140px)]">
            <div className="container-wide text-center">
              <h2 className="font-display font-semibold tracking-tight text-[clamp(28px,4vw,48px)] leading-[1.15] text-paper max-w-3xl mx-auto mb-5">
                When your clinic gets busy, GrowthOS keeps every patient hearing from you.
              </h2>
              <p className="text-base md:text-lg text-paper/85 max-w-xl mx-auto mb-2">
                {firstReplyCommitment(stats)}
              </p>
              <p className="text-xs text-paper/70 max-w-xl mx-auto mb-4">{FIRST_REPLY_SOURCE_SHORT}</p>
              <p className="text-base md:text-lg text-paper/85 max-w-xl mx-auto mb-10">{FORMS_CONNECT_LINE}</p>
              <div className="flex justify-center">
                <Link
                  href="/demo"
                  className="group inline-flex h-12 items-center rounded-btn bg-clay-deep px-7 text-base font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  Book a demo
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        }
        training={
          <section className="bg-teal py-[clamp(80px,10vw,140px)]">
            <div className="container-wide text-center">
              <h2 className="font-display font-semibold tracking-tight text-[clamp(28px,4vw,48px)] leading-[1.15] text-paper max-w-3xl mx-auto mb-10">
                Train once. Every new hire handles patients your way.
              </h2>
              <div className="flex justify-center">
                <Link
                  href="/demo"
                  className="group inline-flex h-12 items-center rounded-btn bg-clay-deep px-7 text-base font-semibold text-white transition-colors hover:bg-orange-600"
                >
                  Book a demo
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        }
      />

      <footer className="bg-primary text-primary-foreground">
        <div className="container-wide px-4 md:px-6 py-10 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-10">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <img src={cimaLogoDark} alt="Cima Growth Solutions logo" className="h-9 md:h-10 w-auto" />
              </Link>
              <p className="text-sm md:text-base text-primary-foreground/75 max-w-xs leading-relaxed">
                GrowthOS automates everything that happens to a patient outside the lab.
              </p>
              <p className="mt-3 text-sm text-primary-foreground/75 max-w-xs leading-relaxed">
                GrowthOS is subscription software from Cima Growth Solutions, LLC. Clinics operate their own accounts and message only their own patients and inquirers.
              </p>
              <div className="mt-5">
                <SocialLinks profiles={CIMA_SOCIAL} size="lg" />
              </div>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary-foreground/75 mb-2">
                  Follow Brandon
                </p>
                <SocialLinks profiles={BRANDON_SOCIAL} size="sm" />
              </div>
            </div>

            <LinkColumn title="The Map" titleHref="/map" links={mapLinks.slice(0, half)} />
            <div className="lg:pt-11">
              <ul className="space-y-3">
                {mapLinks.slice(half).map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <LinkColumn title="Platform" links={platformLinks} />
            <LinkColumn title="Specialties" links={specialtyLinks} />
            <LinkColumn title="Company" links={companyLinks} />
          </div>

          {/* Bottom bar */}
          <div className="h-px bg-primary-foreground/10 mt-10 md:mt-12 mb-6 md:mb-8" />
          <p className="text-sm text-primary-foreground/70 text-center md:text-left mb-4">
            Cima Growth Solutions, LLC · 3467 Trexler Blvd, Allentown, PA 18104 ·{" "}
            <a href="mailto:support@cimagrowth.com" className="hover:text-sand transition-colors">support@cimagrowth.com</a> ·{" "}
            <a href="tel:+14844809296" className="hover:text-sand transition-colors">+1-484-480-9296</a>
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/70 text-center md:text-left">
              &copy; {currentYear} Cima Growth Solutions, LLC. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/privacy" className="text-sm text-primary-foreground/70 hover:text-sand transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-primary-foreground/70 hover:text-sand transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund-policy" className="text-sm text-primary-foreground/70 hover:text-sand transition-colors">
                Refund Policy
              </Link>
              <CookiePreferencesButton className="text-sm text-primary-foreground/70 hover:text-sand transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
