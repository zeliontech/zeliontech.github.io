import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center"
              >
                <h1 className="mb-4 font-heading text-4xl font-bold text-foreground sm:text-5xl">
                  Legal Disclaimer
                </h1>
                <p className="text-muted-foreground">Last updated: February 2026</p>
              </motion.div>

              <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    General Disclaimer
                  </h2>
                  <p>
                    The information provided on this website and related materials is for informational
                    purposes only. Nothing contained herein constitutes financial advice, investment
                    advice, trading advice, or any other sort of professional advice. $ZLN is a
                    utility token designed to function within the Zelion protocol infrastructure.
                    It is not a security, commodity, or financial instrument.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    No Investment Advice
                  </h2>
                  <p>
                    The content on this website does not constitute a recommendation or solicitation
                    to buy, sell, or hold any token, cryptocurrency, or digital asset. You should
                    conduct your own research and consult with qualified professionals before making
                    any decisions regarding digital assets.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    Risk Disclosure
                  </h2>
                  <p>
                    Digital assets involve substantial risk and are not suitable for everyone.
                    The value of digital assets can fluctuate significantly. You should only
                    participate with funds you can afford to lose. Past performance does not
                    guarantee future results.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    Forward-Looking Statements
                  </h2>
                  <p>
                    This website may contain forward-looking statements regarding the Zelion
                    protocol, technology development, and token utility. Such statements are
                    based on current expectations and assumptions, and actual results may differ
                    materially from those projected.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    Regulatory Compliance
                  </h2>
                  <p>
                    Users are solely responsible for understanding and complying with all
                    applicable laws and regulations in their jurisdiction regarding digital
                    assets and cryptocurrency. The availability of $ZLN tokens may be restricted
                    in certain jurisdictions.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    Limitation of Liability
                  </h2>
                  <p>
                    To the maximum extent permitted by applicable law, Zelion and its contributors
                    shall not be liable for any indirect, incidental, special, consequential, or
                    punitive damages, or any loss of profits or revenues, whether incurred directly
                    or indirectly, arising from your use of the protocol or tokens.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
