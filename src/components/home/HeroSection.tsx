'use client';

import { motion } from 'framer-motion';
import { CTAButton } from '@/components/ui/CTAButton';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80')`,
        }}
      />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 from-20% via-black/85 via-50% to-[#0B0B0F]" />
      <div className="relative z-10 max-w-container mx-auto px-4 md:px-6 text-center">
        <motion.h1
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-accent-chrome tracking-[0.04em] leading-tight uppercase"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3)' }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          PREMIUM AUTO PARTS.
          <br />
          WORLDWIDE SUPPLY.
        </motion.h1>
        <motion.p
          className="mt-6 text-lg md:text-xl text-accent-silver font-body max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          Trusted by auto shops across America. Imported directly from the world&apos;s best manufacturers.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <CTAButton href="/autoparts">Shop Auto Parts</CTAButton>
          <CTAButton href="/contact" variant="outline">
            Contact Us
          </CTAButton>
        </motion.div>
        <motion.div
          className="mt-16 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <span className="block text-accent-silver/80 text-sm font-body mb-2">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="block text-accent-silver"
          >
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
