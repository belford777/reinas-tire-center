'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <motion.div
      className={`text-center mb-12 md:mb-16 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white tracking-[0.08em] uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-muted font-body text-lg max-w-2xl mx-auto font-heading font-semibold uppercase tracking-[0.05em]">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
