import { brandonProfile } from "@/content/social";
import { WRAP } from "@/components/map/ui";

// No headshot of Brandon exists in public/ yet, so the photo frame is a
// labelled placeholder until one is added.
const FounderLetter = () => {
  const linkedin = brandonProfile("linkedin");
  const youtube = brandonProfile("youtube");
  return (
    <section aria-labelledby="founder-title" className="pb-10 pt-20 md:pt-24">
      <div className={`${WRAP} grid items-center gap-8 md:grid-cols-12 md:gap-10`}>
        <div
          role="img"
          aria-label="Photo of Brandon Hensinger (placeholder)"
          className="flex aspect-square w-40 items-center justify-center rounded-[22px] bg-sand text-sm text-teal-deep/75 md:col-span-3 md:w-auto"
        >
          [BRANDON PHOTO]
        </div>
        <figure className="flex flex-col gap-4 md:col-span-9">
          <h2 id="founder-title" className="text-sm font-bold uppercase tracking-[0.1em] text-clay-ink">
            Why I built this
          </h2>
          <blockquote className="font-display text-[clamp(22px,2.6vw,30px)] font-normal leading-[1.35] text-teal-deep">
            <p>
              &ldquo;AI transformed the lab side of fertility medicine. Nobody modernized the front end.
              After 15 years in this industry, I watched clinics spend real money to find patients and
              then lose them in the gaps between one stage and the next. The Map is how we close every
              one of those gaps.&rdquo;
            </p>
          </blockquote>
          <figcaption className="flex flex-col gap-1.5 text-base">
            <span>
              <span className="font-bold">Brandon Hensinger</span>{" "}
              <span className="text-teal-deep/75">· Founder, Cima Growth Solutions</span>
            </span>
            <span className="flex gap-4 text-sm">
              <a href={linkedin.url} target="_blank" rel="noopener" className="font-semibold text-teal underline underline-offset-2">
                LinkedIn
              </a>
              <a href={youtube.url} target="_blank" rel="noopener" className="font-semibold text-teal underline underline-offset-2">
                YouTube
              </a>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default FounderLetter;
