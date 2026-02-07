import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import heroImage from "@/assets/hero-infrastructure.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Zelion infrastructure network"
          className="h-full w-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-2 backdrop-blur-sm"
          >
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Infrastructure-First Energy Validation Network
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="mb-6 font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="metal-gradient">Infrastructure-First</span>
            <br />
            <span className="text-foreground">Energy Validation Network</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Zelion is an infrastructure-first technology initiative focused on real-world energy validation, deterministic processing, and long-term system deployment.
            The network bridges physical energy systems, decentralized infrastructure, and blockchain-based coordination through verifiable data integrity and hardware-level validation mechanisms.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button variant="hero" size="xl">
              Buy $ZLN Token
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="xl">
              Connect Wallet
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8"
          >
            {[
              { value: "500M", label: "Total Supply" },
              { value: "3-Layer", label: "Architecture" },
              { value: "Hardware", label: "Validation" },
              { value: "Long-Term", label: "Infrastructure" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
