import { AboutContent } from './AboutContent';
import { CTAButton } from '@/components/ui/CTAButton';

export const metadata = {
  title: 'Our Story | Reina\'s Tire Center LLC',
  description: 'From a father\'s passion to America\'s trusted auto parts supplier. Learn how Reina\'s Tire Center was built.',
};

const values = [
  { title: 'Quality First', description: 'We never compromise on the quality of the parts we source and deliver.' },
  { title: 'Customer Obsessed', description: 'Your success is our success. We treat every order like it matters.' },
  { title: 'Always Growing', description: 'We keep expanding our catalog and improving our service.' },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <section className="max-w-container mx-auto px-4 md:px-6 text-center mb-20">
        <h1 className="font-display text-5xl md:text-6xl text-accent-chrome tracking-wider">
          Our Story
        </h1>
        <p className="mt-4 text-text-muted font-body text-lg max-w-2xl mx-auto">
          From a father&apos;s passion to America&apos;s trusted auto parts supplier.
        </p>
      </section>
      <AboutContent />
      <section className="max-w-container mx-auto px-4 md:px-6 mt-24">
        <h2 className="font-display text-3xl text-accent-chrome tracking-wider text-center mb-12">
          Our Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-8 bg-bg-card border border-border rounded-lg text-center"
            >
              <h3 className="font-heading font-bold text-accent-chrome text-lg">{v.title}</h3>
              <p className="mt-2 text-text-muted font-body">{v.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-container mx-auto px-4 md:px-6 mt-24 text-center">
        <p className="text-accent-silver font-body text-lg mb-6">
          Want to work with us? We&apos;re always looking for passionate people.
        </p>
        <CTAButton href="/contact">Join Our Team</CTAButton>
      </section>
    </div>
  );
}
