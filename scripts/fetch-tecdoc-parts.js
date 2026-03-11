#!/usr/bin/env node
/**
 * Fetch parts from TecDoc API via Apify and generate src/data/products.ts
 * Strategy: 10 models per brand, up to 3 vehicles per model, 10 categories per vehicle.
 * Usage: node scripts/fetch-tecdoc-parts.js
 */

const fs = require('fs');
const path = require('path');

const API_BASE = 'https://api.apify.com/v2/acts/making-data-meaningful~tecdoc/run-sync-get-dataset-items';
const TOKEN = 'REMOVED';
const DELAY_MS = 2000;
const MAX_PARTS_TOTAL = 700;
const MAX_PARTS_PER_BRAND = 80;
const MIN_PARTS_PER_BRAND = 20;
const MODELS_PER_BRAND = 10;
const VEHICLES_PER_MODEL = 3;
const CATEGORIES_PER_VEHICLE = 10;

const RAW_DATA_PATH = path.join(__dirname, 'tecdoc-raw-data.json');
const PRODUCTS_PATH = path.join(__dirname, '..', 'src', 'data', 'products.ts');
const DEBUG_LOG_PATH = path.join(__dirname, 'api-debug.json');

const TARGET_MANUFACTURERS = [
  'Toyota', 'Lexus', 'Honda', 'Acura', 'BMW', 'Mercedes-Benz', 'Audi',
  'Hyundai', 'Kia', 'Ford', 'Chevrolet', 'Dodge', 'Nissan', 'Volkswagen', 'Subaru'
];

const EXCLUDED_CATEGORIES = ['Marten', 'Alarm', 'Car Care', 'Cleaning', 'Air Freshener', 'Accessories', 'Tools', 'Workshop'];
const ALLOWED_CATEGORIES = [
  'Brake', 'Pad', 'Disc', 'Rotor', 'Caliper',
  'Suspension', 'Shock', 'Strut', 'Spring', 'Control Arm', 'Stabilizer', 'Ball Joint',
  'Engine', 'Filter', 'Oil', 'Air', 'Fuel', 'Belt', 'Timing', 'Gasket', 'Pump', 'Thermostat', 'Radiator', 'Spark Plug', 'Ignition',
  'Headlight', 'Taillight', 'Fog Light', 'Bulb', 'Alternator', 'Starter', 'Sensor', 'Wiring',
  'Bumper', 'Fender', 'Mirror', 'Grille', 'Hood', 'Door Handle',
  'Wheel', 'Tire', 'Hub', 'Bearing', 'TPMS',
  'Clutch', 'Transmission', 'Exhaust', 'Muffler', 'Catalytic',
  'Wiper', 'Window', 'Blower', 'Compressor', 'Condenser', 'Heater',
];

const CATEGORY_MAP = {
  'engine-drivetrain': ['engine', 'fuel', 'cooling', 'exhaust', 'drivetrain', 'transmission', 'oil', 'filter engine', 'spark', 'ignition', 'timing', 'belt', 'gasket'],
  'brakes-suspension': ['brake', 'suspension', 'shock', 'absorber', 'strut', 'spring', 'caliper', 'rotor', 'pad'],
  'electrical-lighting': ['electrical', 'lighting', 'light', 'sensor', 'ignition', 'battery', 'alternator', 'starter', 'lamp', 'bulb'],
  'body-exterior': ['body', 'bumper', 'mirror', 'trim', 'fender', 'hood', 'grille', 'exterior', 'door'],
  'interior-comfort': ['interior', 'ac', 'heating', 'seat', 'dashboard', 'cabin', 'comfort', 'vent', 'blower'],
  'wheels-tires': ['wheel', 'tire', 'tyre', 'bearing', 'tpms', 'rim', 'hub']
};

