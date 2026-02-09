import Layout from "@/components/layout/Layout";
import SEO from "@/components/seo/SEO";

const AdsAccess = () => {
  return (
    <Layout>
      <SEO
        title="Ads Access"
        description="Grant Cima Growth Solutions access to your ad accounts securely."
        noindex
      />
      <section className="py-8 md:py-12">
        <div className="container-wide px-4 md:px-6">
          <iframe
            src="https://app.leadsie.com/embed/connect/cima/view"
            scrolling="auto"
            width="100%"
            height="1000px"
            style={{ border: 0 }}
            title="Ads Access"
          />
        </div>
      </section>
    </Layout>
  );
};

export default AdsAccess;
