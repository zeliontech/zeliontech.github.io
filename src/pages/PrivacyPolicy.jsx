import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
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
                  Privacy Policy
                </h1>
                <p className="text-muted-foreground">Last Updated: February 11, 2026</p>
              </motion.div>

              <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
                <section>
                  <p>
                    ZelionTech ("we", "our", or "us") respects your privacy and is committed to protecting 
                    your personal data in accordance with the General Data Protection Regulation (GDPR) and 
                    applicable data protection laws.
                  </p>
                  <p className="mt-4">
                    This Privacy Policy explains how we collect, use, and protect your information when you 
                    use our website.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    1. Who We Are
                  </h2>
                  <p>
                    ZelionTech provides infrastructure and technology solutions for verifiable energy data systems.
                  </p>
                  <ul className="mt-3 space-y-2 pl-5 list-disc">
                    <li>Website: <a href="https://zeliontech.com" className="text-foreground hover:underline">https://zeliontech.com</a></li>
                    <li>Contact Email: <a href="mailto:info@zeliontech.com" className="text-foreground hover:underline">info@zeliontech.com</a></li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    2. Data We Collect
                  </h2>
                  <p>
                    We currently collect personal data only when you voluntarily provide it through:
                  </p>
                  
                  <div className="mt-4">
                    <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
                      Contact Form
                    </h3>
                    <p>We may collect:</p>
                    <ul className="mt-2 space-y-1 pl-5 list-disc">
                      <li>Name</li>
                      <li>Email Address</li>
                      <li>Phone Number (if provided)</li>
                      <li>Message content</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
                      Waitlist / Notification Signup
                    </h3>
                    <p>We may collect:</p>
                    <ul className="mt-2 space-y-1 pl-5 list-disc">
                      <li>Email Address</li>
                      <li>Name (if provided)</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    3. Legal Basis for Processing (GDPR)
                  </h2>
                  <p>
                    We process your personal data based on:
                  </p>
                  
                  <div className="mt-4">
                    <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
                      Consent
                    </h3>
                    <p>When you:</p>
                    <ul className="mt-2 space-y-1 pl-5 list-disc">
                      <li>Submit the contact form</li>
                      <li>Join the waitlist / notification list</li>
                    </ul>
                    <p className="mt-2">
                      You may withdraw consent at any time.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    4. How We Use Your Data
                  </h2>
                  <p>We use your data only to:</p>
                  <ul className="mt-3 space-y-2 pl-5 list-disc">
                    <li>Respond to contact inquiries</li>
                    <li>Provide updates about ZelionTech products or releases (if you joined the waitlist)</li>
                    <li>Improve website communication and user experience</li>
                    <li>Maintain system security and prevent abuse</li>
                  </ul>
                  <p className="mt-4 font-semibold text-foreground">
                    We do NOT sell your personal data.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    5. Data Storage and Security
                  </h2>
                  <p>
                    We use secure third-party infrastructure (including cloud database services) to store 
                    submitted data.
                  </p>
                  <p className="mt-4">
                    We implement reasonable technical and organizational measures to protect your data against:
                  </p>
                  <ul className="mt-3 space-y-2 pl-5 list-disc">
                    <li>Unauthorized access</li>
                    <li>Loss or misuse</li>
                    <li>Disclosure or alteration</li>
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    6. Data Retention
                  </h2>
                  <p>We keep your data only as long as necessary:</p>
                  
                  <div className="mt-4">
                    <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
                      Contact Form Data:
                    </h3>
                    <p>Stored until inquiry is resolved or no longer relevant</p>
                  </div>

                  <div className="mt-4">
                    <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
                      Waitlist Data:
                    </h3>
                    <p>Stored until product launch or until you request deletion</p>
                  </div>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    7. Your GDPR Rights
                  </h2>
                  <p>
                    If you are located in the European Economic Area (EEA), you have the right to:
                  </p>
                  <ul className="mt-3 space-y-2 pl-5 list-disc">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Restrict processing</li>
                    <li>Object to processing</li>
                    <li>Request data portability</li>
                  </ul>
                  <p className="mt-4">
                    To exercise your rights, contact us at:{" "}
                    <a href="mailto:info@zeliontech.com" className="text-foreground hover:underline">
                      info@zeliontech.com
                    </a>
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    8. Cookies and Tracking
                  </h2>
                  <p>
                    Currently, we do not use tracking cookies for marketing or profiling.
                  </p>
                  <p className="mt-4">
                    If this changes, this policy will be updated accordingly.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    9. Third-Party Services
                  </h2>
                  <p>
                    We may use trusted third-party services for hosting and data storage.
                  </p>
                  <p className="mt-4">
                    These providers process data only on our behalf and under appropriate data protection agreements.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    10. Data Transfers
                  </h2>
                  <p>
                    If data is processed outside the EEA, we ensure appropriate safeguards are in place in 
                    accordance with GDPR requirements.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    11. Children's Privacy
                  </h2>
                  <p>
                    Our services are not intended for individuals under 16 years old.
                    We do not knowingly collect personal data from children.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    12. Changes to This Policy
                  </h2>
                  <p>
                    We may update this Privacy Policy periodically.
                  </p>
                  <p className="mt-4">
                    Updates will be posted on this page with a revised "Last Updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">
                    13. Contact Us
                  </h2>
                  <p>
                    If you have questions about this Privacy Policy or your data rights, contact:
                  </p>
                  <ul className="mt-3 space-y-2 pl-5 list-disc">
                    <li>Email: <a href="mailto:info@zeliontech.com" className="text-foreground hover:underline">info@zeliontech.com</a></li>
                    <li>Website: <a href="https://zeliontech.com" className="text-foreground hover:underline">https://zeliontech.com</a></li>
                  </ul>
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

export default PrivacyPolicy;
