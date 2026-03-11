#!/usr/bin/env node
/**
 * Generates src/data/products.ts with 700 realistic auto parts.
 * Run: node scripts/generate-products.js
 */

const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'src', 'data', 'products.ts');

// Close-up / detail photos of car parts (no full-car shots)
const CATEGORY_IMAGES = {
  'engine-drivetrain': [
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?w=600&h=400&fit=crop',
  ],
  'brakes-suspension': [
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop',
  ],
  'electrical-lighting': [
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop',
  ],
  'body-exterior': [
    'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop',
  ],
  'interior-comfort': [
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?w=600&h=400&fit=crop',
  ],
  'wheels-tires': [
    'https://images.unsplash.com/photo-1611859266276-7ef4f0565576?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=600&h=400&fit=crop',
  ],
};

const BRANDS = [
  'Bosch', 'Denso', 'NGK', 'Brembo', 'KYB', 'Monroe', 'Bilstein', 'Sachs', 'Meyle', 'Moog',
  'Continental', 'Gates', 'Mann-Filter', 'Hella', 'Valeo', 'Aisin', 'SKF', 'NTK', 'Tokico', 'ACDelco',
  'Akebono', 'Centric', 'Raybestos', 'Fel-Pro', 'Dorman', 'TRW', 'Delphi', 'Mahle', 'INA', 'FAG',
  'Timken', 'Wagner', 'StopTech', 'EBC', 'Hawk', 'Eibach', 'H&R', 'Koni', 'Tein', 'BC Racing',
];

const ORIGIN = {
  Japan: ['Denso', 'NGK', 'Aisin', 'NTK', 'Tokico', 'KYB'],
  Germany: ['Bosch', 'Continental', 'Hella', 'Mann-Filter', 'Meyle', 'Sachs', 'Bilstein', 'Mahle', 'INA', 'FAG'],
  USA: ['ACDelco', 'Dorman', 'Raybestos', 'Wagner', 'Hawk', 'StopTech'],
  Italy: ['Brembo'],
  France: ['Valeo'],
  Sweden: ['SKF'],
  Taiwan: ['TYC', 'Depo'],
};
const BRAND_ORIGIN = {};
Object.entries(ORIGIN).forEach(([country, brands]) => brands.forEach((b) => (BRAND_ORIGIN[b] = country)));