const BRAND_ORIGIN = {
  'Bosch': 'Germany', 'Denso': 'Japan', 'Gates': 'USA', 'Mann': 'Germany', 'Mann-Filter': 'Germany',
  'Aisin': 'Japan', 'NGK': 'Japan', 'Continental': 'Germany', 'Fel-Pro': 'USA', 'Valeo': 'France',
  'Brembo': 'Italy', 'Akebono': 'Japan', 'KYB': 'Japan', 'Monroe': 'USA', 'Moog': 'USA',
  'Bilstein': 'Germany', 'Centric': 'USA', 'Sachs': 'Germany', 'Tokico': 'Japan', 'Meyle': 'Germany',
  'Raybestos': 'USA', 'Hella': 'Germany', 'Philips': 'Netherlands', 'Interstate': 'USA', 'ACDelco': 'USA',
  'Depo': 'Taiwan', 'CAPA': 'USA', 'TYC': 'Taiwan', 'Keiho': 'Taiwan', 'Vemo': 'Germany',
  'Four Seasons': 'USA', 'Mabuchi': 'Japan', 'TRQ': 'USA', 'Schrader': 'USA', 'Enkei': 'Japan',
  'Michelin': 'USA', 'Goodyear': 'USA', 'Bridgestone': 'Japan', 'NTK': 'Japan'
};

const UNSPLASH_BY_CATEGORY = {
  'engine-drivetrain': ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop'],
  'brakes-suspension': ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop'],
  'electrical-lighting': ['https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop'],
  'body-exterior': ['https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&h=400&fit=crop'],
  'interior-comfort': ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop'],
  'wheels-tires': ['https://images.unsplash.com/photo-1611859266276-7ef4f0565576?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop'],
};

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function slugify(str) {
  return str.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim() || 'part';
}

function mapTecDocCategoryToOurs(tecdocName = '') {
  const lower = String(tecdocName).toLowerCase();
  for (const [ourCat, keywords] of Object.entries(CATEGORY_MAP)) {
    if (keywords.some((k) => lower.includes(k))) return ourCat;
  }
  return 'engine-drivetrain';
}

function getOriginByBrand(brand) {
  if (!brand) return 'USA';
  for (const [b, country] of Object.entries(BRAND_ORIGIN)) {
    if (brand.toLowerCase().includes(b.toLowerCase())) return country;
  }
  return 'USA';
}

function buildEndpointBody(endpoint, params = {}) {
  const body = { ...params };
  body[endpoint] = true;
  return body;
}

