import type { Category } from '@/lib/types';

export const categories: Category[] = [
  {
    slug: 'engine-drivetrain',
    name: 'Engine & Drivetrain',
    description: 'Engine components, transmissions, belts, gaskets, oil filters, fuel systems',
  },
  {
    slug: 'brakes-suspension',
    name: 'Brakes & Suspension',
    description: 'Brake pads, rotors, calipers, shocks, struts, control arms, springs',
  },
  {
    slug: 'electrical-lighting',
    name: 'Electrical & Lighting',
    description: 'Headlights, taillights, alternators, starters, batteries, wiring harnesses',
  },
  {
    slug: 'body-exterior',
    name: 'Body & Exterior',
    description: 'Bumpers, fenders, mirrors, grilles, hoods, door handles, trim',
  },
  {
    slug: 'interior-comfort',
    name: 'Interior & Comfort',
    description: 'Seats, dashboard parts, AC components, steering wheels, floor mats',
  },
  {
    slug: 'wheels-tires',
    name: 'Wheels & Tires',
    description: 'Alloy wheels, steel wheels, tires, TPMS sensors',
  },
];
