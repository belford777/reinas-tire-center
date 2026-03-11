import { ContactForm } from './ContactForm';

export const metadata = {
  title: 'Contact Us | Reina\'s Tire Center LLC',
  description: 'Get in touch — call, email, or visit us at 9800 S Orange Ave, Orlando, FL 32824.',
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-container mx-auto px-4 md:px-6">
        <h1 className="font-display text-4xl md:text-5xl text-accent-chrome tracking-wider mb-12">
          Get in Touch
        </h1>
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="space-y-6 text-accent-silver font-body">
              <p>
                <strong className="text-accent-chrome font-heading">Phone</strong>
                <br />
                <a href="tel:+14075550199" className="hover:text-[#E63946] transition-colors">
                  (407) 555-0199
                </a>
              </p>
              <p>
                <strong className="text-accent-chrome font-heading">Email</strong>
                <br />
                <a
                  href="mailto:info@reinastirecenter.com"
                  className="hover:text-[#E63946] transition-colors"
                >
                  info@reinastirecenter.com
                </a>
              </p>
              <p>
                <strong className="text-accent-chrome font-heading">Address</strong>
                <br />
                9800 S Orange Ave
                <br />
                Orlando, FL 32824
              </p>
              <p>
                <strong className="text-accent-chrome font-heading">Business Hours</strong>
                <br />
                Mon–Fri 8AM–6PM | Sat 9AM–3PM | Sun Closed
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-silver hover:text-[#E63946] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-silver hover:text-[#E63946] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-silver hover:text-[#E63946] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
        <div className="mt-16 aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden bg-bg-card">
          <iframe
            title="Reina's Tire Center location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.367521660374!2d-81.3522!3d28.3852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e77e37858f2f2f%3A0x1f0f0f0f0f0f0f0f!2s9800%20S%20Orange%20Ave%2C%20Orlando%2C%20FL%2032824!5e0!3m2!1sen!2sus!4v1710000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
