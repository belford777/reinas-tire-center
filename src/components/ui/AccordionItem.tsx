'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left font-heading font-semibold text-accent-chrome hover:text-[#E63946] transition-colors"
        aria-expanded={open}
        aria-controls={`accordion-${question.slice(0, 20)}`}
        id={`accordion-btn-${question.slice(0, 20)}`}
      >
        {question}
        <span
          className={`text-[#E63946] text-2xl transition-transform duration-[400ms] ${open ? 'rotate-45' : ''}`}
          aria-hidden
        >
          +
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={`accordion-${question.slice(0, 20)}`}
            role="region"
            aria-labelledby={`accordion-btn-${question.slice(0, 20)}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-text-muted font-body leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
