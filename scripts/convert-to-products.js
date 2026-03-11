#!/usr/bin/env node
/**
 * Converts TecDoc raw data (scripts/tecdoc-raw-data.json) to src/data/products.ts
 * Usage: node scripts/convert-to-products.js
 */

const fs = require('fs');
const path = require('path');

const RAW_PATH = path.join(__dirname, 'tecdoc-raw-data.json');
const OUT_PATH = path.join(__dirname, '..', 'src', 'data', 'products.ts');

const BRAND_ORIGIN = {
  Bosch: 'Germany', Denso: 'Japan', Gates: 'USA', 'Mann-Filter': 'Germany', Aisin: 'Japan',
  NGK: 'Japan', Continental: 'Germany', Valeo: 'France', Brembo: 'Italy', KYB: 'Japan',
  Sachs: 'Germany', Meyle: 'Germany', Hella: 'Germany', TRW: 'USA', Delphi: 'USA',
  ACDelco: 'USA', Dorman: 'USA', Mahle: 'Germany', SKF: 'Sweden', Timken: 'USA',
  Sinatec: 'Germany', 'K&K Marderabwehr': 'Germany',
};

// Map API manufacturer names to exact filter dropdown values (FilterSidebar MAKES)
const MAKE_TO_FILTER = {
  'Toyota': 'Toyota', 'TOYOTA': 'Toyota',
  'Lexus': 'Lexus', 'LEXUS': 'Lexus',
  'Honda': 'Honda', 'HONDA': 'Honda',
  'Acura': 'Acura', 'ACURA': 'Acura',
  'BMW': 'BMW',
  'Mercedes-Benz': 'Mercedes', 'MERCEDES-BENZ': 'Mercedes', 'Mercedes': 'Mercedes',
  'Audi': 'Audi', 'AUDI': 'Audi',
  'Hyundai': 'Hyundai', 'HYUNDAI': 'Hyundai',
  'Kia': 'Kia', 'KIA': 'Kia',
};

function normalizeMakeToFilter(manufacturerName) {
  if (!manufacturerName || typeof manufacturerName !== 'string') return 'Vehicle';
  const key = manufacturerName.trim();
  if (MAKE_TO_FILTER[key]) return MAKE_TO_FILTER[key];
  const lower = key.toLowerCase();
  for (const [api, filterVal] of Object.entries(MAKE_TO_FILTER)) {
    if (api.toLowerCase() === lower) return filterVal;
  }
  return key;
}

// Fallback images by category when TecDoc returns no/empty/invalid image (must match FilterSidebar ORIGINS for origin)
const FALLBACK_IMAGES = {
  'engine-drivetrain': [
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=600&h=400&fit=crop',
  ],
  'brakes-suspension': [
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?w=600&h=400&fit=crop',
  ],
  'electrical-lighting': [
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&h=400&fit=crop',
  ],
  'body-exterior': [
    'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop',
  ],
  'interior-comfort': [
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop',
  ],
  'wheels-tires': [
    'https://images.unsplash.com/photo-1611859266276-7ef4f0565576?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop',
  ],
};

const UNSPLASH_BY_CATEGORY = FALLBACK_IMAGES;

const REVIEW_AUTHORS = ['Mike R.', 'Sarah L.', 'James K.', 'David M.', 'Lisa T.', 'Robert P.', 'Jennifer W.', 'Chris B.', 'Amanda S.', 'Kevin D.'];
const REVIEW_TITLES = ['Perfect fit', 'Great quality', 'Exactly as described', 'Fast shipping', 'Works perfectly', 'No issues'];

const VEHICLE_MAKES = ['Toyota', 'Lexus', 'Honda', 'Acura', 'BMW', 'Mercedes', 'Audi', 'Hyundai', 'Kia'];
const VEHICLE_MODELS = ['Camry', 'RX 350', 'Accord', 'TLX', '3 Series', 'C-Class', 'A4', 'Sonata', 'Optima'];

