# Campus Market

**Your campus. Your marketplace.**

A polished, front-end-only demo of **Campus Market** — the verified, searchable student marketplace for Makerere University Jinja Campus, built from the Group 7 IST2106 Technopreneurship proposal.

![React](https://img.shields.io/badge/React-18-123A25?style=flat-square&logo=react&logoColor=DCF275)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-123A25?style=flat-square&logo=tailwindcss&logoColor=DCF275)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-123A25?style=flat-square&logo=framer&logoColor=DCF275)
![Vite](https://img.shields.io/badge/Vite-5-123A25?style=flat-square&logo=vite&logoColor=DCF275)

---

## What it does

Campus Market replaces the chaos of WhatsApp buying-and-selling groups with one trusted, searchable marketplace for verified students.

- **Verified student sellers** — registration number, campus and moderator check shown on every profile.
- **Search, compare, filter** — keyword search, category, condition, campus, max price, verified-only, and price sorting.
- **Rich listings** — photos of the real item, honest condition, campus pickup point, negotiable flag and view counts.
- **In-app chat** — quick replies, typing indicator and context-aware demo responses before contact details are shared.
- **Confirmed orders** — pickup choice, 5% seller commission breakdown, order reference and WhatsApp unlock only after confirmation.
- **Trust & safety** — report a listing in one tap, public meeting-point guidance and safety reminders.
- **Featured boost** — UGX 2,000 for 3 days, with the first 30 sellers free.
- **Saved listings & seller profile** — favourites, your own listings, ratings and reviews, all persisted on the device.

> This is a front-end demonstration. There is no backend, authentication or payment processing. Listings, saved items and chat state live in the browser and reset if site data is cleared.

---

## Getting started

Requires **Node.js 18+** and npm.

```bash
npm install
npm run dev
```

Open **http://localhost:5173**.

Production build:

```bash
npm run build
npm run preview
```

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 with custom design tokens |
| Motion | Framer Motion 11 (page transitions, reveals, drawers, modals) |
| Routing | React Router 6 |
| Icons | Lucide React |
| Notifications | Sonner |
| Persistence | `localStorage` for saved items and user listings |

---

## Design system

- **Cream** `#F7F4EC` canvas with deep **forest** greens and a **lime** accent.
- **Fraunces** display serif for headlines, **Plus Jakarta Sans** for UI text.
- Soft, lifted shadows, rounded 2xl–4xl surfaces and restrained motion.
- Mobile-first: floating bottom navigation, filter sheet, and a full-height chat panel.
- Accessibility: every route scores **100 / 100 / 100** on Lighthouse for accessibility, best practices and SEO.

---

## Project structure

```text
src/
├─ components/      Navbar, BottomNav, Footer, ProductCard, Avatar, Modal,
│                   ChatDrawer, OrderModal, ReportModal, EmptyState, Reveal
├─ context/         AppContext — saved items, user listings, localStorage
├─ data/            Mock products, sellers, conversations, reviews, stats
├─ lib/             Formatting helpers, auto-reply logic
├─ pages/           Landing, Browse, ProductDetail, Sell, Messages, Saved,
│                   Profile, NotFound
├─ App.jsx          Routes, page transitions, toast host
└─ index.css        Tailwind layers, design tokens, component classes
public/
├─ images/          Local product photography
└─ robots.txt
```

---

## Demo flows to try

1. **Browse → search** for “iPhone”, filter by Electronics and sort by price.
2. **Save** a few listings, then open **Saved** from the navbar.
3. Open a listing → **Chat with seller** → send “Can I pick it up tomorrow?”.
4. **Confirm order** → choose a pickup point → see the 5% commission math and unlocked WhatsApp contact.
5. **Sell an item** → use a sample photo, fill the form, publish, and see it appear in your profile.
6. **Report** a listing from its detail page.
7. Resize to mobile to try the bottom nav, filter sheet and chat back-navigation.

---

## Notes & limitations

- Prices are in UGX and commission is calculated at 5% of the listing price, rounded.
- Order references are generated locally (for example `CM-4OJV25`).
- Seller phone numbers and WhatsApp links are demo data.
- Photos uploaded in the Sell flow are resized and compressed to data URLs so they survive a reload.
- No data leaves the browser.

---

Built for **Makerere University Jinja Campus** · Group 7 · IST2106 Technopreneurship · 2026
