// JSON-LD Schema generators for SEO

const SITE_URL = "https://cimagrowth.com";
const COMPANY_NAME = "Cima Growth Solutions";
const PRODUCT_NAME = "GrowthOS";

export interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

export const generateOrganizationSchema = ({
  name = COMPANY_NAME,
  url = SITE_URL,
  logo = `${SITE_URL}/og-image.png`,
  description = "AI-powered patient engagement and marketing automation platform for fertility clinics, med spas, and regenerative medicine practices.",
  sameAs = [],
}: OrganizationSchemaProps = {}) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name,
  url,
  logo: {
    "@type": "ImageObject",
    url: logo,
  },
  description,
  sameAs,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "support@cimagrowth.com",
    availableLanguage: "English",
  },
  areaServed: "United States",
  knowsAbout: [
    "Patient Engagement",
    "Healthcare Marketing Automation",
    "Fertility Clinic Marketing",
    "Regenerative Medicine Marketing",
    "HIPAA Compliant CRM",
  ],
});

export interface WebsiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
}

export const generateWebsiteSchema = ({
  name = `${PRODUCT_NAME} by ${COMPANY_NAME}`,
  url = SITE_URL,
  description = "AI-powered patient engagement and lead nurturing platform for fertility clinics, med spas, wellness centers, and regenerative medicine clinics.",
}: WebsiteSchemaProps = {}) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name,
  url,
  description,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
});

export interface SoftwareApplicationSchemaProps {
  name?: string;
  description?: string;
  applicationCategory?: string;
  applicationSubCategory?: string;
  operatingSystem?: string;
  image?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

export const generateSoftwareSchema = ({
  name = PRODUCT_NAME,
  description = "AI-powered patient engagement platform that responds instantly across every channel—web, phone, text, email, WhatsApp, and social media—then nurtures leads until your team steps in.",
  applicationCategory = "BusinessApplication",
  applicationSubCategory = "Healthcare Marketing Automation",
  operatingSystem = "Web, iOS, Android",
  image = `${SITE_URL}/og-image.png`,
  offers = { price: "999", priceCurrency: "USD" },
}: SoftwareApplicationSchemaProps = {}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#application`,
  name,
  description,
  applicationCategory,
  applicationSubCategory,
  operatingSystem,
  image,
  offers: {
    "@type": "Offer",
    price: offers.price,
    priceCurrency: offers.priceCurrency,
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
  provider: {
    "@id": `${SITE_URL}/#organization`,
  },
  featureList: [
    "AI-Powered Instant Response",
    "Multi-Channel Patient Communication",
    "Automated Lead Nurturing",
    "Unified Inbox",
    "Pipeline Management",
    "Reactivation Campaigns",
    "HIPAA Compliant",
  ],
});

export interface ArticleSchemaProps {
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  url: string;
  keywords?: string[];
}

export const generateArticleSchema = ({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = COMPANY_NAME,
  url,
  keywords = [],
}: ArticleSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  description,
  image: image || `${SITE_URL}/og-image.png`,
  datePublished,
  dateModified: dateModified || datePublished,
  author: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: author,
    url: SITE_URL,
  },
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
  },
  keywords: keywords.join(", "),
});

export interface FAQSchemaProps {
  questions: Array<{ question: string; answer: string }>;
}

export const generateFAQSchema = ({ questions }: FAQSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url?: string }>;
}

export const generateBreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => {
    const isLast = index === items.length - 1;
    const entry: Record<string, unknown> = {
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
    };
    // Last item should NOT include "item" URL per spec
    if (!isLast && item.url) {
      entry.item = item.url;
    }
    return entry;
  }),
});

export interface ServiceSchemaProps {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string;
  serviceType?: string;
}

export const generateServiceSchema = ({
  name,
  description,
  provider = COMPANY_NAME,
  areaServed = "United States",
  serviceType = "Healthcare Technology",
}: ServiceSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  provider: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: provider,
  },
  areaServed,
  serviceType,
  audience: {
    "@type": "Audience",
    audienceType: "Fertility Clinics and Reproductive Medicine Practices",
  },
});
