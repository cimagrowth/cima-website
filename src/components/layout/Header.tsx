'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import cimaLogoLightImg from "@/assets/cima-logo-light.png";

const cimaLogoLight = typeof cimaLogoLightImg === 'string' ? cimaLogoLightImg : cimaLogoLightImg.src;

type NavLink = {
  href: string;
  label: string;
  isAnchor?: boolean;
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Platform" },
    { href: "/patient-acquisition", label: "Solutions" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/features", label: "Features" },
    { href: "/outreach", label: "Outreach Engine" },
    { href: "/ai-agent", label: "AI Agent" },
    { href: "/ads", label: "AI Ads" },
    { href: "/chartai", label: "ChartAI" },
    { href: "/blog", label: "Blog" },
  ];

  const isActive = (path: string) => {
    if (path.includes("#")) {
      return pathname === "/";
    }
    return pathname === path;
  };

  const handleNavClick = (link: NavLink) => {
    setIsMobileMenuOpen(false);

    if (link.isAnchor) {
      const hash = link.href.replace("/", "");

      if (pathname === "/") {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push("/");
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-cream/90 backdrop-blur-md border-b border-sand"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Animated Logo */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1
              }}
              className="relative"
            >
              <img
                src={cimaLogoLight}
                alt="Cima Growth Solutions logo"
                className="h-8 md:h-10 w-auto relative z-10 transition-all duration-300 group-hover:scale-105"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link)}
                  className={`font-ui text-sm font-medium transition-all duration-300 relative ${
                    isActive(link.href)
                      ? "text-teal-deep"
                      : "text-teal-deep/75 hover:text-teal"
                  }`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-ui text-sm font-medium transition-all duration-300 relative ${
                    isActive(link.href)
                      ? "text-teal-deep"
                      : "text-teal-deep/75 hover:text-teal"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-clay rounded-full" />
                  )}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sign-up"
              className="font-ui text-sm font-medium text-teal-deep/75 hover:text-teal transition-colors"
            >
              Get Started
            </Link>
            <Link href="/demo">
              <Button variant="hero" size="default">
                Book a Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1">
            <button
              className="p-2.5 text-teal-deep transition-colors hover:text-teal"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <nav className="bg-cream border-b border-sand px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                className={`font-ui text-base font-medium py-3 px-3 rounded-lg transition-colors text-left ${
                  isActive(link.href)
                    ? "text-teal-deep bg-sand/50"
                    : "text-teal-deep hover:bg-sand/30"
                }`}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-ui text-base font-medium py-3 px-3 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "text-teal-deep bg-sand/50"
                    : "text-teal-deep hover:bg-sand/30"
                }`}
              >
                {link.label}
              </Link>
            )
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="hero" size="lg" className="w-full text-base">
                Book a Demo
              </Button>
            </Link>
            <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="hero-outline" size="lg" className="w-full text-base">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