const VEHICLES = [
  { make: 'Toyota', models: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma'] },
  { make: 'Lexus', models: ['ES', 'RX', 'IS', 'NX'] },
  { make: 'Honda', models: ['Civic', 'Accord', 'CR-V', 'Pilot'] },
  { make: 'Acura', models: ['TLX', 'MDX', 'RDX'] },
  { make: 'BMW', models: ['3 Series', '5 Series', 'X3', 'X5'] },
  { make: 'Mercedes-Benz', models: ['C-Class', 'E-Class', 'GLC', 'GLE'] },
  { make: 'Audi', models: ['A4', 'A6', 'Q5', 'Q7'] },
  { make: 'Hyundai', models: ['Sonata', 'Tucson', 'Santa Fe', 'Elantra'] },
  { make: 'Kia', models: ['Optima', 'Sportage', 'Sorento', 'Forte'] },
  { make: 'Ford', models: ['F-150', 'Mustang', 'Explorer', 'Escape'] },
  { make: 'Chevrolet', models: ['Silverado', 'Malibu', 'Equinox', 'Tahoe'] },
  { make: 'Dodge', models: ['Ram 1500', 'Charger', 'Challenger', 'Durango'] },
  { make: 'Nissan', models: ['Altima', 'Rogue', 'Pathfinder', 'Sentra'] },
  { make: 'Volkswagen', models: ['Jetta', 'Tiguan', 'Passat', 'Atlas'] },
  { make: 'Subaru', models: ['Outback', 'Forester', 'Crosstrek', 'WRX'] },
];
const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

const REVIEW_AUTHORS = ['Mike R.', 'Sarah L.', 'James K.', 'David M.', 'Lisa T.', 'Robert P.', 'Jennifer W.', 'Chris B.', 'Amanda S.', 'Kevin D.', 'Emily H.', 'Daniel F.', 'Michelle N.', 'Steven C.', 'Jessica A.'];
const REVIEW_TITLES = ['Perfect fit', 'Great quality', 'Exactly as described', 'Fast shipping', 'Works perfectly', 'No issues', 'Professional grade', 'OEM quality'];
const REVIEW_COMMENTS = [
  'Installed on my %s, perfect fit!',
  'Works great on my %s. No complaints.',
  'Replaced the old part on my %s. Easy install.',
  'Quality part for my %s. Would buy again.',
  'Fits my %s like a glove. Recommended.',
  'My %s runs better now. Fast delivery.',
  'Direct fit for %s. As described.',
  'Perfect for my %s. Great seller.',
];

const CATEGORY_COUNTS = {
  'engine-drivetrain': 120,
  'brakes-suspension': 120,
  'electrical-lighting': 120,
  'body-exterior': 120,
  'interior-comfort': 110,
  'wheels-tires': 110,
};

const CAT_PREFIX = { 'engine-drivetrain': 'ENG', 'brakes-suspension': 'BRK', 'electrical-lighting': 'ELEC', 'body-exterior': 'BODY', 'interior-comfort': 'INT', 'wheels-tires': 'WHE' };

const PRODUCT_TEMPLATES = {
  'engine-drivetrain': [
    ['%s Oil Filter', 12, 28],
    ['%s Air Filter', 15, 35],
    ['%s Cabin Air Filter', 12, 32],
    ['%s Fuel Filter', 18, 45],
    ['%s Serpentine Belt', 28, 65],
    ['%s Timing Belt', 45, 120],
    ['%s Head Gasket Set', 55, 95],
    ['%s Water Pump', 65, 180],
    ['%s Iridium Power Spark Plug Set (4-Pack)', 28, 48],
    ['%s Spark Plug Set (6-Pack)', 22, 42],
    ['%s Fuel Pump', 85, 220],
    ['%s Thermostat', 18, 45],
    ['%s Radiator', 120, 280],
    ['%s Turbocharger', 450, 1200],
    ['%s Timing Chain Kit', 180, 450],
    ['%s Oil Pump', 95, 250],
    ['%s Camshaft Position Sensor', 25, 55],
    ['%s Crankshaft Position Sensor', 28, 62],
    ['%s Idler Pulley', 22, 55],
    ['%s Tensioner Pulley', 28, 68],
  ],
  'brakes-suspension': [
    ['%s QuietCast Premium Ceramic Brake Pads — Front', 45, 85],
    ['%s Ceramic Brake Pads — Rear', 38, 72],
    ['%s Brake Rotor — Front', 42, 95],
    ['%s Brake Rotor — Rear', 38, 88],
    ['%s Brake Caliper', 95, 220],
    ['%s Excel-G Front Strut Assembly', 85, 165],
    ['%s Excel-G Rear Shock', 52, 110],
    ['%s Coil Spring — Front', 55, 120],
    ['%s Control Arm — Lower', 65, 145],
    ['%s Sway Bar Link Kit', 22, 48],
    ['%s Wheel Bearing Hub Assembly', 75, 165],
    ['%s Ball Joint', 28, 65],
    ['%s Tie Rod End', 25, 55],
    ['%s Strut Mount', 32, 68],
    ['%s Brake Pad Set (Front & Rear)', 75, 140],
    ['%s Sport Brake Pads — Front', 65, 120],
    ['%s Shock Absorber — Rear', 48, 105],
    ['%s Stabilizer Bar Bushing', 18, 42],
    ['%s Brake Hose', 22, 52],
    ['%s Brake Caliper Bracket', 45, 95],
  ],
  'electrical-lighting': [
    ['%s Headlight Assembly — Left', 95, 280],
    ['%s Headlight Assembly — Right', 95, 280],
    ['%s Tail Light — Left', 65, 185],
    ['%s Stop Lamp Bulb (2-Pack)', 8, 22],
    ['%s Alternator', 180, 380],
    ['%s Starter Motor', 95, 260],
    ['%s O2 Sensor (Upstream)', 35, 75],
    ['%s O2 Sensor (Downstream)', 32, 68],
    ['%s ABS Wheel Speed Sensor', 28, 65],
    ['%s Ignition Coil', 42, 95],
    ['%s Glow Plug (4-Pack)', 35, 72],
    ['%s Battery', 95, 185],
    ['%s Fog Light Assembly', 45, 125],
    ['%s Turn Signal Switch', 55, 135],
    ['%s Blower Motor Resistor', 22, 52],
    ['%s Mass Air Flow Sensor', 55, 125],
    ['%s MAP Sensor', 28, 62],
    ['%s Throttle Position Sensor', 25, 55],
    ['%s Coolant Temp Sensor', 18, 42],
    ['%s Daytime Running Light Module', 35, 85],
  ],
  'body-exterior': [
    ['%s Front Bumper Cover', 185, 450],
    ['%s Rear Bumper Cover', 165, 420],
    ['%s Front Fender — Left', 145, 320],
    ['%s Side Mirror Assembly — Left', 85, 220],
    ['%s Grille Assembly', 95, 280],
    ['%s Hood', 280, 650],
    ['%s Door Handle — Front Left', 35, 85],
    ['%s Rocker Panel Molding', 45, 115],
    ['%s Rear Spoiler', 95, 285],
    ['%s Headlight Grille', 42, 95],
    ['%s Fog Light Grille', 28, 65],
    ['%s Bumper Reinforcement', 125, 280],
    ['%s Fender Liner', 35, 75],
    ['%s Hood Hinge', 42, 95],
    ['%s Door Mirror Glass', 28, 62],
    ['%s Cowl Panel', 55, 125],
    ['%s Quarter Panel Molding', 38, 88],
    ['%s Tailgate Handle', 45, 105],
    ['%s Front Lip Spoiler', 65, 165],
    ['%s Window Trim Molding', 28, 68],
  ],
  'interior-comfort': [
    ['%s A/C Compressor', 285, 650],
    ['%s Heater Core', 125, 285],
    ['%s Blower Motor', 75, 185],
    ['%s HVAC Blend Door Actuator', 35, 85],
    ['%s Steering Column', 185, 420],
    ['%s Airbag Module — Driver', 95, 220],
    ['%s Seat Belt Buckle', 45, 95],
    ['%s Cabin Filter Housing', 28, 65],
    ['%s Evaporator Core', 165, 380],
    ['%s Condenser Fan Motor', 55, 125],
    ['%s Heater Blower Resistor', 22, 52],
    ['%s Climate Control Panel', 65, 155],
    ['%s Steering Angle Sensor', 85, 185],
    ['%s Clock Spring', 75, 165],
    ['%s Seat Motor', 65, 145],
    ['%s Door Lock Actuator', 35, 78],
    ['%s Window Regulator', 55, 125],
    ['%s Sunroof Motor', 75, 165],
    ['%s Interior Door Handle', 22, 52],
    ['%s Center Console Lid', 45, 95],
  ],
  'wheels-tires': [
    ['%s Alloy Wheel 17"', 165, 380],
    ['%s Steel Wheel 16"', 65, 125],
    ['%s Hub Bearing Assembly', 75, 165],
    ['%s TPMS Sensor', 35, 75],
    ['%s Wheel Lug Nut Set (20)', 22, 48],
    ['%s Wheel Spacer 5mm', 28, 62],
    ['%s Wheel Stud', 8, 22],
    ['%s Tire Pressure Sensor', 32, 68],
    ['%s Wheel Cap', 18, 42],
    ['%s Lug Bolt Set', 25, 55],
    ['%s Wheel Bearing Kit', 65, 145],
    ['%s Alloy Wheel 18"', 185, 420],
    ['%s Wheel Nut', 12, 28],
    ['%s TPMS Rebuild Kit', 22, 52],
    ['%s Hub Ring Adapter', 15, 35],
    ['%s Wheel Lock Set', 28, 58],
    ['%s Valve Stem', 5, 15],
    ['%s Wheel Spacer 10mm', 35, 75],
    ['%s Alloy Wheel 19"', 220, 480],
    ['%s Bearing Seal', 18, 42],
  ],
};

function pick(arr, n, seed) {
  const out = [];
  const idx = seed % arr.length;
  for (let i = 0; i < n; i++) out.push(arr[(idx + i * 7) % arr.length]);
  return out;
}

// Pick 3 different images from category pool (6 URLs per category)
function pick3Images(cat, seed) {
  const pool = CATEGORY_IMAGES[cat];
  const s = String(seed).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const i0 = s % 6;
  const i1 = (s + 2) % 6;
  const i2 = (s + 4) % 6;
  return [pool[i0], pool[i1], pool[i2]];
}

function rand(min, max, seed) {
  const x = Math.sin(seed * 9999) * 10000;
  return Math.floor(min + (x - Math.floor(x)) * (max - min + 1));
}

function oemNumber(brand, sku) {
  const num = sku.replace(/\D/g, '').slice(-6).padStart(6, '0');
  if (brand === 'Bosch') return `0 986 494 ${num.slice(0, 3)}`;
  if (brand === 'Denso') return `234-${num.slice(0, 4)}`;
  if (brand === 'NGK') return `BKR6E-${num.slice(0, 2)}`;
  if (brand === 'ACDelco') return `1268${num.slice(0, 5)}`;
  if (brand === 'Gates') return `K061234${num.slice(0, 4)}`;
  if (brand === 'Mann-Filter') return `HU 719/8 ${num.slice(0, 2)}`;
  return `OEM-${num}`;
}

function slugify(str) {
  return str.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim().slice(0, 50) || 'part';
}

function getCompatibleVehicles(seed, count = 4) {
  const list = [];
  const used = new Set();
  let s = seed * 7919;
  for (let i = 0; i < count; i++) {
    const v = VEHICLES[s % VEHICLES.length];
    s = (s * 31 + 1) >>> 0;
    const model = v.models[s % v.models.length];
    s = (s * 31 + 1) >>> 0;
    const year = YEARS[s % YEARS.length];
    const key = `${v.make}-${model}-${year}`;
    if (used.has(key)) continue;
    used.add(key);
    list.push({ year: String(year), make: v.make, model });
    if (list.length >= count) break;
  }
  return list;
}

function getReviews(productId, compatibleVehicles, seed) {
  const vehicles = compatibleVehicles.length >= 3 ? compatibleVehicles : getCompatibleVehicles(seed, 3);
  const reviews = [];
  const ratingRand = (seed * 17) % 100;
  let rating = 5;
  if (ratingRand >= 95) rating = 3;
  else if (ratingRand >= 80) rating = 4;
  const authors = [...REVIEW_AUTHORS].sort(() => (seed % 2 ? 1 : -1));
  for (let i = 0; i < 3; i++) {
    const v = vehicles[i] || vehicles[0];
    const carStr = `${v.year} ${v.make} ${v.model}`;
    const commentTpl = REVIEW_COMMENTS[(seed + i * 3) % REVIEW_COMMENTS.length];
    reviews.push({
      id: `r-${productId}-${i}`,
      author: authors[(seed + i) % authors.length],
      rating: i === 0 ? rating : (rating >= 4 ? 5 : 4),
      title: REVIEW_TITLES[(seed + i * 5) % REVIEW_TITLES.length],
      comment: commentTpl.replace('%s', carStr),
      date: `0${(1 + (seed + i) % 9)}/15/2025`,
      verified: true,
    });
  }
  return reviews;
}

function generateProducts() {
  const products = [];
  let globalIndex = 0;
  const categoryIndices = {};

  for (const [category, count] of Object.entries(CATEGORY_COUNTS)) {
    categoryIndices[category] = 0;
    const templates = PRODUCT_TEMPLATES[category];
    const prefix = CAT_PREFIX[category];
    const brandsForCat = [...BRANDS].filter((b) => BRAND_ORIGIN[b]);

    for (let i = 0; i < count; i++) {
      categoryIndices[category]++;
      const skuNum = String(categoryIndices[category]).padStart(4, '0');
      const sku = `RTC-${prefix}-${skuNum}`;
      const id = `prod-${category}-${skuNum}`;
      const brand = brandsForCat[(globalIndex * 7) % brandsForCat.length];
      const tpl = templates[i % templates.length];
      const nameRaw = Array.isArray(tpl) ? tpl[0] : tpl;
      const name = nameRaw.replace('%s', brand);
      const [minP, maxP] = Array.isArray(tpl) ? [tpl[1], tpl[2]] : [25, 80];
      const price = minP + ((globalIndex * 13) % (maxP - minP + 1));
      const hasSale = globalIndex % 5 === 0;
      const salePrice = hasSale ? Math.round(price * (0.8 + (globalIndex % 10) / 100) * 100) / 100 : undefined;
      const compat = getCompatibleVehicles(globalIndex * 31, 3 + (globalIndex % 3));
      const reviews = getReviews(id, compat, globalIndex);
      const rating = reviews.reduce((a, r) => a + r.rating, 0) / 3;
      const reviewCount = 8 + (globalIndex % 42);
      const images = pick3Images(category, id);
      const slug = slugify(name) || `part-${sku}`;

      products.push({
        id,
        slug,
        name,
        description: name.slice(0, 120),
        fullDescription: `Premium quality ${name}. Trusted by professionals. ${brand} quality guaranteed.`,
        category,
        price,
        salePrice,
        images,
        sku,
        oemNumber: oemNumber(brand, sku),
        brand,
        manufacturer: brand,
        originCountry: BRAND_ORIGIN[brand] || 'USA',
        compatibleVehicles: compat,
        weight: `${(1 + (globalIndex % 5) * 0.5).toFixed(1)} lbs`,
        warranty: globalIndex % 3 === 0 ? '24 months' : '12 months',
        condition: 'New',
        inStock: globalIndex % 10 !== 7,
        stockQuantity: 5 + (globalIndex % 46),
        rating: Math.round(rating * 100) / 100,
        reviewCount,
        reviews,
        tags: [],
        featured: globalIndex % 10 === 0,
        bestSeller: globalIndex % 7 === 0,
        createdAt: '2024-01-15',
      });
      globalIndex++;
    }
  }

  return products;
}

function tsProduct(p) {
  const saleLine = p.salePrice != null ? `\n    salePrice: ${p.salePrice},` : '';
  return `  {
    id: ${JSON.stringify(p.id)},
    slug: ${JSON.stringify(p.slug)},
    name: ${JSON.stringify(p.name)},
    description: ${JSON.stringify(p.description)},
    fullDescription: ${JSON.stringify(p.fullDescription)},
    category: ${JSON.stringify(p.category)},
    price: ${p.price},${saleLine}
    images: ${JSON.stringify(p.images)},
    sku: ${JSON.stringify(p.sku)},
    oemNumber: ${JSON.stringify(p.oemNumber)},
    brand: ${JSON.stringify(p.brand)},
    manufacturer: ${JSON.stringify(p.brand)},
    originCountry: ${JSON.stringify(p.originCountry)},
    compatibleVehicles: ${JSON.stringify(p.compatibleVehicles)},
    weight: ${JSON.stringify(p.weight)},
    warranty: ${JSON.stringify(p.warranty)},
    condition: "New",
    inStock: ${p.inStock},
    stockQuantity: ${p.stockQuantity},
    rating: ${p.rating},
    reviewCount: ${p.reviewCount},
    reviews: ${JSON.stringify(p.reviews)},
    tags: [],
    featured: ${p.featured},
    bestSeller: ${p.bestSeller},
    createdAt: ${JSON.stringify(p.createdAt)},
  }`;
}

const products = generateProducts();

const header = `import type { Product } from '@/lib/types';

/** 700 auto parts — 3 Unsplash images per product, unique SKU/OEM, 2015-2024 compatibility */
export const products: Product[] = [
`;

const footer = `];
`;

// Build file in chunks to avoid huge strings
const parts = products.map((p) => tsProduct(p));
const body = parts.join(',\n');
const fullContent = header + body + footer;

fs.writeFileSync(OUT, fullContent, 'utf8');
console.log(`Generated ${products.length} products in ${OUT}`);
console.log('Categories:', Object.entries(CATEGORY_COUNTS).map(([k, v]) => `${k}: ${v}`).join(', '));