const GENERATED_ELECTRICAL = [
  'Headlight Assembly', 'Taillight Assembly', 'Fog Light Kit', 'LED Headlight Bulb Set', 'Halogen Bulb H7', 'Halogen Bulb H11', 'Turn Signal Light', 'Alternator', 'Starter Motor', 'Ignition Coil', 'Spark Plug Set', 'O2 Sensor', 'ABS Sensor', 'Crankshaft Position Sensor', 'MAF Sensor', 'Throttle Position Sensor', 'Wiring Harness', 'Fuse Box', 'Battery Terminal', 'Horn', 'Backup Camera',
];
const GENERATED_ELECTRICAL_BRANDS = ['Bosch', 'Hella', 'Denso', 'Valeo', 'Philips', 'Osram', 'ACDelco', 'Delphi'];

const GENERATED_BODY = [
  'Front Bumper Cover', 'Rear Bumper Cover', 'Fender', 'Hood', 'Grille', 'Side Mirror', 'Door Handle', 'Weatherstrip', 'Windshield Wiper Blade', 'Wiper Motor', 'Door Lock Actuator', 'Window Regulator', 'Trunk Lid', 'Quarter Panel', 'Rocker Panel', 'Mud Flap', 'License Plate Frame', 'Antenna', 'Gas Cap', 'Body Clip Set',
];
const GENERATED_BODY_BRANDS = ['Dorman', 'TYC', 'Depo', 'OE Replacement', 'Sherman', 'Crash Parts'];

const GENERATED_INTERIOR = [
  'AC Compressor', 'AC Condenser', 'Heater Core', 'Blower Motor', 'Cabin Air Filter', 'Steering Wheel Cover', 'Floor Mat Set', 'Seat Cover', 'Sun Visor', 'Dashboard Cover', 'Center Console Lid', 'Door Panel Trim', 'Climate Control Unit', 'Power Window Switch', 'Door Mirror Switch', 'Instrument Cluster', 'Glove Box Latch', 'Armrest Cover', 'Shift Knob', 'Pedal Pad Set',
];
const GENERATED_INTERIOR_BRANDS = ['Denso', 'Valeo', 'Four Seasons', 'UAC', 'GPD', 'Dorman'];

// Must return only FilterSidebar ORIGINS: Japan, South Korea, China, Germany, Taiwan, Thailand
function getOriginForBrand(brand) {
  const s = (brand || '').toLowerCase();
  if (/denso|philips|osram/.test(s)) return 'Japan';
  if (/bosch|hella|valeo|continental|depo|acdelco|dorman|delphi|sherman|uac|gpd|four seasons/.test(s)) return 'Germany';
  if (/tyc|yuan/.test(s)) return 'Taiwan';
  return 'Germany';
}

function slugify(str) {
  if (!str || typeof str !== 'string') return 'part';
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 50) || 'part';
}

// Must match download-tecdoc-images.js filename sanitization
function sanitizeArticleIdForFile(id) {
  return String(id).replace(/[^a-zA-Z0-9_-]/g, '_');
}

// STRICT mapping: only assign to electrical/body/interior when clearly matching. Ball joints, bearings, hubs → brakes-suspension.
function mapCategory(categories, productName) {
  const text = [...(categories || []).map((c) => c.categoryName || ''), productName || ''].join(' ').toLowerCase();

  // 1) Brakes & Suspension FIRST — ball joint, stabilizer, control arm, bearing, hub, strut mount, tie rod, wheel bearing kit
  if (/ball joint|stabilizer|sway bar|control arm|tie rod|steering rack|strut mount|wheel bearing|hub.*bearing|bearing.*kit|brake|pad|rotor|disc.*brake|caliper|suspension|shock|absorber|strut|spring|bushing|mount.*suspension|anti.*roll|power steering|axle.*mount|steering.*link/.test(text)) {
    return 'brakes-suspension';
  }

  // 2) Wheels & Tires — only clear tire/rim parts (NOT wheel bearing)
  if (/\btire\b|tyre|rim\b|tpms|lug nut|wheel bolt|wheel nut|hubcap|wheel cover|valve stem|spacer.*wheel/.test(text)) {
    return 'wheels-tires';
  }
  if (/\bwheel\b/.test(text) && !/bearing|hub|steering|mount|link/.test(text)) {
    return 'wheels-tires';
  }

  // 3) Electrical & Lighting — only clear electrical/lighting
  if (/headlight|taillight|fog light|bulb|lamp|led|lighting|alternator|starter motor|generator|ignition coil|spark plug|glow plug|wiring|harness|fuse|relay|horn|battery|backup camera/.test(text)) {
    return 'electrical-lighting';
  }
  if (/\bsensor\b/.test(text) && /o2|oxygen|abs|crank|maf|throttle|position|speed/.test(text)) {
    return 'electrical-lighting';
  }

  // 4) Body & Exterior — only clear body parts
  if (/bumper|fender|hood|bonnet|grille|grill|door handle|wing mirror|side mirror|trim|moulding|molding|spoiler|roof|wiper blade|wiper motor|windshield|windscreen|washer|trunk|tailgate|quarter panel|rocker panel|mud flap|antenna|gas cap|body clip/.test(text)) {
    return 'body-exterior';
  }

  // 5) Interior & Comfort — only clear interior (NOT steering wheel alone with suspension context)
  if (/cabin|seat cover|dashboard|heater core|blower motor|cabin air filter|floor mat|sun visor|glove box|center console|climate control|window regulator|window switch|instrument cluster|armrest|shift knob|pedal pad/.test(text)) {
    return 'interior-comfort';
  }
  if (/ac compressor|a\/c compressor|condenser|evaporator|air condition/.test(text)) {
    return 'interior-comfort';
  }

  // 6) Engine & Drivetrain — default for engine, filter, belt, gasket, pump, etc.
  return 'engine-drivetrain';
}

