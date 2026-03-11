import { products } from '@/data/products';
import { CatalogView } from './CatalogView';

export const metadata = {
  title: 'Auto Parts Catalog | Reina\'s Tire Center LLC',
  description: 'Browse our full catalog of OEM and aftermarket auto parts. Engine, brakes, electrical, body, interior, wheels & tires.',
};

export default function AutopartsPage() {
  return <CatalogView initialProducts={products} categorySlug={null} />;
}
