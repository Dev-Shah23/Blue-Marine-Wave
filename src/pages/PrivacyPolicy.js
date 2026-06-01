import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useSeo from "../hooks/useSeo";

/**
 * Privacy Policy — required because the quote form collects personal data
 * (name, company, email, phone) from visitors, including EU importers (GDPR).
 *
 * This is a reasonable starting template that reflects what the form actually
 * collects and does. Have it reviewed by counsel before relying on it legally.
 */
export default function PrivacyPolicy() {
  useSeo({
    title: "Privacy Policy — Blue Wave Marine",
    description:
      "How Blue Wave Marine collects, uses, and protects the personal data submitted through our quote request form.",
    canonical: "/privacy",
  });

  return (
    <div className="min-h-screen bg-[var(--base-bg)] text-[var(--text-primary)] transition-colors duration-500">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-24 prose-invert">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Privacy Policy</h1>
        <p className="text-[var(--text-secondary)] mb-10">Last updated: 1 June 2026</p>

        <section className="space-y-8 text-[var(--text-secondary)] leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">What we collect</h2>
            <p>
              When you submit a quote request, we collect the information you provide:
              your name, company, email address, phone number, destination country and
              port, product of interest, estimated quantity, and any message. We do not
              use tracking cookies or sell your data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">How we use it</h2>
            <p>
              Your information is used solely to respond to your enquiry, prepare a quote,
              and communicate with you about your potential order. It is sent to our team
              by email and is not shared with third parties except service providers that
              help us deliver that email.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">Legal basis &amp; your rights</h2>
            <p>
              We process this data on the basis of your consent and our legitimate
              interest in responding to business enquiries. You may request access to,
              correction of, or deletion of your data at any time by emailing us. If you
              are in the EU/UK, you have rights under the GDPR, including the right to
              withdraw consent and to lodge a complaint with a supervisory authority.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">Retention</h2>
            <p>
              We retain enquiry data only as long as needed to handle your request and any
              resulting business relationship, after which it is deleted.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">Contact</h2>
            <p>
              Questions about this policy or your data? Email{" "}
              <a className="text-[var(--accent-gold)] hover:underline" href="mailto:export@bluewavemarine.in">
                export@bluewavemarine.in
              </a>{" "}
              or call +91 8891704553.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
