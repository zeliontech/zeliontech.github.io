import { motion } from "framer-motion";
import { Cpu, Wifi, ShieldCheck, Thermometer } from "lucide-react";

const specs = [
  { icon: Cpu, label: "Industrial Grade", detail: "Energy validation" },
  { icon: Wifi, label: "Connectivity", detail: "Infrastructure edge" },
  { icon: ShieldCheck, label: "Tamper Resistant", detail: "Integrity checks" },
  { icon: Thermometer, label: "Data Capture", detail: "Real-world data" },
];

const HardwareSection = () => {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="section-divider mb-24" />
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass-card relative aspect-square overflow-hidden p-8 lg:p-12">
              <div className="grid-pattern absolute inset-0 opacity-30" />
              <div className="relative flex h-full flex-col items-center justify-center">
                <div className="relative">
                  {/* Device visual */}
                  <div className="h-48 w-64 rounded-lg border border-border bg-gradient-to-b from-silver-light/10 to-silver-dark/5 shadow-lg lg:h-56 lg:w-72">
                    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-muted">
                        <Cpu className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-center">
                        <div className="font-heading text-sm font-semibold text-foreground">
                          Hardware Validator
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Infrastructure Validation
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 animate-pulse-glow rounded-full bg-primary" />
                        <span className="text-[10px] font-medium text-primary uppercase tracking-wider">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute -inset-4 -z-10 rounded-xl bg-primary/5 blur-2xl" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-primary uppercase">
              Hardware Validators
            </span>
            <h2 className="mb-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Validation
              <br />
              <span className="metal-gradient">at the Source</span>
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground lg:text-base">
              Zelion integrates hardware-based validators designed to capture real-world energy-related data, perform local integrity verification, and prevent manipulation before data enters digital systems.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground lg:text-base">
              By validating data at the physical source, Zelion reduces attack surfaces and improves data reliability across infrastructure systems.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {specs.map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="glass-card p-4"
                >
                  <spec.icon className="mb-2 h-5 w-5 text-primary" />
                  <div className="text-sm font-medium text-foreground">{spec.label}</div>
                  <div className="text-xs text-muted-foreground">{spec.detail}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HardwareSection;
