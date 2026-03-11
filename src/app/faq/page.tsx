import { faqData } from '@/data/faqData';
import { AccordionItem } from '@/components/ui/AccordionItem';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata = {
  title: 'FAQ | Reina\'s Tire Center LLC',
  description: 'Frequently asked questions about ordering, shipping, returns, and partnerships.',
};

const categories = Array.from(new Set(faqData.map((f) => f.category)));

export default function FAQPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Find answers about our products, shipping, returns, and more."
        />
        <div className="space-y-12">
          {categories.map((cat) => (
            <section key={cat}>
              <h2 className="font-heading font-bold text-accent-chrome text-lg uppercase tracking-wider mb-6">
                {cat}
              </h2>
              <div className="space-y-0">
                {faqData
                  .filter((f) => f.category === cat)
                  .map((item) => (
                    <AccordionItem
                      key={item.id}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
