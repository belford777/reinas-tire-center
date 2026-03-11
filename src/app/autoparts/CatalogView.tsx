'use client';

import { useMemo, useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import type { CategorySlug } from '@/lib/types';
import { ProductCard } from '@/components/catalog/ProductCard';
import { FilterSidebar, type FilterState } from '@/components/catalog/FilterSidebar';
import { Pagination } from '@/components/catalog/Pagination';

const PER_PAGE = 20;

interface CatalogViewProps {
  initialProducts: Product[];
  categorySlug: CategorySlug | null;
  title?: string;
  hideTitle?: boolean;
}

export function CatalogView({ initialProducts, categorySlug, title, hideTitle }: CatalogViewProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: categorySlug ? [categorySlug] : [],
    make: '',
    priceMin: 0,
    priceMax: 2000,
    origins: [],
    condition: 'all',
    inStockOnly: false,
    sort: 'newest',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...initialProducts];
    if (filters.categories.length > 0) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.make) {
      list = list.filter((p) =>
        p.compatibleVehicles.some((v) => v.make.toLowerCase() === filters.make.toLowerCase())
      );
    }
    const price = (p: Product) => p.salePrice ?? p.price;
    list = list.filter((p) => price(p) >= filters.priceMin && price(p) <= filters.priceMax);
    if (filters.origins.length > 0) {
      list = list.filter((p) => filters.origins.includes(p.originCountry));
    }
    if (filters.condition !== 'all') {
      list = list.filter((p) => p.condition === filters.condition);
    }
    if (filters.inStockOnly) {
      list = list.filter((p) => p.inStock);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.sku && String(p.sku).toLowerCase().includes(q)) ||
          (p.oemNumber && String(p.oemNumber).toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          p.compatibleVehicles.some(
            (v) =>
              (v.make && v.make.toLowerCase().includes(q)) ||
              (v.model && v.model.toLowerCase().includes(q)) ||
              (v.year && String(v.year).toLowerCase().includes(q))
          )
      );
    }
    switch (filters.sort) {
      case 'price-asc':
        list.sort((a, b) => price(a) - price(b));
        break;
      case 'price-desc':
        list.sort((a, b) => price(b) - price(a));
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'bestseller':
        list.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
        break;
      default:
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return list;
  }, [initialProducts, filters, searchQuery]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = useMemo(
    () => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [filtered, page]
  );

  useEffect(() => {
    setPage(1);
  }, [filters, searchQuery]);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#0B0B0F]">
      <div className="max-w-container mx-auto px-4 md:px-6">
        {!hideTitle && (
          <h1 className="font-display text-4xl md:text-5xl text-accent-chrome tracking-wider mb-4">
            {title ?? 'Auto Parts Catalog'}
          </h1>
        )}
        <div className="mb-6">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, SKU, OEM, or vehicle..."
            className="w-full max-w-md px-4 py-3 rounded-[4px] bg-bg-card border border-border text-white placeholder-text-muted font-body focus:border-[#E63946] focus:outline-none transition-colors"
            aria-label="Search products"
          />
        </div>
        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            resultCount={filtered.length}
          />
          <div className="flex-1 min-w-0">
            <p className="text-text-muted font-body mb-6">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            </p>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginated.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-text-muted font-body text-center py-16">
                No products match your filters. Try adjusting your selection.
              </p>
            )}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
