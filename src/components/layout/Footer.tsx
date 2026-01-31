import { Link } from "react-router-dom";
import cimaLogo from "@/assets/cima-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", href: "/product" },
      { label: "Pricing", href: "/pricing" },
      { label: "Demo", href: "/demo" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/demo" },
    ],
    resources: [
      { label: "AI Studio", href: "/ai-studio" },
      { label: "Blog", href: "/blog" },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src={cimaLogo} 
                alt="Cima" 
                className="h-9 md:h-10 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-sm md:text-base text-primary-foreground/70 max-w-xs leading-relaxed">
              The all-in-one growth operating system for fertility and regenerative clinics.
            </p>
            <p className="text-sm text-primary-foreground/50 mt-4">
              A product of Cima Growth Solutions
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-base md:text-lg text-primary-foreground mb-4">Product</h4>
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
            <h4 className="font-semibold text-base md:text-lg text-primary-foreground mb-4">Company</h4>
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
            <h4 className="font-semibold text-base md:text-lg text-primary-foreground mb-4">Resources</h4>
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
            <Link to="/privacy" className="text-sm text-primary-foreground/50 hover:text-accent-orange transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-primary-foreground/50 hover:text-accent-orange transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
