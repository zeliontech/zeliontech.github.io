import Navbar from "@/components/Navbar";
import usePageMeta from "@/hooks/usePageMeta";
import Footer from "@/components/Footer";
import PageHeader from "@/components/zev/PageHeader";

// Privacy policy on the approved light system: the shared page header, then
// the policy as one prose article (.legal-prose in index.css sets the type).

const PrivacyPolicy = () => {
  usePageMeta({
    title: "Privacy policy | ZelionTech",
    description:
      "How ZelionTech collects, uses and protects personal data when you use this website.",
    path: "/privacy",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main" className="pt-20">
        <PageHeader
          eyebrow="Privacy"
          title={
            <>
              Privacy <span className="metal-gradient">policy.</span>
            </>
          }
          lede="How ZelionTech collects, uses and protects personal data when you use this website, under the GDPR and applicable data-protection law."
        >
          <p className="text-[13px] text-muted-foreground">Last updated: 11 February 2026</p>
        </PageHeader>

        <section className="section pt-12 sm:pt-14">
          <div className="container mx-auto px-4 lg:px-8">
            <article className="legal-prose max-w-3xl">
                <section>
                  <p>
                    ZelionTech ("we", "our", or "us") respects your privacy and is committed to protecting 
                    your personal data in accordance with the General Data Protection Regulation (GDPR) and 
                    applicable data protection laws.
                  </p>
                  <p>
                    This Privacy Policy explains how we collect, use, and protect your information when you 
                    use our website.
                  </p>
                </section>

                <section>
                  <h2>
                    1. Who We Are
                  </h2>
                  <p>
                    ZelionTech provides infrastructure and technology solutions for verifiable energy data systems.
                  </p>
                  <ul>
                    <li>Website: <a href="https://zeliontech.com">https://zeliontech.com</a></li>
                    <li>Contact Email: <a href="mailto:info@zeliontech.com">info@zeliontech.com</a></li>
                  </ul>
                </section>

                <section>
                  <h2>
                    2. Data We Collect
                  </h2>
                  <p>
                    We collect data in two ways: information you voluntarily provide, and information 
                    automatically collected through analytics.
                  </p>
                  
                  <div className="mt-4">
                    <h3>
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
                    <h3>
                      Waitlist / Notification Signup
                    </h3>
                    <p>We may collect:</p>
                    <ul className="mt-2 space-y-1 pl-5 list-disc">
                      <li>Email Address</li>
                      <li>Name (if provided)</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h3>
                      Automatically Collected Data (Analytics)
                    </h3>
                    <p>We automatically collect non-personally identifiable information through Firebase Analytics:</p>
                    <ul className="mt-2 space-y-1 pl-5 list-disc">
                      <li>Page views and navigation behavior</li>
                      <li>Device and browser information</li>
                      <li>Approximate geographic location (country/city)</li>
                      <li>User interactions (clicks, scrolling, time spent)</li>
                    </ul>
                    <p className="mt-2 text-sm">
                      See Section 8 for detailed information about analytics tracking.
                    </p>
                  </div>
                </section>

                <section>
                  <h2>
                    3. Legal Basis for Processing (GDPR)
                  </h2>
                  <p>
                    We process your personal data based on:
                  </p>
                  
                  <div className="mt-4">
                    <h3>
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
                  <h2>
                    4. How We Use Your Data
                  </h2>
                  <p>We use your data only to:</p>
                  <ul>
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
                  <h2>
                    5. Data Storage and Security
                  </h2>
                  <p>
                    We use secure third-party infrastructure (including cloud database services) to store 
                    submitted data.
                  </p>
                  <p>
                    We implement reasonable technical and organizational measures to protect your data against:
                  </p>
                  <ul>
                    <li>Unauthorized access</li>
                    <li>Loss or misuse</li>
                    <li>Disclosure or alteration</li>
                  </ul>
                </section>

                <section>
                  <h2>
                    6. Data Retention
                  </h2>
                  <p>We keep your data only as long as necessary:</p>
                  
                  <div className="mt-4">
                    <h3>
                      Contact Form Data:
                    </h3>
                    <p>Stored until inquiry is resolved or no longer relevant</p>
                  </div>

                  <div className="mt-4">
                    <h3>
                      Waitlist Data:
                    </h3>
                    <p>Stored until product launch or until you request deletion</p>
                  </div>
                </section>

                <section>
                  <h2>
                    7. Your GDPR Rights
                  </h2>
                  <p>
                    If you are located in the European Economic Area (EEA), you have the right to:
                  </p>
                  <ul>
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Restrict processing</li>
                    <li>Object to processing</li>
                    <li>Request data portability</li>
                  </ul>
                  <p>
                    To exercise your rights, contact us at:{" "}
                    <a href="mailto:info@zeliontech.com">
                      info@zeliontech.com
                    </a>
                  </p>
                </section>

                <section>
                  <h2>
                    8. Analytics and Tracking
                  </h2>
                  
                  <div className="mt-4">
                    <h3>
                      Firebase Analytics (Google Analytics for Firebase)
                    </h3>
                    <p>
                      We use Firebase Analytics, a web analytics service provided by Google LLC ("Google"), 
                      to understand how users interact with our website and improve user experience.
                    </p>
                  </div>

                  <div className="mt-4">
                    <h3>
                      Data Collected
                    </h3>
                    <p>Firebase Analytics automatically collects:</p>
                    <ul className="mt-2 space-y-1 pl-5 list-disc">
                      <li>Page views and navigation patterns</li>
                      <li>User interactions (clicks, form submissions, scroll depth)</li>
                      <li>Device information (browser type, operating system, screen size)</li>
                      <li>Approximate geographic location (country/city level)</li>
                      <li>Session duration and engagement metrics</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h3>
                      Purpose
                    </h3>
                    <p>We use this data to:</p>
                    <ul className="mt-2 space-y-1 pl-5 list-disc">
                      <li>Understand user behavior and improve website functionality</li>
                      <li>Analyze content engagement and navigation patterns</li>
                      <li>Identify technical issues and optimize performance</li>
                      <li>Make data-driven decisions about feature development</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h3>
                      Legal Basis (GDPR)
                    </h3>
                    <p>
                      We process analytics data based on our <strong>legitimate interest</strong> in understanding 
                      and improving our website's performance and user experience (Article 6(1)(f) GDPR).
                    </p>
                  </div>

                  <div className="mt-4">
                    <h3>
                      Third-Party Processing
                    </h3>
                    <p>
                      Firebase Analytics is operated by Google. Data collected through Firebase is processed 
                      by Google in accordance with Google's Privacy Policy. Google may use this data in 
                      accordance with their terms of service.
                    </p>
                    <p className="mt-2">
                      Learn more:{" "}
                      <a 
                        href="https://policies.google.com/privacy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                       
                      >
                        Google Privacy Policy
                      </a>
                    </p>
                  </div>

                  <div className="mt-4">
                    <h3>
                      Data Retention
                    </h3>
                    <p>
                      Analytics data is retained for up to 14 months by default, after which it is automatically 
                      deleted. Aggregated reporting data may be retained longer for trend analysis.
                    </p>
                  </div>

                  <div className="mt-4">
                    <h3>
                      Your Rights
                    </h3>
                    <p>You can opt out of analytics tracking by:</p>
                    <ul className="mt-2 space-y-1 pl-5 list-disc">
                      <li>Using browser privacy settings or "Do Not Track" features</li>
                      <li>Installing browser extensions that block analytics (e.g., Privacy Badger, uBlock Origin)</li>
                      <li>Disabling JavaScript in your browser (may affect site functionality)</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h3>
                      Cookies
                    </h3>
                    <p>
                      Firebase Analytics may use cookies and similar technologies to collect and store information. 
                      We do not use tracking cookies for marketing or advertising purposes.
                    </p>
                  </div>
                </section>

                <section>
                  <h2>
                    9. Third-Party Services
                  </h2>
                  <p>
                    We use trusted third-party services to operate our website and provide our services:
                  </p>
                  
                  <ul>
                    <li>
                      <strong>Google Firebase:</strong> For analytics, data storage, and hosting services
                    </li>
                    <li>
                      <strong>Cloud Infrastructure Providers:</strong> For website hosting and data storage
                    </li>
                  </ul>

                  <p>
                    These providers process data only on our behalf and under appropriate data protection agreements. 
                    They are contractually obligated to protect your data and may only use it to provide services to us.
                  </p>
                </section>

                <section>
                  <h2>
                    10. Data Transfers
                  </h2>
                  <p>
                    If data is processed outside the EEA, we ensure appropriate safeguards are in place in 
                    accordance with GDPR requirements.
                  </p>
                </section>

                <section>
                  <h2>
                    11. Children's Privacy
                  </h2>
                  <p>
                    Our services are not intended for individuals under 16 years old.
                    We do not knowingly collect personal data from children.
                  </p>
                </section>

                <section>
                  <h2>
                    12. Changes to This Policy
                  </h2>
                  <p>
                    We may update this Privacy Policy periodically.
                  </p>
                  <p>
                    Updates will be posted on this page with a revised "Last Updated" date.
                  </p>
                </section>

                <section>
                  <h2>
                    13. Contact Us
                  </h2>
                  <p>
                    If you have questions about this Privacy Policy or your data rights, contact:
                  </p>
                  <ul>
                    <li>Email: <a href="mailto:info@zeliontech.com">info@zeliontech.com</a></li>
                    <li>Website: <a href="https://zeliontech.com">https://zeliontech.com</a></li>
                  </ul>
                </section>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
