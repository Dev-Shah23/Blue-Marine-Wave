import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy — Blue Wave Marine";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--base-bg)] text-[var(--text-primary)] transition-colors duration-500">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">Privacy Policy</h1>
        <p className="text-sm text-[var(--text-tertiary)] mb-10">Last updated: 2 June 2026</p>

        <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
          <p>
            Blue Wave Marine ("we", "us", "our") respects your privacy. This policy explains what
            information we collect through this website, how we use it, and the choices you have.
          </p>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-serif">1. Information We Collect</h2>
            <p>
              When you submit a quote request, we collect the details you provide: your name, company
              name, email address, phone/WhatsApp number, destination country, the products you are
              interested in, the quantity required, and any additional notes. We do not ask for, or
              intentionally collect, sensitive personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-serif">2. How We Use Your Information</h2>
            <p>
              We use your information solely to respond to your enquiry, prepare and send you a quotation,
              and communicate with you about your request. We do not sell your data or use it for
              unrelated marketing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-serif">3. Sharing &amp; Service Providers</h2>
            <p>
              To deliver and confirm your request, your submission is processed by trusted third-party
              services on our behalf: an email-delivery service (to notify our team and send you a
              confirmation), and our own secure server where requests are stored. These providers process
              the data only to provide their service and are not permitted to use it for their own purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-serif">4. Data Retention</h2>
            <p>
              We retain quote requests only as long as necessary to handle your enquiry and for our
              legitimate business records. You may ask us to delete your information at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-serif">5. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access, correct, or delete the personal
              information we hold about you, or to object to its processing. To exercise these rights,
              contact us at the email below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-serif">6. Cookies &amp; Analytics</h2>
            <p>
              We may use privacy-respecting analytics to understand how visitors use the site (for example,
              which pages are viewed) so we can improve it. This data is aggregated and is not used to
              identify you personally.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-serif">7. Security</h2>
            <p>
              We use reasonable technical and organisational measures to protect your information in
              transit and at rest. No method of transmission over the internet is completely secure,
              but we work to safeguard your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-serif">8. Contact Us</h2>
            <p>
              For any privacy questions or requests, email us at{" "}
              <a
                href="mailto:bluewavemarine07@gmail.com"
                className="text-[var(--accent-gold)] hover:underline"
              >
                bluewavemarine07@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-serif">9. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Any changes will be posted on this page with a
              revised "last updated" date.
            </p>
          </section>

          <p className="text-sm text-[var(--text-tertiary)] italic pt-4 border-t border-[var(--card-border)]/30">
            This policy is provided for general information and is not legal advice. We recommend having it
            reviewed against the regulations of the markets you serve.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
