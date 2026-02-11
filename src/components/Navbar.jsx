import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NotifyModal from "@/components/NotifyModal";

const navLinks = [
  { label: "Technology", href: "/technology" },
  { label: "Tokenomics", href: "/tokenomics" },
  { label: "How to Buy", href: "/how-to-buy" },
  { label: "Whitepaper", href: "/whitepaper" },
  { label: "Get Notified", href: "/notify" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to notify section
  const handleGetNotified = () => {
    setMobileOpen(false);
    
    // If not on home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/#notify-launch");
      return;
    }
    
    // If on home page, scroll to section
    const notifySection = document.getElementById("notify-launch");
    if (notifySection) {
      notifySection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Open notify modal
  const handleOpenModal = () => {
    setMobileOpen(false);
    setNotifyModalOpen(true);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white p-1">
            <img src="/logo.svg" alt="Zelion Logo" className="h-full w-full text-silver-light" />
          </div>
          <span className="font-heading text-lg font-semibold tracking-wider text-foreground">
            ZelionTech
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-silver-light"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button onClick={handleOpenModal} variant="wallet" size="sm">
            Get Notified
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? "bg-muted text-silver-light"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4">
                <Button onClick={handleOpenModal} variant="wallet" className="w-full">
                  Get Notified
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notify Modal */}
      <NotifyModal open={notifyModalOpen} onOpenChange={setNotifyModalOpen} />
    </nav>
  );
};

export default Navbar;
