---
description: Launch and drive the Astro landing page locally for visual validation
---

# Run Local

Launch the Astro dev server and open the browser so the user can visually validate the landing page.

## Prerequisites

- Node.js and npm must be available.
- Dependencies are installed (`node_modules` exists); if not, run `npm install` first.

## Steps

1. **Start the dev server**
   ```bash
   npm run dev
   ```
   Astro will start on `http://localhost:4321` by default.

2. **Open the browser**
   Once the dev server prints the local URL, open it with the system browser:
   - Windows: `start http://localhost:4321`
   - macOS: `open http://localhost:4321`
   - Linux: `xdg-open http://localhost:4321`

3. **Validate**
   Tell the user the URL and ask them to confirm visually that the site looks correct.

## Notes

- The project is an Astro + Tailwind landing page (`alojamientostossademar.com`).
- If the port is already in use, Astro will prompt to use the next available port; adjust the browser URL accordingly.