// Returns exact values matching FilterSidebar ORIGINS: Japan, South Korea, China, Germany, Taiwan, Thailand
function getOriginCountry(supplierName) {
  const s = (supplierName || '').toLowerCase();
  if (/denso|nsk|aisin|koyo|ntk|tokico|kyb|ngk|hitachi|mitsubishi|sumitomo/.test(s)) return 'Japan';
  if (/bosch|continental|hella|mann|meyle|sachs|bilstein|mahle|ina|fag|behr|lemförder|febi|swag|vaico|elring/.test(s)) return 'Germany';
  if (/mando|hyundai|mobis|korean|doowon|parts-mall|ctrlac/.test(s)) return 'South Korea';
  if (/tyc|depo|yuan/.test(s)) return 'Taiwan';
  if (/febest|masuma|sat|lynx/.test(s)) return 'China';
  if (/thailand|thai/.test(s)) return 'Thailand';
  if (/acdelco|dorman|raybestos|wagner|hawk|stoptech|motorcraft/.test(s)) return 'Germany';
  if (/brembo|magneti|marelli|dayco|pirelli|valeo|snr|hutchinson|skf/.test(s)) return 'Germany';
  return 'Germany';
}

function rand(min, max) {
  return Math.round((min + Math.random() * (max - min)) * 100) / 100;
}

function getPrice(name, category) {
  const n = (name || '').toLowerCase();
  if (/compressor|turbo|radiator|headlight assembly|bumper|catalytic/.test(n)) return rand(300, 800);
  if (/alternator|starter|caliper|strut assembly|transmission/.test(n)) return rand(150, 400);
  if (/brake disc|shock absorber|control arm|hub|wheel bearing/.test(n)) return rand(50, 200);
  if (/brake pad|filter|belt|gasket|sensor|plug|bulb/.test(n)) return rand(15, 80);
  if (/bearing|bushing|link|rod|mount|seal/.test(n)) return rand(20, 120);
  const ranges = {
    'engine-drivetrain': [20, 600],
    'brakes-suspension': [15, 450],
    'electrical-lighting': [25, 500],
    'body-exterior': [30, 600],
    'interior-comfort': [40, 700],
    'wheels-tires': [30, 500],
  };
  const [min, max] = ranges[category] || [20, 300];
  return rand(min, max);
}

function pick3Images(category, seed) {
  const pool = UNSPLASH_BY_CATEGORY[category] || UNSPLASH_BY_CATEGORY['engine-drivetrain'];
  const s = String(seed).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const i0 = s % 3;
  const i1 = (s + 1) % 3;
  const i2 = (s + 2) % 3;
  return [pool[i0], pool[i1], pool[i2]];
}

