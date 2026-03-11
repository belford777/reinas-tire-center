'use client';

import { useState } from 'react';

const SUBJECTS = [
  'General Inquiry',
  'Order Question',
  'Wholesale/Partnership',
  'Part Request',
  'Returns',
  'Other',
];

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 800);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-heading font-medium text-accent-silver text-sm mb-1">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 rounded-[4px] bg-bg-card border border-border text-white font-body placeholder-text-muted focus:border-[#E63946] focus:outline-none transition-colors"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-heading font-medium text-accent-silver text-sm mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-[4px] bg-bg-card border border-border text-white font-body placeholder-text-muted focus:border-[#E63946] focus:outline-none transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block font-heading font-medium text-accent-silver text-sm mb-1">
          Phone <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full px-4 py-3 rounded-[4px] bg-bg-card border border-border text-white font-body placeholder-text-muted focus:border-[#E63946] focus:outline-none transition-colors"
          placeholder="(555) 555-5555"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block font-heading font-medium text-accent-silver text-sm mb-1">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-3 rounded-[4px] bg-bg-card border border-border text-white font-body focus:border-[#E63946] focus:outline-none transition-colors"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block font-heading font-medium text-accent-silver text-sm mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-[4px] bg-bg-card border border-border text-white font-body placeholder-text-muted focus:border-[#E63946] focus:outline-none transition-colors resize-y"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-4 bg-[#E63946] text-white font-heading font-bold rounded-[4px] uppercase tracking-wider hover:bg-[#C1121F] disabled:opacity-70 transition-colors duration-200"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' && (
        <p className="text-success font-body text-sm">Thank you. We&apos;ll get back to you soon.</p>
      )}
      {status === 'error' && (
        <p className="text-danger font-body text-sm">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
