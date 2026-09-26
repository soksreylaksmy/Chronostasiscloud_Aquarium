# Chronostasis Aquatic Monochrome Store

React + Vite storefront with a full-screen aquatic video background and live Strapi data.

## Strapi

The project is configured with:

```env
VITE_STRAPI_URL=https://strapi.aztrolabe.com
```

It loads products and categories from Strapi and creates orders through `/api/orders`.

## Background video

The supplied background video is included at `public/aquatic-background.mp4`.

## Brand

The site uses the Chronostasis logo asset at `src/asset/logo.png`. The browser icon is also Chronostasis. No FruitMark branding is used.

## Fonts

CSS prefers `The Heritage Legacy Fancy Logo` for display headings and `Canva Sans` for small/body text. These third-party font files are not redistributed in the project. Fallback fonts are included so the site runs immediately.

## Run

```bash
npm install
npm run dev
```