function generateReviews(productId, name, vehicle, idx) {
  const v = vehicle || {};
  const car = `${v.year || '2020-2024'} ${v.manufacturerName || 'Vehicle'} ${v.modelName || 'Model'}`;
  return [0, 1, 2].map((i) => ({
    id: `r-${productId}-${i}`,
    author: REVIEW_AUTHORS[(idx + i) % REVIEW_AUTHORS.length],
    rating: i === 0 ? 4.2 + (idx % 5) * 0.2 : 5,
    title: REVIEW_TITLES[(idx + i) % REVIEW_TITLES.length],
    comment: `Installed on my ${car}. Perfect fit and quality.`,
    date: `0${(1 + (idx + i) % 9)}/15/2025`,
    verified: true,
  }));
}

function getGeneratedPrice(name, category) {
  const n = (name || '').toLowerCase();
  if (/headlight assembly|taillight|bumper cover|ac compressor|condenser|heater core/.test(n)) return rand(180, 500);
  if (/alternator|starter|fog light kit|led headlight|grille|hood|fender|quarter panel/.test(n)) return rand(80, 280);
  if (/sensor|coil|harness|wiper motor|window regulator|blower motor|climate control/.test(n)) return rand(35, 150);
  if (/bulb|horn|fuse|terminal|wiper blade|weatherstrip|pedal pad|shift knob/.test(n)) return rand(15, 65);
  const ranges = { 'electrical-lighting': [25, 400], 'body-exterior': [30, 450], 'interior-comfort': [20, 380] };
  const [min, max] = ranges[category] || [20, 200];
  return rand(min, max);
}

// Placeholder images for generated products only (brand colors: dark navy, silver/gold text)
function getFallbackImages(productName, category) {
  const encodedName = encodeURIComponent((productName || 'Auto Part').substring(0, 30));
  return [
    `https://placehold.co/600x400/112240/C0C8D4?text=${encodedName}&font=montserrat`,
    `https://placehold.co/600x400/0F1D32/D4A853?text=${encodedName}&font=montserrat`,
    `https://placehold.co/600x400/1B3A5C/E8ECF1?text=${encodedName}&font=montserrat`,
  ];
}

function createGeneratedProduct(category, partName, brand, globalIndex, partIndex) {
  const id = `gen-${category}-${partIndex}`;
  const slug = slugify(partName) + '-' + partIndex;
  const make = VEHICLE_MAKES[globalIndex % VEHICLE_MAKES.length];
  const model = VEHICLE_MODELS[globalIndex % VEHICLE_MODELS.length];
  const year = ['2018', '2019', '2020', '2021', '2022', '2023'][globalIndex % 6];
  const price = getGeneratedPrice(partName, category);
  const images = getFallbackImages(partName, category);
  const compatibleVehicles = [{ year: `${year}-2024`, make, model, submodel: undefined, engine: undefined }];
  const reviews = [0, 1, 2].map((i) => ({
    id: `r-${id}-${i}`,
    author: REVIEW_AUTHORS[(partIndex + i) % REVIEW_AUTHORS.length],
    rating: 4 + (partIndex + i) % 2 * 0.5,
    title: REVIEW_TITLES[(partIndex + i) % REVIEW_TITLES.length],
    comment: `Great fit for my ${year} ${make} ${model}.`,
    date: `0${(1 + (partIndex + i) % 9)}/15/2025`,
    verified: true,
  }));
  return {
    id,
    slug,
    name: partName,
    description: `${partName} by ${brand}`,
    fullDescription: `High quality ${partName} manufactured by ${brand}. OE-style replacement.`,
    category,
    price,
    salePrice: partIndex % 5 === 0 ? Math.round(price * 0.88 * 100) / 100 : undefined,
    images,
    sku: `GEN-${category.slice(0, 3).toUpperCase()}-${partIndex}`,
    oemNumber: `GEN-${partIndex}`,
    brand,
    manufacturer: brand,
    originCountry: getOriginForBrand(brand),
    compatibleVehicles,
    material: '',
    weight: `${(1.5 + (partIndex % 10) * 0.3).toFixed(1)} lbs`,
    warranty: partIndex % 3 === 0 ? '24 months' : '12 months',
    condition: 'New',
    inStock: true,
    stockQuantity: 10 + (partIndex % 20),
    rating: Math.round((3.9 + (partIndex % 12) * 0.1) * 100) / 100,
    reviewCount: 3,
    reviews,
    tags: [category, brand].filter(Boolean),
    featured: partIndex % 12 === 0,
    bestSeller: partIndex % 8 === 0,
    createdAt: '2024-01-01',
  };
}

