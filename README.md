# Frontend Take-Home: Bundle Builder
<img width="1643" height="824" alt="image" src="https://github.com/user-attachments/assets/03160a12-d1f5-457b-bba0-4499a845ef51" />


A React prototype of a multi-step "build your security system" bundle builder, with a live review panel that stays in sync with selections. Built to match the provided Figma design.

**Live Figma reference:** https://www.figma.com/design/JYf61etQVqeseX7oY5alGz/Frontend-Test-Figma?node-id=68-8088

**Live Demo:** https://frontend-development-task-drab.vercel.app/

## Tech Stack

- **React** (functional components + hooks)
- **TypeScript**
- **Tailwind CSS** for styling
- **Context API** for global state management (selections, quantities, active variants, persistence)

## Features

- **4-step accordion builder** — Cameras, Plan, Sensors, Extra Protection. Step 1 is expanded on load; each step shows a live "N selected" count and advances via a "Next" button.
- **Data-driven product cards** — rendered from a local JSON source, not hardcoded per product. Supports optional discount badges, variant selectors, quantity steppers, and compare-at/active pricing.
- **Per-variant quantity tracking** — each color/variant of a product has its own independent count. Switching the active variant on a card swaps which count the stepper shows/edits, without affecting the other variant's count.
- **Live review panel** — lists every selected item (including every variant with a count above zero) grouped by category (Cameras, Sensors, Accessories, Plan), with synced quantity steppers, running total, and savings callout.
- **Two-way synced quantity steppers** — updating quantity on a product card or in the review panel updates both, plus the recalculated total.
- **Persistence** — "Save my system for later" stores the full configuration in `localStorage`. Reloading or returning to the app restores the exact saved state.
- **Responsive layout** — matches the Figma at desktop widths and reflows to remain usable down to mobile.
<img width="1686" height="853" alt="image" src="https://github.com/user-attachments/assets/58dee05b-0b43-45d8-85aa-f4d22992f6bb" />


## Project Structure

```
├── public/
│   ├── assets/
│   ├── bage.png
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── review/
│   │   │   └── ReviewPanel.tsx        # The "Your security system" summary panel
│   │   └── setps/
│   │       ├── BundleConfigurator.tsx # Accordion step logic/layout
│   │       ├── ColorSwatch.tsx        # Variant selector chips
│   │       ├── PriceTag.tsx           # Compare-at / active price display
│   │       ├── ProductCard.tsx        # Individual product card
│   │       └── QuantityStepper.tsx    # Shared stepper (card + review panel)
│   ├── MainLayout.tsx                 # Two-column page layout
│   ├── context/                       # BundleContext (Context API) — selections, quantities, active variants, persistence
│   ├── data/
│   │   └── product.json               # Seed data for cameras, plans, sensors, accessories
│   ├── hooks/                         # Custom hooks (e.g. persistence/localStorage hook)
│   ├── types/
│   │   └── product.types.ts           # Shared TypeScript types/interfaces
│   ├── utils/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── eslint.config.js
├── .gitignore
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Install & Run

```bash
git clone <this-repo-url>
cd <repo-folder>
npm install
npm run dev
```
<img width="935" height="673" alt="image" src="https://github.com/user-attachments/assets/b7c54a64-476f-45fe-95df-1e0cf46b5a14" />

The app will be available at `http://localhost:5173` (Vite default) — adjust if your setup differs.

### Build

```bash
npm run build
npm run preview
```

## Data

Product and category data lives in `src/data/products.json`. Each product entry includes id, category, title, description, image, pricing (compare-at + active), optional discount badge, and an optional list of variants (each with its own id, label, swatch/thumbnail). The review panel's pre-populated sensors, accessory, and plan line items are seeded directly in initial context state to match the design on first load.

## Decisions & Tradeoffs

- Used Context API rather than a state library (Redux/Zustand) since the state shape is small and scoped to a single builder flow.
- Variant quantities are stored as a map keyed by `productId:variantId` so each variant's count is independent, with the "active variant" tracked separately per product for the stepper display.
- Persistence writes the whole bundle state as a single JSON blob to `localStorage` on save, and rehydrates it on mount if present.
- The Checkout button is a placeholder (simple confirmation) as specified — no real checkout flow was built.
- Selected-chip styling for variants was deprioritized per the instructions, in favor of correct selection/quantity behavior.
- [Add anything else you didn't finish or would revisit with more time — e.g., accessibility polish, animation on accordion expand/collapse, edge cases in responsive breakpoints, backend bonus not attempted.]

## Known Limitations

- No backend/API — data is served from a local JSON file (per the spec, this is acceptable and the bonus was not attempted).
- [Note any other known gaps here.]
