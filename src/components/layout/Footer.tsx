import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram, Facebook, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import cimaLogoDark from "@/assets/cima-logo-dark.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Features", href: "/features" },
      { label: "Outreach Engine", href: "/outreach" },
      { label: "Demo", href: "/demo" },
    ],
    company: [
      { label: "Contact Us", href: "/demo" },
      { label: "Blog", href: "/blog" },
    ],
    resources: [
      { label: "Pricing", href: "/sign-up" },
      { label: "Product Overview", href: "/product" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <>
      {/* Pre-footer CTA */}
      <section className="bg-accent-orange py-14 md:py-20">
        <div className="container-wide text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to stop losing patients?
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto mb-8">
            Every day without GrowthOS is another day of leads going cold. See the platform or
            start today.
          </p>
          <div className="flex justify-center">
            <Link to="/demo">
              <Button
                size="lg"
                className="bg-white text-accent-orange hover:bg-white/90 font-semibold group"
              >
                Book a Demo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground">
        <div className="container-wide px-4 md:px-6 py-10 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <img
                  src={cimaLogoDark}
                  alt="Cima Growth Solutions logo"
                  className="h-9 md:h-10 w-auto"
                />
              </Link>
              <p className="text-sm md:text-base text-primary-foreground/70 max-w-xs leading-relaxed">
                The AI-powered growth operating system for healthcare clinics.
              </p>

              {/* Social Links */}
              <div className="flex gap-3 mt-5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent-orange hover:text-white transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-base md:text-lg text-primary-foreground mb-4">
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm md:text-base text-primary-foreground/70 hover:text-accent-orange transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-base md:text-lg text-primary-foreground mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm md:text-base text-primary-foreground/70 hover:text-accent-orange transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-semibold text-base md:text-lg text-primary-foreground mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm md:text-base text-primary-foreground/70 hover:text-accent-orange transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="h-px bg-primary-foreground/10 mt-10 md:mt-12 mb-6 md:mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/50 text-center md:text-left">
              © {currentYear} Cima Growth Solutions. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-sm text-primary-foreground/50 hover:text-accent-orange transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-primary-foreground/50 hover:text-accent-orange transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/refund-policy"
                className="text-sm text-primary-foreground/50 hover:text-accent-orange transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
