'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { categories } from '@/data/categories';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTAButton } from '@/components/ui/CTAButton';

export function CategoryGrid() {
  return (
    <section className="py-20 md:py-28 bg-[#0B0B0F] section-divider">
      <div className="max-w-container mx-auto px-4 md:px-6">
        <SectionHeading title="Shop by Category" />
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
            hidden: {},
          }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href={`/autoparts/${cat.slug}`}
                className="block group relative p-6 md:p-8 bg-[#0B0B0F] border border-[#E63946] rounded-card hover:shadow-red-glow transition-all duration-200 h-full min-h-[200px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" aria-hidden />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-[4px] bg-primary-light flex items-center justify-center text-[#E63946] text-2xl mb-4">
                    {i % 6 === 0 && '⚙'}
                    {i % 6 === 1 && '🛞'}
                    {i % 6 === 2 && '💡'}
                    {i % 6 === 3 && '🚗'}
                    {i % 6 === 4 && '🪑'}
                    {i % 6 === 5 && '🛞'}
                  </div>
                  <div className="flex-1" />
                  <h3 className="font-heading font-bold text-white text-lg uppercase tracking-wider mt-auto pt-4">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <CTAButton href="/autoparts">View Full Catalog</CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
