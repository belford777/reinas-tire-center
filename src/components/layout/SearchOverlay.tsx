'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/lib/types';
import { products } from '@/data/products';

const MAX_RESULTS = 10;
const DEBOUNCE_MS = 300;

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

function matchProduct(p: Product, q: string): boolean {
  if (!q.trim()) return true;
  const lower = q.trim().toLowerCase();
  const str = (s: string | undefined) => (s ? String(s).toLowerCase() : '');
  if (str(p.name).includes(lower)) return true;
  if (str(p.sku).includes(lower)) return true;
  if (str(p.oemNumber).includes(lower)) return true;
  if (str(p.brand).includes(lower)) return true;
  if (str(p.manufacturer).includes(lower)) return true;
  if (p.compatibleVehicles?.some((v) => str(v.make).includes(lower) || str(v.model).includes(lower))) return true;
  return false;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setDebouncedQuery('');
      return;
    }
    const t = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query, isOpen]);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return products.filter((p) => matchProduct(p, debouncedQuery)).slice(0, MAX_RESULTS);
  }, [debouncedQuery]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
        >
          {/* Backdrop — click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[rgba(10,22,40,0.95)] backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 text-accent-silver hover:text-white rounded transition-colors"
            aria-label="Close search"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="relative flex-1 flex flex-col items-center pt-24 px-4 pb-8 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl"
            >
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search parts, brands, vehicles..."
                autoFocus
                className="w-full bg-transparent border-0 border-b-2 border-[#E63946] pb-3 text-white placeholder-text-muted font-body text-2xl focus:outline-none focus:ring-0"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '24px' }}
                aria-label="Search"
              />

              {/* Results */}
              <div className="mt-8 w-full">
                <AnimatePresence mode="wait">
                  {!debouncedQuery.trim() ? null : results.length === 0 ? (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-accent-silver font-body text-center py-8"
                    >
                      No products found. Try a different search term.
                    </motion.p>
                  ) : (
                    <motion.ul
                      key="results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ staggerChildren: 0.03 }}
                      className="space-y-2"
                    >
                      {results.map((product, i) => (
                        <motion.li
                          key={product.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <Link
                            href={`/autoparts/${product.category}/${product.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-4 p-3 rounded-lg bg-primary/80 hover:bg-primary-light/90 transition-colors border border-border/50"
                          >
                            <div className="relative w-[60px] h-[60px] flex-shrink-0 rounded overflow-hidden bg-bg-card">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={product.images?.[0] || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="60" height="60"%3E%3Crect fill="%23112240" width="60" height="60"/%3E%3C/svg%3E'}
                                alt=""
                                width={60}
                                height={60}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-heading font-medium text-accent-chrome truncate">{product.name}</p>
                              <p className="text-sm text-accent-silver truncate">{product.brand}</p>
                            </div>
                            <p className="font-heading font-semibold text-[#E63946] flex-shrink-0">
                              ${(product.salePrice ?? product.price).toFixed(2)}
                            </p>
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
