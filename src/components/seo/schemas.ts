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
  logo = `${SITE_URL}/cima-logo.png`,
  description = "AI-powered patient engagement platform for healthcare clinics",
  sameAs = [],
}: OrganizationSchemaProps = {}) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name,
  url,
  logo,
  description,
  sameAs,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: "English",
  },
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
  name,
  url,
  description,
  publisher: generateOrganizationSchema(),
});

export interface SoftwareApplicationSchemaProps {
  name?: string;
  description?: string;
  applicationCategory?: string;
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
  operatingSystem = "Web, iOS, Android",
  image = `${SITE_URL}/og-image.png`,
  offers = { price: "999", priceCurrency: "USD" },
}: SoftwareApplicationSchemaProps = {}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name,
  description,
  applicationCategory,
  operatingSystem,
  image,
  offers: {
    "@type": "Offer",
    price: offers.price,
    priceCurrency: offers.priceCurrency,
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
  provider: generateOrganizationSchema(),
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
    name: author,
    url: SITE_URL,
  },
  publisher: generateOrganizationSchema(),
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
  items: Array<{ name: string; url: string }>;
}

export const generateBreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
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
    name: provider,
  },
  areaServed,
  serviceType,
});

// LocalBusinessSchema removed - not appropriate for SaaS companies without physical locations
// Use Organization and SoftwareApplication schemas instead
