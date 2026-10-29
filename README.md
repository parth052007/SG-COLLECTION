# SG COLLECTION — Static Sports Eyewear Store

A mobile-friendly, frontend-only demo store built with HTML, CSS and vanilla JavaScript.

## Pages
- `index.html` — editorial-style landing page
- `shop.html` — product grid, search and category filters
- `product.html` — product detail page and quantity selector

## Run locally
1. Extract the ZIP.
2. Open the `SG-COLLECTION` folder in VS Code.
3. Open `index.html` in a browser, or use the Live Server extension.
4. Keep the folder structure unchanged so relative asset paths continue to work.

## Set up WhatsApp orders
1. Open `js/products.js`.
2. Find:
   `const WHATSAPP_NUMBER = "91XXXXXXXXXX";`
3. Replace it with your WhatsApp number using country code and digits only.
   Example format for India: `919876543210` (no `+`, spaces or hyphens).
4. Save the file and test a Buy Now button.

Until a valid number is added, Buy Now shows a setup message rather than opening a broken link.

## Product images
The project includes local SVG demo artwork so it works immediately and does not depend on remote product-image URLs. To use your own photos:
1. Put images in `assets/images/`.
2. Open `js/products.js` and update each product's `image` path to the exact filename, for example `assets/images/sport-frame-01.jpeg`.
3. For the landing and shop hero, update the image path in `index.html` and `shop.html` too.
4. Match extensions exactly (`.jpg` and `.jpeg` are different filenames on some systems).

## Important
- This is a static frontend; it has no payment gateway, database, inventory management or order backend.
- WhatsApp opens an order enquiry with product details. Confirm availability, shipping and payment manually.
- Google Fonts are optional external typography. If unavailable, fallback fonts are used.
