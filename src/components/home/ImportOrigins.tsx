'use client';

import { motion } from 'framer-motion';
import { importCountries } from '@/data/countries';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ImportOrigins() {
  return (
    <section className="py-20 md:py-28 bg-primary-dark section-divider">
      <div className="max-w-container mx-auto px-4 md:px-6">
        <SectionHeading
          title="Where Our Parts Come From"
          subtitle="We import directly from certified manufacturers across the globe. All products come with proper certifications, import licenses, and quality guarantees."
        />
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
            hidden: {},
          }}
        >
          {importCountries.map((c) => (
            <motion.div
              key={c.code}
              className="p-6 bg-bg-card border border-[rgba(255,255,255,0.05)] rounded-card text-center hover:border-accent-silver/40 transition-colors duration-[400ms]"
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 15 },
              }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-3xl mb-2 block" role="img" aria-label={c.name}>
                {c.code === 'JP' && '🇯🇵'}
                {c.code === 'KR' && '🇰🇷'}
                {c.code === 'CN' && '🇨🇳'}
                {c.code === 'DE' && '🇩🇪'}
                {c.code === 'TW' && '🇹🇼'}
                {c.code === 'TH' && '🇹🇭'}
              </span>
              <h3 className="font-heading font-bold text-accent-chrome uppercase tracking-wider">{c.name}</h3>
              <p className="mt-1 text-text-muted text-sm font-body">{c.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {['Certified Importers', 'Licensed & Insured', 'Quality Guaranteed'].map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 rounded-button bg-primary border border-[rgba(255,255,255,0.1)] text-accent-silver text-sm font-heading font-semibold uppercase tracking-wider"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
