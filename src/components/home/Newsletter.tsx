'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('success');
    setEmail('');
  }

  return (
    <section className="py-20 md:py-28 bg-[#0B0B0F] relative overflow-hidden section-divider">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, var(--primary-light) 0%, transparent 50%)',
        }}
      />
      <div className="relative max-w-container mx-auto px-4 md:px-6 text-center">
        <motion.h2
          className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-[0.08em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Stay in the Fast Lane
        </motion.h2>
        <motion.p
          className="mt-4 text-text-muted font-body text-lg max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Subscribe for exclusive deals, new arrivals, and industry updates.
        </motion.p>
        <motion.form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-[4px] bg-bg-card border border-border text-white placeholder-text-muted font-body focus:border-[#E63946] focus:outline-none transition-colors"
            aria-label="Email address"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 bg-[#E63946] text-white font-heading font-semibold rounded-[4px] uppercase tracking-[0.1em] hover:bg-[#C1121F] transition-colors duration-200"
          >
            Subscribe
          </button>
        </motion.form>
        {status === 'success' && (
          <p className="mt-4 text-success font-body text-sm">Thanks for subscribing!</p>
        )}
      </div>
    </section>
  );
}
