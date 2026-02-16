import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import cimaLogoLight from "@/assets/cima-logo-light.png";
import cimaLogoDark from "@/assets/cima-logo-dark.png";

type NavLink = {
  href: string;
  label: string;
  isAnchor?: boolean;
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/#how-it-works", label: "How It Works", isAnchor: true },
    { href: "/features", label: "What's Inside" },
    { href: "/#solution", label: "Solution", isAnchor: true },
    { href: "/blog", label: "Blog" },
    { href: "/sign-up", label: "Sign Up" },
  ];

  const isActive = (path: string) => {
    if (path.includes("#")) {
      return location.pathname === "/" && location.hash === path.replace("/", "");
    }
    return location.pathname === path;
  };

  const handleNavClick = (link: NavLink) => {
    setIsMobileMenuOpen(false);
    
    if (link.isAnchor) {
      const hash = link.href.replace("/", "");
      
      if (location.pathname === "/") {
        // Already on homepage, just scroll
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to homepage first, then scroll
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Animated Logo */}
          <Link to="/" className="flex items-center gap-3 group relative">
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
              {/* Glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0.3] }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="absolute inset-0 blur-xl bg-accent-orange/30 rounded-full scale-150"
              />
              <img 
                src={resolvedTheme === "dark" ? cimaLogoDark : cimaLogoLight} 
                alt="Cima" 
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
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    isActive(link.href)
                      ? "text-accent-orange"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    isActive(link.href)
                      ? "text-accent-orange"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-orange rounded-full" />
                  )}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-accent hover:bg-accent/80 text-accent-foreground transition-all duration-300 hover:scale-105"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <Link to="/demo">
              <Button variant="hero" size="default">
                Book a Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button + Theme Toggle */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-accent text-accent-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              className="p-2.5 text-foreground transition-colors hover:text-accent-orange"
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
        <nav className="bg-background border-b border-border px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                className={`text-base font-medium py-3 px-3 rounded-lg transition-colors text-left ${
                  isActive(link.href)
                    ? "text-accent-orange bg-accent-orange/10"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium py-3 px-3 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "text-accent-orange bg-accent-orange/10"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            )
          ))}
          <Link to="/demo" onClick={() => setIsMobileMenuOpen(false)} className="mt-2">
            <Button variant="hero" size="lg" className="w-full text-base">
              Book a Demo
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
