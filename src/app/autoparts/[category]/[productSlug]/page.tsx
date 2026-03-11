import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { getCategoryDisplayName, formatPrice } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ImageGallery } from '@/components/product/ImageGallery';
import { SpecsTable } from '@/components/product/SpecsTable';
import { ReviewSection } from '@/components/product/ReviewSection';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { ProductActions } from './ProductActions';
import { StarRating } from '@/components/ui/StarRating';
import type { CategorySlug } from '@/lib/types';

interface PageProps {
  params: Promise<{ category: string; productSlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { category, productSlug } = await params;
  const product = products.find(
    (p) => p.category === category && p.slug === productSlug
  );
  if (!product) return {};
  return {
    title: `${product.name} | Reina's Tire Center LLC`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { category, productSlug } = await params;
  const product = products.find(
    (p) => p.category === category && p.slug === productSlug
  );
  if (!product) notFound();

  const cat = categories.find((c) => c.slug === product.category);
  const categoryName = cat?.name ?? getCategoryDisplayName(product.category);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Auto Parts', href: '/autoparts' },
    { label: categoryName, href: `/autoparts/${product.category}` },
    { label: product.name },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brand },
    offers: {
      '@type': 'Offer',
      price: product.salePrice ?? product.price,
      priceCurrency: 'USD',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-container mx-auto px-4 md:px-6">
        <Breadcrumb items={breadcrumbs} />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-8">
          <div>
            <ImageGallery images={product.images} name={product.name} />
          </div>
          <div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-accent-chrome">
              {product.name}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <StarRating rating={product.rating} showValue reviewCount={product.reviewCount} />
            </div>
            <div className="mt-4 flex items-center gap-3">
              {product.salePrice != null ? (
                <>
                  <span className="text-danger line-through font-body">
                    {formatPrice(product.price)}
                  </span>
                  <span className="font-heading font-bold text-2xl text-[#E63946]">
                    {formatPrice(product.salePrice)}
                  </span>
                </>
              ) : (
                <span className="font-heading font-bold text-2xl text-[#E63946]">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <p className="mt-4 text-text-muted font-body">{product.description}</p>
            <SpecsTable product={product} />
            <ProductActions product={product} />
            <p className="mt-4 text-text-muted text-sm font-body">
              Usually ships within 24–48 hours.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded-button bg-success/20 text-success text-xs font-heading uppercase tracking-wider">
                Quality Guaranteed
              </span>
              <span className="px-2 py-1 rounded-button bg-primary-light text-accent-silver text-xs font-heading uppercase tracking-wider">
                Licensed Import
              </span>
              <span className="px-2 py-1 rounded-button bg-primary-light text-accent-silver text-xs font-heading uppercase tracking-wider">
                Warranty Included
              </span>
            </div>
          </div>
        </div>

        <ReviewSection product={product} />
        <RelatedProducts products={related} />
      </div>
    </div>
  );
}

