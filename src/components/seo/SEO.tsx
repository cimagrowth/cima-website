import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogType?: "website" | "article";
  ogImage?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  children?: React.ReactNode;
}

const SITE_NAME = "GrowthOS by Cima Growth Solutions";
const DEFAULT_OG_IMAGE = "https://cimagrowth.com/og-image.png";
const SITE_URL = "https://cimagrowth.com";

const SEO = ({
  title,
  description,
  keywords = [],
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  article,
  noindex = false,
  children,
}: SEOProps) => {
  const fullTitle = title.includes("GrowthOS") ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical || (typeof window !== "undefined" ? window.location.href : SITE_URL);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article specific meta */}
      {ogType === "article" && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags?.map((tag, i) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional meta passed as children */}
      {children}
    </Helmet>
  );
};

export default SEO;
