import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import cimaLogo from "@/assets/cima-logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Product" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/demo", label: "Demo" },
  ];

  const isActive = (path: string) => location.pathname === path;

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
      <div className="container-wide">
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
                src={cimaLogo} 
                alt="Cima" 
                className={`h-10 w-auto relative z-10 transition-all duration-300 group-hover:scale-105 ${
                  resolvedTheme === "dark" ? "brightness-0 invert" : ""
                }`}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
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
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-accent text-accent-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              className="p-2 text-foreground transition-colors hover:text-accent-orange"
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
        isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <nav className="bg-background border-b border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-medium py-2 transition-colors ${
                isActive(link.href)
                  ? "text-accent-orange"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/demo" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="hero" className="w-full mt-2">
              Book a Demo
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
