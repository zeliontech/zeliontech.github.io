import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";

// Navigation follows the approved design reference: black wordmark on white,
// centred links with an azure underline on the active item, and a single
// solid pill call to action on the right.
const navLinks = [
  { label: "Home", href: "/" },
  { label: "ZEV", href: "/zev" },
  { label: "ZLN Token", href: "/tokenomics" },
  { label: "Carbon Credits", href: "/carbon" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // The bar sits flush on white at the top of the page and gains a hairline
  // rule once the page moves, so the hero reads as one uninterrupted field.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the phone menu, as any disclosure should.
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const isActive = (href) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 bg-background transition-shadow duration-300 ${
        scrolled ? "border-b border-border" : "border-b border-transparent"
      }`}
    >
      {/* Keyboard users can jump past the navigation; visible only on focus. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-[14px] focus:font-semibold focus:text-background"
      >
        Skip to content
      </a>
      <div className="container mx-auto flex h-20 items-center px-4 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="ZelionTech home">
          <img src="/logo.svg" alt="" className="h-8 w-8" width="32" height="32" />
          <span className="font-body text-[22px] font-bold tracking-[-0.03em] text-foreground">
            ZelionTech
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`group relative py-1 text-[15px] font-medium transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-0 right-0 h-0.5 origin-left rounded-full transition-transform duration-300 ease-out motion-reduce:transition-none ${
                    active ? "scale-x-100 bg-primary" : "scale-x-0 bg-foreground/30 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 lg:flex-none">
          <Button asChild size="default" className="hidden sm:inline-flex">
            <Link to="/contact">
              Talk to us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — CSS grid-rows transition keeps framer-motion out of the
          critical navbar chunk. */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden bg-background transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          mobileOpen ? "grid-rows-[1fr] border-b border-border opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-1 px-4 pb-5 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-3 w-full">
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                Talk to us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
