// JSON-LD builder for the solution landing pages.
// All url / @id values resolve to the non-www apex domain.

const SITE_URL = "https://cimagrowth.com";

export interface SolutionSchemaInput {
  slug: string;
  name: string;
  description: string;
  faqs: Array<{ question: string; answer: string }>;
}

export function buildSolutionSchema({
  slug,
  name,
  description,
  faqs,
}: SolutionSchemaInput): Array<Record<string, unknown>> {
  const url = `${SITE_URL}/${slug}`;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return [webPage, faqPage];
}
