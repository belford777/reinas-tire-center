'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function AboutPreview() {
  return (
    <section className="py-20 md:py-28 bg-primary-dark section-divider">
      <div className="max-w-container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-accent-chrome tracking-[0.06em] uppercase">
              Built on Passion. Driven by Quality.
            </h2>
            <p className="mt-6 text-text-muted font-body text-lg leading-relaxed">
              Reina Pena grew up watching her father — a lifelong businessman and car enthusiast — turn
              his love for automobiles into a legacy. Inspired by that same passion, Reina founded
              Reina&apos;s Tire Center to bring the highest quality auto parts directly to American roads.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 font-heading font-semibold text-[#E63946] hover:text-[#C1121F] transition-colors uppercase tracking-wider"
            >
              Read Our Full Story
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
          <motion.div
            className="relative aspect-[4/3] rounded-card overflow-hidden bg-bg-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80')`,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
