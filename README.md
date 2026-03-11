# Reina's Tire Center LLC — E-Commerce Website

Premium auto parts e-commerce site for Reina's Tire Center LLC (Orlando, FL). Built with **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Deployment target: **Vercel**.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

- **`/src/app`** — Pages (home, catalog, product, about, FAQ, contact, policies)
- **`/src/components`** — Layout (Navbar, Footer, CartDrawer), home sections, catalog (ProductCard, FilterSidebar, Pagination), product (ImageGallery, SpecsTable, ReviewSection, RelatedProducts), UI (CTAButton, StarRating, Badge, Breadcrumb, AccordionItem, SectionHeading, PolicyLayout)
- **`/src/context`** — CartContext (add/remove/update cart, cart drawer)
- **`/src/data`** — Static data: 165+ products, categories, testimonials, FAQ, countries
- **`/src/lib`** — Types, utils (formatPrice, slugify, getCategoryDisplayName)
- **`/src/styles`** — globals.css (design system, fonts, grain overlay)

## Features

- **Design system:** Dark navy + silver + gold; Bebas Neue, Montserrat, Source Sans 3
- **Home:** Hero, stats bar, about preview, category grid, import origins, strengths, testimonials, newsletter
- **Catalog:** Filters (category, make, price, origin, condition, in-stock, sort), search (name, SKU, OEM, vehicle), pagination (20 per page)
- **Product page:** Image gallery, specs, tabs (description, specifications, compatibility, reviews), related products, JSON-LD
- **Cart:** Context + slide-over drawer; “Contact Us to Complete Order” (no payment integration)
- **Policy pages:** Refund, Terms & Conditions, Terms of Use, Delivery
- **SEO:** Per-page metadata, product JSON-LD, semantic HTML

## Data

All product and content data lives in **`/src/data`**. Edit `products.ts`, `categories.ts`, `testimonials.ts`, `faqData.ts`, and `countries.ts` to update the site. No database required for this MVP.

## Environment

No env vars required for the current build. For production (e.g. analytics, forms), add a `.env.local` and reference in code.

---

© 2026 Reina's Tire Center LLC. All rights reserved.
