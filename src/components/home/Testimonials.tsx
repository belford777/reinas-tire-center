'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StarRating } from '@/components/ui/StarRating';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-primary-dark section-divider">
      <div className="max-w-container mx-auto px-4 md:px-6">
        <SectionHeading title="What Our Clients Say" />
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              className="p-8 bg-bg-card border border-[rgba(255,255,255,0.05)] rounded-card glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <StarRating rating={t.rating} size="md" />
              <blockquote className="mt-4 text-accent-silver font-body italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 font-heading font-semibold text-accent-chrome">
                {t.author} — {t.business}
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
