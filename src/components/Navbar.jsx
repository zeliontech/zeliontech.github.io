import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Technology", href: "/technology" },
  { label: "Tokenomics", href: "/tokenomics" },
  { label: "Whitepaper", href: "/whitepaper" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (href) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-3 bg-white/85 backdrop-blur-2xl border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/zeliontech-logo.png"
            className="w-8 h-8 object-contain"
            alt="ZelionTech"
          />
          <span className="font-kanit font-bold text-lg tracking-[0.12em] text-slate-900">
            ZELION
            <span className="text-primary">TECH</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-lg font-kanit font-medium text-xs uppercase tracking-[0.08em] transition ${
                isActive(link.href)
                  ? "text-primary bg-primary/5"
                  : "text-slate-900/60 hover:text-slate-900 hover:bg-primary/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          to="/contact"
          className="hidden lg:inline-flex px-6 py-2.5 rounded-xl font-kanit font-semibold text-xs uppercase tracking-[0.08em] bg-primary/10 border border-primary/25 text-primary hover:bg-primary/15 transition"
        >
          Get Started
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="flex items-center justify-center lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-slate-900" />
          ) : (
            <Menu className="h-6 w-6 text-slate-900" />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-primary/10 bg-white/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-3 font-kanit font-medium text-xs uppercase tracking-[0.08em] transition ${
                    isActive(link.href)
                      ? "text-primary bg-primary/5"
                      : "text-slate-900/60 hover:text-slate-900 hover:bg-primary/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex justify-center px-6 py-2.5 rounded-xl font-kanit font-semibold text-xs uppercase tracking-[0.08em] bg-primary/10 border border-primary/25 text-primary hover:bg-primary/15 transition"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
