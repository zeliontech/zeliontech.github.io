import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowRight, Check, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    step: 1,
    title: "Install a Compatible Wallet",
    description: "Install a Web3-compatible wallet application that supports blockchain-based token transactions.",
    icon: Wallet,
  },
  {
    step: 2,
    title: "Connect Wallet",
    description: "Connect your wallet through the platform interface and approve the connection request.",
    icon: ArrowRight,
  },
  {
    step: 3,
    title: "Select Token Amount",
    description: "Specify the token amount for transaction and review transaction details carefully.",
    icon: Check,
  },
  {
    step: 4,
    title: "Confirm Transaction",
    description: "Confirm the transaction through your wallet interface. Blockchain transactions are irreversible once confirmed.",
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
                How to Access $ZLN
              </span>
              <h1 className="mb-4 font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                Access the Zelion
                <br />
                <span className="metal-gradient">Utility Token</span>
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
                The Zelion token is a utility instrument used within the ecosystem for coordination and infrastructure-level participation.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
                Participation involves interacting with blockchain-based systems using compatible digital wallets.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overview */}
        <section className="pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 font-heading text-2xl font-semibold text-foreground">
                Access Process Overview
              </h2>
              <div className="glass-card p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Accessing the Zelion token involves connecting a compatible Web3 wallet and interacting with the token contract through supported interfaces.
                </p>
                <p className="mt-4 text-sm font-medium text-foreground">
                  Users should ensure they understand the risks associated with blockchain transactions before proceeding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="mb-8 text-center font-heading text-2xl font-semibold text-foreground">
              Access Steps
            </h2>
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
                      <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
                        Step {s.step} — {s.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Transaction Notice */}
        <section className="pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-foreground">
                Transaction Notice
              </h2>
              <div className="glass-card p-8">
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  Blockchain transactions may require network confirmation time.
                  Transaction completion depends on network conditions and processing times.
                </p>
                <p className="text-sm font-medium text-foreground">
                  Always verify wallet addresses and transaction details before confirming.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Notice */}
        <section className="pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-foreground">
                Important Risk Information
              </h2>
              <div className="glass-card border-2 border-yellow-500/20 bg-yellow-500/5 p-8">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500" />
                    Blockchain transactions are irreversible.
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500" />
                    Digital asset participation involves risk.
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yellow-500" />
                    Users are responsible for compliance with local laws and regulations.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Utility Disclaimer */}
        <section className="pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-center font-heading text-2xl font-semibold text-foreground">
                Utility Token Notice
              </h2>
              <div className="glass-card p-8 text-center">
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  The Zelion token is designed as a utility instrument for ecosystem coordination.
                </p>
                <p className="text-sm font-medium text-foreground">
                  It is not designed as a financial product, investment instrument, or security.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowToBuy;
