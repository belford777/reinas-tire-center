// Типы для Reina's Tire Center

export type CategorySlug =
  | 'engine-drivetrain'
  | 'brakes-suspension'
  | 'electrical-lighting'
  | 'body-exterior'
  | 'interior-comfort'
  | 'wheels-tires';

export interface CompatibleVehicle {
  year: string;
  make: string;
  model: string;
  submodel?: string;
  engine?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  fullDescription: string;
  category: CategorySlug;
  price: number;
  salePrice?: number;
  images: string[];
  sku: string;
  oemNumber: string;
  brand: string;
  manufacturer: string;
  originCountry: string;
  compatibleVehicles: CompatibleVehicle[];
  material?: string;
  weight: string;
  warranty: string;
  condition: 'New' | 'Refurbished';
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  tags: string[];
  featured: boolean;
  bestSeller: boolean;
  createdAt: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  business: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
