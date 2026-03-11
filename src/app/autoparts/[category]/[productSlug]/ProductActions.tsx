'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-4">
        <label htmlFor="qty" className="font-heading font-medium text-accent-silver text-sm">
          Quantity
        </label>
        <input
          id="qty"
          type="number"
          min={1}
          max={product.stockQuantity}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          className="w-20 px-3 py-2 rounded-[4px] bg-bg-card border border-border text-white font-body"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => addToCart(product, qty)}
          disabled={!product.inStock}
          className="px-8 py-4 bg-[#E63946] text-white font-heading font-bold rounded-[4px] uppercase tracking-wider hover:bg-[#C1121F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Add to Cart
        </button>
        <Link
          href="/contact"
          className="px-6 py-4 border-2 border-white text-white font-heading font-semibold rounded-[4px] uppercase tracking-wider hover:border-[#E63946] hover:text-[#E63946] transition-colors inline-flex items-center"
        >
          Call to Order
        </Link>
      </div>
    </div>
  );
}
