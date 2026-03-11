'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTAButton } from '@/components/ui/CTAButton';

const strengths = [
  {
    icon: '🛡',
    title: 'Premium Quality',
    description:
      'Every part is sourced from certified manufacturers and undergoes strict quality checks before reaching your hands.',
  },
  {
    icon: '🚚',
    title: 'Fast Delivery',
    description:
      'Nationwide shipping with express options. Most orders ship within 24-48 hours from our Orlando warehouse.',
  },
  {
    icon: '🏆',
    title: 'Extended Warranty',
    description: 'Industry-leading warranty on all parts. We stand behind every product we sell.',
  },
  {
    icon: '🔧',
    title: 'Massive Selection',
    description:
      "Thousands of parts for virtually every make and model. And if we don't have it — call us. We'll source it and deliver it fast.",
  },
];

export function StrengthsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#0B0B0F] section-divider">
      <div className="max-w-container mx-auto px-4 md:px-6">
        <SectionHeading title="The Reina's Advantage" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {strengths.map((s, i) => (
            <motion.div
              key={s.title}
              className="p-6 bg-[#141417] border border-[#2A2A2F] rounded-card border-t-[3px] border-t-[#E63946] transition-colors duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <span className="text-4xl mb-4 block" aria-hidden>
                {s.icon}
              </span>
              <h3 className="font-heading font-bold text-white text-lg uppercase tracking-wider">{s.title}</h3>
              <p className="mt-2 text-text-muted font-body text-sm leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-16 p-8 md:p-10 bg-primary-light border border-[#E63946]/30 rounded-card text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-heading font-semibold text-white text-lg md:text-xl uppercase tracking-wide">
            Can&apos;t find what you need? Don&apos;t worry — give us a call. If it exists, we&apos;ll get it for you.
          </p>
          <div className="mt-6">
            <CTAButton href="/contact">Call Now</CTAButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
