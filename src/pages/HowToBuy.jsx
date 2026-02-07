import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowRight, Check, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    step: 1,
    title: "Install Wallet",
    description: "Download and install a Web3 wallet such as MetaMask or Trust Wallet on your device.",
    icon: Wallet,
  },
  {
    step: 2,
    title: "Connect Wallet",
    description: "Click 'Connect Wallet' on our platform and approve the connection request in your wallet.",
    icon: ArrowRight,
  },
  {
    step: 3,
    title: "Enter Amount",
    description: "Specify the amount of $ZLN tokens you wish to purchase and review the transaction details.",
    icon: Check,
  },
  {
    step: 4,
    title: "Confirm Transaction",
    description: "Confirm the transaction in your wallet. Your $ZLN tokens will arrive within moments.",
    icon: Check,
  },
];

const HowToBuy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 text-center lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-primary uppercase">
                How to Buy
              </span>
              <h1 className="mb-4 font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                Purchase <span className="metal-gradient">$ZLN</span>
              </h1>
              <p className="mx-auto max-w-xl text-muted-foreground">
                Follow these steps to acquire $ZLN tokens through our secure purchase flow.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps */}
        <section className="pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-6">
              {steps.map((s, index) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card-hover relative overflow-hidden p-6 lg:p-8"
                >
                  <div className="absolute right-6 top-6 font-heading text-5xl font-bold text-muted/30">
                    {String(s.step).padStart(2, "0")}
                  </div>
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                        {s.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Transaction States Preview */}
            <div className="mx-auto mt-16 max-w-2xl">
              <h3 className="mb-6 text-center font-heading text-xl font-semibold text-foreground">
                Transaction States
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass-card p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                  <div className="font-heading text-sm font-semibold text-foreground">
                    Transaction Pending
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Confirming on blockchain...
                  </p>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-heading text-sm font-semibold text-foreground">
                    Transaction Success
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    $ZLN tokens received
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Button variant="hero" size="xl">
                Buy $ZLN Now
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowToBuy;
