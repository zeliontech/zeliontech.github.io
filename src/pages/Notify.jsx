import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotifySignup from "@/components/NotifySignup";

const Notify = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center"
              >
                <span className="mb-4 inline-block text-xs font-medium tracking-[0.2em] text-silver-light uppercase">
                  Stay Updated
                </span>
                <h1 className="mb-4 font-heading text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                  Get Notified
                </h1>
                <p className="text-lg text-muted-foreground">
                  Be the first to know when $ZLN launches. Join our waitlist and receive
                  exclusive updates about the Zelion Energy Network.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <NotifySignup />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 text-center"
              >
                <p className="text-sm text-muted-foreground">
                  We respect your privacy. Your information will never be shared with third parties.
                  <br />
                  You can unsubscribe at any time.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Notify;
