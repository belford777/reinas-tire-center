'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const { state, removeFromCart, updateQuantity, toggleCart, itemCount } = useCart();

  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [state.isOpen]);

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={toggleCart}
            aria-hidden
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-primary border-l border-[rgba(255,255,255,0.1)] z-50 flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-xl text-accent-chrome tracking-wider">
                CART ({itemCount})
              </h2>
              <button
                type="button"
                onClick={toggleCart}
                className="p-2 text-accent-silver hover:text-white rounded"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <p className="text-text-muted font-body text-center py-12">
                  Your cart is empty. Browse our auto parts to get started.
                </p>
              ) : (
                <ul className="space-y-4">
                  {state.items.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex gap-4 pb-4 border-b border-border last:border-0"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-card bg-bg-card overflow-hidden">
                        <Image
                          src={item.product.images[0] || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/autoparts/${item.product.category}/${item.product.slug}`}
                          onClick={toggleCart}
                          className="font-heading font-semibold text-white text-sm hover:text-[#E63946] line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-[#E63946] font-heading font-semibold mt-1">
                          {formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-button bg-bg-card text-accent-chrome hover:bg-primary-light flex items-center justify-center text-sm"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-body" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-button bg-bg-card text-accent-chrome hover:bg-primary-light flex items-center justify-center text-sm"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="ml-2 text-danger text-xs font-body hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {state.items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <p className="font-heading font-semibold text-accent-chrome flex justify-between text-lg">
                  Subtotal
                  <span className="text-[#E63946]">
                    {formatPrice(
                      state.items.reduce(
                        (sum, i) => sum + (i.product.salePrice ?? i.product.price) * i.quantity,
                        0
                      )
                    )}
                  </span>
                </p>
                <p className="text-text-muted text-sm font-body">
                  Contact us to complete your order. We&apos;ll confirm availability and payment.
                </p>
                <Link
                  href="/contact"
                  onClick={toggleCart}
                  className="block w-full text-center bg-[#E63946] text-white font-heading font-semibold py-3 px-6 rounded-[4px] uppercase tracking-wider hover:bg-[#C1121F] transition-colors duration-200"
                >
                  Contact Us to Complete Order
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