function generateSyntheticForCategory(category, partNames, brands, needCount, startGlobalIndex) {
  const out = [];
  for (let i = 0; i < needCount; i++) {
    const partName = partNames[i % partNames.length];
    const brand = brands[i % brands.length];
    out.push(createGeneratedProduct(category, partName, brand, startGlobalIndex + i, i));
  }
  return out;
}

function convertPart(part, idx) {
  const articleId = part.articleId ?? part.articleNo ?? `part-${idx}`;
  const id = `tecdoc-${articleId}`;
  const name = (part.articleProductName || part.articleNo || id).trim() || 'Auto Part';
  const slug = slugify(part.articleProductName || part.articleNo).slice(0, 50) || slugify(id);
  const brand = (part.supplierName || "Reina's").trim();
  const description = `${name} by ${brand}`;
  const fullDescription = `High quality ${name} manufactured by ${brand}. OEM Part Number: ${part.articleNo || articleId}`;

  const vehicle = part._vehicle || {};
  const catName = part._categoryName || '';
  const cats = vehicle.categories || [];
  const categoriesForMapping = [...cats, ...(catName ? [{ categoryName: catName }] : [])];
  let category = mapCategory(categoriesForMapping, name);

  let price = getPrice(name, category);
  if (price <= 300 && idx % 5 === 0) price = rand(320, 800);
  const hasSale = idx % 5 === 0;
  const salePrice = hasSale ? Math.round(price * (0.8 + (idx % 10) * 0.01) * 100) / 100 : undefined;

  let images = [];
  const hadTecDocImage = (part.s3image && String(part.s3image).startsWith('https://')) || (part.articleMediaFileName && part.supplierId);
  const localPartsDir = path.join(__dirname, '..', 'public', 'images', 'parts');
  const safeId = sanitizeArticleIdForFile(articleId);
  const localPath = path.join(localPartsDir, `${safeId}.webp`);

  if (hadTecDocImage && fs.existsSync(localPath)) {
    const localUrl = `/images/parts/${safeId}.webp`;
    images = [localUrl, localUrl, localUrl];
  } else if (hadTecDocImage) {
    images = getFallbackImages(name, category);
  } else if (part.images && Array.isArray(part.images) && part.images.length) {
    const valid = part.images.filter((img) => img && typeof img === 'string' && (img.startsWith('http://') || img.startsWith('https://')));
    if (valid.length) {
      images = valid;
      while (images.length < 3 && images[0]) images.push(images[0]);
    }
  }
  if (!images.length) {
    images = getFallbackImages(name, category);
  }

  const sku = `RTC-${(part.articleNo || articleId).toString().replace(/\s/g, '-')}`;
  const oemNumber = part.articleNo || sku;

  const compatibleVehicles = [{
    year: vehicle.year || '2020-2024',
    make: normalizeMakeToFilter(vehicle.manufacturerName),
    model: vehicle.modelName || 'Model',
    submodel: vehicle.typeName || undefined,
    engine: undefined,
  }];

  const weightNum = (1.5 + (idx % 14) * 0.5).toFixed(1);
  const warranty = idx % 3 === 0 ? '24 months' : '12 months';
  const inStock = idx % 10 !== 7;
  const stockQuantity = inStock ? 5 + (idx % 46) : 0;
  const rating = Math.round((3.8 + (idx % 13) * 0.1) * 100) / 100;
  const reviewCount = 5 + (idx % 36);
  const reviews = generateReviews(id, name, vehicle, idx);

  return {
    id,
    slug,
    name,
    description,
    fullDescription,
    category,
    price,
    salePrice,
    images,
    sku,
    oemNumber,
    brand,
    manufacturer: brand,
    originCountry: getOriginCountry(part.supplierName || brand),
    compatibleVehicles,
    material: '',
    weight: `${weightNum} lbs`,
    warranty,
    condition: 'New',
    inStock,
    stockQuantity,
    rating,
    reviewCount,
    reviews,
    tags: [category, brand].filter(Boolean),
    featured: idx % 10 === 0,
    bestSeller: idx % 7 === 0,
    createdAt: '2024-01-01',
  };
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
    tags: ${JSON.stringify(p.tags)},
    featured: ${p.featured},
    bestSeller: ${p.bestSeller},
    createdAt: ${JSON.stringify(p.createdAt)},
  }`;
}

const header = `import type { Product, CategorySlug } from '@/lib/types';

