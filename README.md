# Mae Ann Bodiongan — Engineering portfolio

A refactor of the existing React / Vite portfolio, with a warm neutral visual system and one lazy-loaded Three.js scene. Industrial Engineering leads the story; AI and automation follow from documented professional work.

## Run and verify

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
```

Deploy the same repository to the existing Vercel project. Keep its existing environment variables. The contact form continues to POST to `/api/contact`; its original validation, rate limiting, honeypot, duplicate-submission IDs, Google Apps Script delivery, database storage, and optional n8n notification code are retained.

Local Vite preview serves the frontend only. Contact delivery requires Vercel's serverless runtime and the configured backend variables. See the existing CONTACT-BACKEND-SETUP.md and CONTACT-AUTOMATION.md for configuration. Never put secrets into frontend code.

## Design and implementation

- One continuous opening: system, process, optimization, intelligence. A sticky geometric process model stays alongside readable HTML. Projects and professional evidence complete the story.
- All five employment records, degree, five training records, seven awards, service and skill groups, original project links, portrait, résumé, social/contact links, inquiry demo, and contact fields remain.
- Engineering case studies summarize existing JCV and ELPS responsibilities. No invented performance metrics, clients, years of experience, or certifications.
- `src/data/content.ts` and `src/data/story.ts` hold professional content. Keep QUALIFICATIONS-SOURCE.md accuracy rules when editing.
- `src/components/three/EngineeringScene.tsx` owns a single canvas, bounded device pixel ratio, geometric assets, visibility-aware rendering, resource disposal, and a WebGL fallback. Desktop animation is capped at 30 fps. Mobile and reduced-motion users receive a static state.
- Semantic sections, skip link, focus indicators, keyboard-operated tabs, mobile menu with Escape dismissal, and browser-native form validation.
- Previous unused cinematic, film, and biography scene implementations were removed to eliminate competing rendering systems.

## Verification for this redesign

TypeScript and all four existing contact API tests passed. Browser checks covered 1440px desktop and 390px mobile layouts, absence of horizontal overflow, one canvas, tab keyboard navigation, mobile menu and Escape, inquiry classification/stage/reset, and required form validation.

The restricted Windows session could not launch esbuild subprocesses. Its preview build used Vite/Rollup with in-process TypeScript transpilation and Terser minification; standard npm build remains configured for Vercel and CI. Live delivery and field Core Web Vitals require the deployed site and were not verified locally.