/** API POST без вывода в консоль (для массовых вызовов) */
async function apiPost(body) {
  const url = `${API_BASE}?token=${TOKEN}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`API ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

function unwrapVehicleList(data) {
  let list = Array.isArray(data) ? data : (data?.items ?? data?.data ?? []);
  if (!Array.isArray(list) && data && typeof data === 'object' && data.modelTypes) list = data.modelTypes;
  if (list.length && typeof list[0] === 'object' && !Array.isArray(list[0])) {
    const first = list[0];
    if (first.modelTypes) list = first.modelTypes;
    else if (first.vehicleIds) list = first.vehicleIds;
    else if (first.vehicleTypes) list = first.vehicleTypes;
    else if (first.vehicles) list = first.vehicles;
    else if (first.data) list = Array.isArray(first.data) ? first.data : (first.data.vehicles ?? first.data.vehicleTypes ?? first.data.vehicleIds ?? first.data.modelTypes ?? []);
    else if (first.result) list = Array.isArray(first.result) ? first.result : (first.result.vehicles ?? first.result.modelTypes ?? []);
    else if (first.models && Array.isArray(first.models)) list = first.models;
  }
  if (!Array.isArray(list)) list = [];
  return list;
}

function flattenCategories(obj, result = [], level = 1) {
  if (!obj || typeof obj !== 'object') return result;
  for (const key of Object.keys(obj)) {
    const cat = obj[key];
    if (cat && cat.categoryId != null) {
      const lvl = cat.level ?? level;
      if (lvl === 2 || lvl === 3) {
        result.push({
          categoryId: cat.categoryId,
          categoryName: cat.categoryName ?? cat.name ?? key,
          level: lvl,
        });
      }
      if (cat.children && typeof cat.children === 'object') flattenCategories(cat.children, result, lvl + 1);
    }
  }
  return result;
}

// --- Step 1: Manufacturers
async function fetchManufacturers() {
  console.log('Step 1: Fetching manufacturers...');
  const body = buildEndpointBody('endpoint_manufacturerIdsByTypeId', { manufacturer_typeId_2: 1 });
  const data = await apiPost(body);
  let list = Array.isArray(data) ? data : (data?.items ?? data?.data ?? []);
  if (list.length && list[0].manufacturers) list = list[0].manufacturers;
  const byName = {};
  const byNameLower = {};
  list.forEach((m) => {
    const name = (m.manuName ?? m.name ?? m.manufacturerName ?? m.description ?? '').trim();
    const id = m.manufacturerId ?? m.manuId ?? m.id;
    if (name || id != null) {
      const key = name || `ID-${id}`;
      byName[key] = id;
      if (name) byNameLower[name.toLowerCase()] = { name: key, id };
    }
  });
  const found = TARGET_MANUFACTURERS.filter((target) => {
    if (byName[target]) return true;
    const t = target.toLowerCase().replace(/-/g, ' ');
    const match = Object.keys(byNameLower).find((k) => {
      const kk = k.replace(/-/g, ' ');
      return kk === t || kk.includes(t) || t.includes(kk);
    });
    if (match) {
      byName[target] = byNameLower[match].id;
      return true;
    }
    return false;
  });
  found.forEach((name) => console.log(`  Found ${name} (id: ${byName[name]})`));
  return found.map((name) => ({ name, manufacturerId: byName[name] }));
}

// --- Step 2: All models for one manufacturer, sorted by modelId desc, first 10
async function fetchModelsForBrand(manu) {
  await delay(DELAY_MS);
  const body = buildEndpointBody('endpoint_modelsByTypeManufacturer', {
    models_typeId_1: 1,
    models_manufacturerId_1: manu.manufacturerId,
    models_langId_1: 37,
    models_countryFilterId_1: 233,
  });
  const data = await apiPost(body);
  let rawList = Array.isArray(data) ? data : (data?.items ?? data?.data ?? []);
  if (rawList.length && rawList[0].models) rawList = rawList[0].models;
  const sorted = [...rawList].sort((a, b) => (b.modelId ?? b.model_id ?? b.id ?? 0) - (a.modelId ?? a.model_id ?? a.id ?? 0));
  return sorted.slice(0, MODELS_PER_BRAND).map((m) => ({
    modelId: m.modelId ?? m.model_id ?? m.id,
    modelName: m.modelName ?? m.name ?? m.model_name ?? 'Unknown',
    manufacturerName: manu.name,
    manufacturerId: manu.manufacturerId,
  })).filter((m) => m.modelId != null);
}

// --- Step 3: Vehicles for one model (primary + fallback endpoints)
async function fetchVehiclesForModel(model) {
  await delay(DELAY_MS);
  let list = [];
  try {
    const bodyEngine = buildEndpointBody('endpoint_vehicleEngineTypesByModel', {
      vehicle_typeId_3: 1,
      vehicle_modelId_3: model.modelId,
      vehicle_langId_3: 37,
      vehicle_countryFilterId_3: 233,
    });
    const dataEngine = await apiPost(bodyEngine);
    list = unwrapVehicleList(dataEngine);
  } catch (_) {}
  if (list.length === 0) {
    await delay(DELAY_MS);
    try {
      const bodyIds = buildEndpointBody('endpoint_vehicleIdsByModelIds', {
        vehicle_typeId_5: 1,
        vehicle_modelId_5: model.modelId,
        vehicle_langId_5: 37,
        vehicle_countryFilterId_5: 233,
      });
      const dataIds = await apiPost(bodyIds);
      list = unwrapVehicleList(dataIds);
    } catch (_) {}
  }
  if (list.length === 0) {
    await delay(DELAY_MS);
    try {
      const bodyModel = buildEndpointBody('endpoint_modelDetailsByModelId', {
        models_typeId_2: 1,
        models_modelId_2: model.modelId,
        models_langId_2: 37,
        models_countryFilterId_2: 233,
      });
      const dataModel = await apiPost(bodyModel);
      list = unwrapVehicleList(dataModel);
      if (list.length === 0 && dataModel && typeof dataModel === 'object') {
        const single = Array.isArray(dataModel) ? dataModel[0] : dataModel;
        if (single && typeof single === 'object') {
          const arr = single.vehicleTypes ?? single.vehicles ?? single.vehicleIds ?? single.modelTypes ?? single.models ?? single.data;
          list = Array.isArray(arr) ? arr : (arr?.vehicles ?? arr?.vehicleTypes ?? []);
        }
        if (list.length === 0 && dataModel.vehicleId != null) list = [dataModel];
        if (list.length === 0 && Array.isArray(dataModel)) list = dataModel;
      }
    } catch (_) {}
  }
  const vehicles = [];
  const take = (list || []).slice(0, VEHICLES_PER_MODEL);
  for (const v of take) {
    const vehicleId = v.vehicleId ?? v.vehicle_id ?? v.carId ?? v.id ?? v.typeId ?? v.vehicleTypeId;
    if (vehicleId != null) {
      vehicles.push({
        vehicleId,
        modelName: model.modelName,
        manufacturerName: model.manufacturerName,
        year: v.year ?? v.modelYear ?? v.model_year ?? v.productionDate ?? '',
        typeName: v.typeName ?? v.name ?? v.description ?? '',
      });
    }
  }
  return vehicles;
}

// --- Step 4: Categories for one vehicle (whitelist, max 10)
async function fetchCategoriesForVehicle(v) {
  await delay(DELAY_MS);
  const body = buildEndpointBody('endpoint_partsListCategoriesByVehicleIdV2', {
    parts_typeId_3: 1,
    parts_vehicleId_3: v.vehicleId,
    parts_langId_3: 37,
  });
  const data = await apiPost(body);
  let cats = [];
  if (Array.isArray(data) && data.length) {
    const first = data[0];
    if (first && typeof first === 'object' && !Array.isArray(first)) {
      if (first.children) cats = flattenCategories(first.children, []);
      else if (first.categories) cats = flattenCategories(first.categories, []);
      else if (first.categoryId != null) cats = data.map((c) => ({ categoryId: c.categoryId ?? c.category_id ?? c.id, categoryName: c.categoryName ?? c.name ?? '' })).filter((c) => c.categoryId != null);
      else cats = flattenCategories(first, []);
    } else {
      cats = data.map((c) => ({ categoryId: c?.categoryId ?? c?.category_id ?? c?.productGroupId ?? c?.id, categoryName: c?.categoryName ?? c?.name ?? c?.description ?? '' })).filter((c) => c.categoryId != null);
    }
  } else if (data && typeof data === 'object' && !Array.isArray(data)) {
    if (data.categories) cats = flattenCategories(data.categories, []);
    else if (data.children) cats = flattenCategories(data.children, []);
    else cats = flattenCategories(data, []);
  }
  cats = (cats || []).filter((c) => !EXCLUDED_CATEGORIES.some((ex) => (c.categoryName || '').includes(ex)));
  cats = (cats || []).filter((c) => ALLOWED_CATEGORIES.some((allowed) => (c.categoryName || '').toLowerCase().includes(allowed.toLowerCase())));
  return cats.slice(0, CATEGORIES_PER_VEHICLE);
}

// --- Step 5: Parts for one vehicle + category
async function fetchPartsForVehicleCategory(v, cat) {
  await delay(DELAY_MS);
  const endpoints = [
    { endpoint: 'endpoint_partsArticleListByVehicleIdCategoryId', params: { parts_typeId_18: 1, parts_vehicleId_18: v.vehicleId, parts_categoryId_18: cat.categoryId, parts_langId_18: 37 } },
    { endpoint: 'endpoint_partsListArticlesByVehicleIdAndCategoryId', params: { parts_typeId_18: 1, parts_vehicleId_18: v.vehicleId, parts_categoryId_18: cat.categoryId, parts_langId_18: 37 } },
  ];
  for (const { endpoint, params } of endpoints) {
    try {
      const body = buildEndpointBody(endpoint, params);
      const data = await apiPost(body);
      let list = Array.isArray(data) ? data : (data?.items ?? data?.data ?? []);
      if (list.length && list[0] && typeof list[0] === 'object' && list[0].articles) list = list[0].articles;
      else if (list.length && list[0] && list[0].articles) list = list[0].articles;
      if (!Array.isArray(list)) list = list && typeof list === 'object' ? (list.articles ?? []) : [];
      if (list.length) return list;
    } catch (_) {}
  }
  return [];
}

// --- Generate products.ts (unchanged logic)
function generateProductsTs(parts, raw) {
  parts = parts || [];
  raw = raw || {};
  const sampleParts = raw.parts || parts;
  const lines = [];
  const reviewTemplates = [
    { author: 'Mike S.', title: 'Great fit', comment: 'Perfect fit, fast shipping.', rating: 5 },
    { author: 'Tech Auto', title: 'Good quality', comment: 'Works as expected.', rating: 4 },
    { author: 'John D.', title: 'Exactly as described', comment: 'No issues. Will order again.', rating: 5 },
  ];
  const header = `import type { Product, CategorySlug } from '@/lib/types';

const CATEGORY_IMAGES: Record<CategorySlug, string[]> = {
  'engine-drivetrain': ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=600&h=400&fit=crop'],
  'brakes-suspension': ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop'],
  'electrical-lighting': ['https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop'],
  'body-exterior': ['https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600&h=400&fit=crop'],
  'interior-comfort': ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop'],
  'wheels-tires': ['https://images.unsplash.com/photo-1611859266276-7ef4f0565576?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop','https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop'],
};
const TRIPLES = [[0,1,2],[0,1,3],[0,1,4],[0,2,3],[0,2,4],[0,3,4],[1,2,3],[1,2,4],[1,3,4],[2,3,4]];
const PERMS = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
function getCategoryImages(category: CategorySlug, seed: string): string[] {
  const pool = CATEGORY_IMAGES[category];
  const n = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const triple = TRIPLES[n % 10];
  const permIndex = (n >> 4) % 6;
  return PERMS[permIndex].map((i) => pool[triple[i]]);
}
export const products: Product[] = [
`;
  lines.push(header);
  (parts || []).forEach((p, idx) => {
    if (!p || typeof p !== 'object') return;
    const articleId = p.articleId ?? p.article_id ?? p.partNumber ?? p.number ?? `part-${idx}`;
    const id = `tecdoc-${articleId}`;
    const name = (p.articleName ?? p.description ?? p.partNumber ?? p.articleNumber ?? id).trim() || 'Auto Part';
    const sku = String(p.articleNumber ?? p.partNumber ?? p.number ?? `RTC-${articleId}`).trim();
    const brand = (p.brandName ?? p.brand ?? p.mfrName ?? 'Reina\'s').trim();
    const oemNumber = (p.oemNumber ?? p.oem ?? p.articleNumber ?? sku).trim();
    const catName = p._categoryName ?? '';
    const category = mapTecDocCategoryToOurs(catName);
    const originCountry = getOriginByBrand(brand);
    let price = Number(p.price ?? p.listPrice ?? 0);
    if (!price || price <= 0) {
      const base = [12.99, 24.99, 45, 89, 125, 189, 285][idx % 7];
      price = Math.round(base * (0.9 + Math.random() * 0.3) * 100) / 100;
    }
    const hasSale = idx % 5 === 0;
    const salePrice = hasSale ? Math.round(price * (0.75 + Math.random() * 0.15) * 100) / 100 : undefined;
    const rawImages = p.imageUrl ? [p.imageUrl] : (p.images || []);
    const images = Array.isArray(rawImages) ? rawImages.filter(Boolean) : [rawImages].filter(Boolean);
    const fallbackImages = UNSPLASH_BY_CATEGORY[category] || UNSPLASH_BY_CATEGORY['engine-drivetrain'];
    const vehicle = p._vehicle || {};
    const compat = [{
      year: vehicle.year || '2018-2023',
      make: vehicle.manufacturerName || 'Vehicle',
      model: vehicle.modelName || 'Model',
      submodel: vehicle.typeName || undefined,
      engine: undefined,
    }];
    const rating = 3.5 + Math.random() * 1.5;
    const reviewCount = 5 + Math.floor(Math.random() * 45);
    const reviewsFinal = (reviewTemplates || []).slice(0, 2 + (idx % 2)).map((r, i) => ({
      id: `r-${id}-${i}`,
      author: r.author,
      rating: r.rating,
      title: r.title,
      comment: r.comment,
      date: '0' + (1 + (idx % 9)) + '/01/2026',
      verified: true,
    }));
    const slug = slugify(name).slice(0, 50) || `part-${articleId}`;
    const featured = idx % 10 === 0;
    const bestSeller = idx % 7 === 0;
    const inStock = Math.random() < 0.9;
    const stockQuantity = inStock ? 5 + Math.floor(Math.random() * 45) : 0;
    const warranty = idx % 3 === 0 ? '24 months' : '12 months';
    lines.push(`  {
    id: ${JSON.stringify(id)},
    slug: ${JSON.stringify(slug)},
    name: ${JSON.stringify(name)},
    description: ${JSON.stringify(name.slice(0, 120))},
    fullDescription: ${JSON.stringify(`Premium quality ${name}. Trusted by professionals. ${brand} quality guaranteed.`)},
    category: ${JSON.stringify(category)},
    price: ${price},
    ${salePrice != null ? `salePrice: ${salePrice},` : ''}
    images: getCategoryImages(${JSON.stringify(category)}, ${JSON.stringify(id)}),
    sku: ${JSON.stringify(sku)},
    oemNumber: ${JSON.stringify(oemNumber)},
    brand: ${JSON.stringify(brand)},
    manufacturer: ${JSON.stringify(brand)},
    originCountry: ${JSON.stringify(originCountry)},
    compatibleVehicles: ${JSON.stringify(compat)},
    weight: "2.5 lbs",
    warranty: ${JSON.stringify(warranty)},
    condition: "New",
    inStock: ${inStock},
    stockQuantity: ${stockQuantity},
    rating: ${rating.toFixed(2)},
    reviewCount: ${reviewCount},
    reviews: ${JSON.stringify(reviewsFinal)},
    tags: [],
    featured: ${featured},
    bestSeller: ${bestSeller},
    createdAt: "2024-01-15",
  },`);
  });
  lines.push('];\n');
  return lines.join('\n');
}

async function main() {
  if (fs.existsSync(RAW_DATA_PATH)) {
    fs.unlinkSync(RAW_DATA_PATH);
    console.log('Deleted old tecdoc-raw-data.json, starting fresh\n');
  }

  const raw = {
    manufacturers: [],
    parts: [],
    fetchedAt: new Date().toISOString(),
  };

  const seenArticleIds = new Set();
  let totalParts = 0;
  const partsPerBrand = {};

  try {
    console.log('TecDoc fetch started (langId=37, countryId=233, typeId=1).\n');
    const manufacturers = await fetchManufacturers();
    raw.manufacturers = manufacturers;

    if (!manufacturers.length) {
      console.log('No target manufacturers found.');
      fs.writeFileSync(PRODUCTS_PATH, generateProductsTs([], raw), 'utf8');
      return;
    }

    manufacturers.forEach((m) => { partsPerBrand[m.name] = 0; });

    for (const manu of manufacturers) {
      const brand = manu.name;
      if (totalParts >= MAX_PARTS_TOTAL) break;
      let brandTotal = partsPerBrand[brand];
      if (brandTotal >= MAX_PARTS_PER_BRAND) continue;

      let models;
      try {
        models = await fetchModelsForBrand(manu);
      } catch (err) {
        console.error(`[${brand}] Error fetching models:`, err.message);
        continue;
      }

      for (const model of models) {
        if (totalParts >= MAX_PARTS_TOTAL) break;
        if (brandTotal >= MAX_PARTS_PER_BRAND) break;

        console.log(`[${brand}] Trying model: ${model.modelName} (id: ${model.modelId})`);
        let vehicles = [];
        try {
          vehicles = await fetchVehiclesForModel(model);
        } catch (err) {
          console.error(`[${brand}] Error vehicles for ${model.modelName}:`, err.message);
          continue;
        }

        if (vehicles.length === 0) continue;

        console.log(`[${brand}] Model ${model.modelName}: found ${vehicles.length} vehicles`);

        let partsFromThisModel = 0;
        for (const v of vehicles) {
          if (totalParts >= MAX_PARTS_TOTAL) break;
          if (brandTotal >= MAX_PARTS_PER_BRAND) break;

          let categories = [];
          try {
            categories = await fetchCategoriesForVehicle(v);
          } catch (err) {
            console.error(`[${brand}] Error categories for vehicle ${v.vehicleId}:`, err.message);
            continue;
          }

          if (categories.length === 0) continue;

          console.log(`[${brand}] Model ${model.modelName}: found ${categories.length} categories`);

          for (const cat of categories) {
            if (totalParts >= MAX_PARTS_TOTAL) break;
            if (brandTotal >= MAX_PARTS_PER_BRAND) break;

            let list = [];
            try {
              list = await fetchPartsForVehicleCategory(v, cat);
            } catch (err) {
              continue;
            }

            for (const p of list) {
              if (totalParts >= MAX_PARTS_TOTAL) break;
              if (brandTotal >= MAX_PARTS_PER_BRAND) break;
              const articleId = p.articleId ?? p.article_id ?? p.articleNo ?? p.partNumber ?? p.number ?? p.articleNumber;
              const key = String(articleId ?? p.articleNo ?? '');
              if (!key || seenArticleIds.has(key)) continue;
              seenArticleIds.add(key);
              raw.parts.push({
                ...p,
                _vehicle: v,
                _categoryName: cat.categoryName,
                _categoryId: cat.categoryId,
              });
              brandTotal++;
              totalParts++;
              partsFromThisModel++;
            }
          }
        }

        if (partsFromThisModel > 0) {
          console.log(`[${brand}] Model ${model.modelName}: got ${partsFromThisModel} parts`);
        }

        partsPerBrand[brand] = brandTotal;
        console.log(`[${brand}] TOTAL: ${brandTotal} parts`);
      }

      partsPerBrand[brand] = brandTotal;
      console.log(`=== PROGRESS: ${totalParts}/700 parts ===\n`);
      fs.writeFileSync(RAW_DATA_PATH, JSON.stringify(raw, null, 2), 'utf8');
    }

    fs.writeFileSync(RAW_DATA_PATH, JSON.stringify(raw, null, 2), 'utf8');
    const tsContent = generateProductsTs(raw.parts, raw);
    fs.writeFileSync(PRODUCTS_PATH, tsContent, 'utf8');

    console.log('\n=== FINAL BREAKDOWN ===');
    for (const [b, count] of Object.entries(partsPerBrand)) {
      console.log(`  ${b}: ${count} parts`);
    }
    console.log(`  TOTAL: ${totalParts}`);
    console.log('\nRaw data: scripts/tecdoc-raw-data.json');
    console.log('Products: src/data/products.ts');
  } catch (err) {
    console.error('Fatal error:', err);
    fs.writeFileSync(RAW_DATA_PATH, JSON.stringify(raw, null, 2), 'utf8');
    process.exit(1);
  }
}

main();
