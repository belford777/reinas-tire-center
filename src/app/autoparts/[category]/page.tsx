import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { getCategoryDisplayName } from '@/lib/utils';
import { CatalogView } from '../CatalogView';
import type { CategorySlug } from '@/lib/types';

interface PageProps {
  params: Promise<{ category: string }>;
}

const validSlugs: CategorySlug[] = [
  'engine-drivetrain',
  'brakes-suspension',
  'electrical-lighting',
  'body-exterior',
  'interior-comfort',
  'wheels-tires',
];

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  if (!validSlugs.includes(category as CategorySlug)) return {};
  const name = getCategoryDisplayName(category);
  return {
    title: `${name} | Reina's Tire Center LLC`,
    description: `Shop ${name} — auto parts from certified manufacturers.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  if (!validSlugs.includes(category as CategorySlug)) notFound();
  const categoryProducts = products.filter((p) => p.category === category);
  const cat = categories.find((c) => c.slug === category);
  const title = cat?.name ?? getCategoryDisplayName(category);

  return (
    <CatalogView
      initialProducts={categoryProducts}
      categorySlug={category as CategorySlug}
      title={title}
    />
  );
}