// Category images for fallback (TecDoc parts use real s3image when available)
const CATEGORY_IMAGES: Record<CategorySlug, string[]> = {
  'engine-drivetrain': [
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=600&h=400&fit=crop',
  ],
  'brakes-suspension': [
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?w=600&h=400&fit=crop',
  ],
  'electrical-lighting': [
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&h=400&fit=crop',
  ],
  'body-exterior': [
    'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop',
  ],
  'interior-comfort': [
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop',
  ],
  'wheels-tires': [
    'https://images.unsplash.com/photo-1611859266276-7ef4f0565576?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop',
  ],
};

const TRIPLES = [[0,1,2],[0,1,3],[0,2,3]];
const PERMS = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];

function getCategoryImages(category: CategorySlug, seed: string): string[] {
  const pool = CATEGORY_IMAGES[category];
  const n = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const triple = TRIPLES[n % 3];
  const permIndex = (n >> 4) % 6;
  return PERMS[permIndex].map((i) => pool[triple[i]]);
}

export const products: Product[] = [
`;

function main() {
  if (!fs.existsSync(RAW_PATH)) {
    console.error('Not found:', RAW_PATH);
    process.exit(1);
  }
  const raw = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
  const parts = raw.parts || [];
  console.log('Read', parts.length, 'parts from tecdoc-raw-data.json');
  if (!parts.length) {
    console.log('No parts to convert.');
    return;
  }
  let products = parts.map((p, i) => convertPart(p, i));

  const CATEGORIES = ['engine-drivetrain', 'brakes-suspension', 'electrical-lighting', 'body-exterior', 'interior-comfort', 'wheels-tires'];
  const TARGET_MIN = 80;

  function countByCategory(prods) {
    const counts = {};
    CATEGORIES.forEach((c) => { counts[c] = 0; });
    prods.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return counts;
  }

  let counts = countByCategory(products);
  console.log('After TecDoc conversion:', counts);

  let genIndex = 0;
  if ((counts['electrical-lighting'] || 0) < TARGET_MIN) {
    const need = TARGET_MIN - (counts['electrical-lighting'] || 0);
    const generated = generateSyntheticForCategory('electrical-lighting', GENERATED_ELECTRICAL, GENERATED_ELECTRICAL_BRANDS, need, genIndex);
    products = products.concat(generated);
    genIndex += need;
    console.log('Generated', need, 'electrical-lighting products');
  }
  if ((counts['body-exterior'] || 0) < TARGET_MIN) {
    const need = TARGET_MIN - (counts['body-exterior'] || 0);
    const generated = generateSyntheticForCategory('body-exterior', GENERATED_BODY, GENERATED_BODY_BRANDS, need, genIndex);
    products = products.concat(generated);
    genIndex += need;
    console.log('Generated', need, 'body-exterior products');
  }
  if ((counts['interior-comfort'] || 0) < TARGET_MIN) {
    const need = TARGET_MIN - (counts['interior-comfort'] || 0);
    const generated = generateSyntheticForCategory('interior-comfort', GENERATED_INTERIOR, GENERATED_INTERIOR_BRANDS, need, genIndex);
    products = products.concat(generated);
    console.log('Generated', need, 'interior-comfort products');
  }

  counts = countByCategory(products);
  console.log('Final category distribution:', counts);

  let localImages = 0;
  let fallbackCount = 0;
  products.forEach((p) => {
    if (p.images && p.images[0] && String(p.images[0]).startsWith('/images/parts/')) localImages++;
    else fallbackCount++;
  });
  console.log('Local TecDoc images:', localImages, ', Placehold fallback:', fallbackCount);

  const body = products.map(tsProduct).join(',\n');
  const content = header + body + '\n];\n';
  fs.writeFileSync(OUT_PATH, content, 'utf8');
  console.log('Written', products.length, 'products to', OUT_PATH);
}

main();
