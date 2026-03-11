'use client';

import { useState } from 'react';
import { categories } from '@/data/categories';
import type { CategorySlug } from '@/lib/types';
import { getCategoryDisplayName } from '@/lib/utils';

// Only brands that have products in catalog (matches compatibleVehicles[].make from products)
const MAKES = ['Toyota', 'Lexus', 'Honda', 'Acura', 'BMW', 'Mercedes', 'Audi', 'Hyundai', 'Kia'];
const ORIGINS = ['Japan', 'South Korea', 'China', 'Germany', 'Taiwan', 'Thailand'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
  { value: 'bestseller', label: 'Best Sellers' },
];

export interface FilterState {
  categories: CategorySlug[];
  make: string;
  priceMin: number;
  priceMax: number;
  origins: string[];
  condition: 'all' | 'New' | 'Refurbished';
  inStockOnly: boolean;
  sort: string;
}

const defaultFilters: FilterState = {
  categories: [],
  make: '',
  priceMin: 0,
  priceMax: 2000,
  origins: [],
  condition: 'all',
  inStockOnly: false,
  sort: 'newest',
};

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  resultCount: number;
}

export function FilterSidebar({ filters, onFiltersChange, resultCount }: FilterSidebarProps) {
  const [open, setOpen] = useState(false);

  const update = (partial: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  const toggleCategory = (slug: CategorySlug) => {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug];
    update({ categories: next });
  };

  const toggleOrigin = (origin: string) => {
    const next = filters.origins.includes(origin)
      ? filters.origins.filter((o) => o !== origin)
      : [...filters.origins, origin];
    update({ origins: next });
  };

  const clearAll = () => {
    onFiltersChange({ ...defaultFilters });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-4 left-4 right-4 z-30 py-3 bg-[#E63946] text-white font-heading font-semibold rounded-[4px] uppercase tracking-wider"
      >
        Filters ({resultCount} results)
      </button>

      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? 'block' : 'hidden'}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        className={`
          w-full lg:w-72 flex-shrink-0
          lg:block fixed lg:static top-0 right-0 bottom-0 z-50 lg:z-auto
          bg-primary border-l border-border overflow-y-auto
          transform transition-transform duration-200
          ${open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center lg:border-b border-border lg:pb-4">
            <h3 className="font-display text-xl text-accent-chrome tracking-wider">Filters</h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="lg:hidden p-2 text-accent-silver"
              aria-label="Close filters"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-accent-chrome text-sm uppercase mb-2">Category</h4>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat.slug} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.categories.length === 0 || filters.categories.includes(cat.slug)}
                    onChange={() => toggleCategory(cat.slug)}
                    className="rounded-[4px] border-border text-[#E63946] focus:ring-[#E63946]"
                  />
                  <span className="text-sm font-body text-accent-silver">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-accent-chrome text-sm uppercase mb-2">Vehicle Make</h4>
            <select
              value={filters.make}
              onChange={(e) => update({ make: e.target.value })}
              className="w-full px-3 py-2 rounded-[4px] bg-bg-card border border-border text-white font-body text-sm"
            >
              <option value="">All Makes</option>
              {MAKES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-accent-chrome text-sm uppercase mb-2">Price Range</h4>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min={0}
                max={filters.priceMax}
                value={filters.priceMin}
                onChange={(e) => update({ priceMin: Number(e.target.value) || 0 })}
                className="w-24 px-2 py-2 rounded-[4px] bg-bg-card border border-border text-white text-sm"
              />
              <span className="text-text-muted">–</span>
              <input
                type="number"
                min={filters.priceMin}
                value={filters.priceMax}
                onChange={(e) => update({ priceMax: Number(e.target.value) || 2000 })}
                className="w-24 px-2 py-2 rounded-[4px] bg-bg-card border border-border text-white text-sm"
              />
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-accent-chrome text-sm uppercase mb-2">Origin</h4>
            <div className="space-y-2">
              {ORIGINS.map((o) => (
                <label key={o} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.origins.includes(o)}
                    onChange={() => toggleOrigin(o)}
                    className="rounded-[4px] border-border text-[#E63946] focus:ring-[#E63946]"
                  />
                  <span className="text-sm font-body text-accent-silver">{o}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-accent-chrome text-sm uppercase mb-2">Condition</h4>
            <div className="space-y-2">
              {(['all', 'New', 'Refurbished'] as const).map((c) => (
                <label key={c} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    checked={filters.condition === c}
                    onChange={() => update({ condition: c })}
                    className="border-border text-[#E63946] focus:ring-[#E63946]"
                  />
                  <span className="text-sm font-body text-accent-silver">{c === 'all' ? 'All' : c}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => update({ inStockOnly: e.target.checked })}
              className="rounded-[4px] border-border text-[#E63946] focus:ring-[#E63946]"
            />
            <span className="text-sm font-body text-accent-silver">In Stock Only</span>
          </label>

          <div>
            <h4 className="font-heading font-semibold text-accent-chrome text-sm uppercase mb-2">Sort By</h4>
            <select
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value })}
              className="w-full px-3 py-2 rounded-[4px] bg-bg-card border border-border text-white font-body text-sm"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={clearAll}
            className="w-full py-2 border border-border text-accent-silver font-body text-sm rounded-[4px] hover:bg-primary-light transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </aside>
    </>
  );
}
