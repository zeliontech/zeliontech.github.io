import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/zev/PageHeader";

// Legal disclaimer on the approved light system: the shared page header, then
// the notice as a single prose article (.legal-prose in index.css sets the
// type). The company is always ZelionTech; bare "Zelion" is the token only.

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main" className="pt-20">
        <PageHeader
          eyebrow="Legal"
          title={
            <>
              Legal <span className="metal-gradient">disclaimer.</span>
            </>
          }
          lede="How to read this website. Everything here is published for information; nothing on it is advice, an offer or a recommendation."
        >
          <p className="text-[13px] text-muted-foreground">Last updated: February 2026</p>
        </PageHeader>

        <section className="section pt-12 sm:pt-14">
          <div className="container mx-auto px-4 lg:px-8">
            <article className="legal-prose max-w-3xl">
              <section>
                <h2>General disclaimer</h2>
                <p>
                  The information provided on this website and related materials is for informational
                  purposes only. Nothing contained herein constitutes financial advice, investment
                  advice, trading advice, or any other sort of professional advice. ZLN is a utility
                  token designed to function within the ZelionTech ecosystem infrastructure. It is not
                  a security, commodity, or financial instrument.
                </p>
              </section>

              <section>
                <h2>No investment advice</h2>
                <p>
                  The content on this website does not constitute a recommendation or solicitation to
                  buy, sell, or hold any token, cryptocurrency, or digital asset. You should conduct
                  your own research and consult with qualified professionals before making any
                  decisions regarding digital assets.
                </p>
              </section>

              <section>
                <h2>Risk disclosure</h2>
                <p>
                  Digital assets involve substantial risk and are not suitable for everyone. The value
                  of digital assets can fluctuate significantly. You should only participate with funds
                  you can afford to lose. Past performance does not guarantee future results.
                </p>
              </section>

              <section>
                <h2>Forward-looking statements</h2>
                <p>
                  This website may contain forward-looking statements regarding ZelionTech, the ZEV
                  platform, technology development, and token utility. Such statements are based on
                  current expectations and assumptions, and actual results may differ materially from
                  those projected.
                </p>
              </section>

              <section>
                <h2>Regulatory compliance</h2>
                <p>
                  Users are solely responsible for understanding and complying with all applicable laws
                  and regulations in their jurisdiction regarding digital assets and cryptocurrency.
                  The availability of ZLN tokens may be restricted in certain jurisdictions.
                </p>
              </section>

              <section>
                <h2>Limitation of liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, ZelionTech and its contributors
                  shall not be liable for any indirect, incidental, special, consequential, or punitive
                  damages, or any loss of profits or revenues, whether incurred directly or indirectly,
                  arising from your use of this website, the ZelionTech ecosystem or the ZLN token.
                </p>
              </section>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
