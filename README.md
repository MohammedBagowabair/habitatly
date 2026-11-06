# Habitatly

Design Better. Live Greener.

Habitatly is a frontend-only interactive prototype of an AI-guided sustainable home renovation planner. It is a demo for walkthroughs and presentations. There is no backend, database, account system, payment flow, or live AI API. Analysis is a short simulated animation. Prices are estimates. Platform statistics and environmental figures are illustrative, not measured results.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm run build
npm run preview
```

`npm run build` typechecks with TypeScript and writes a production bundle to `dist/`.

### Deploy base path

`vite.config.ts` uses `/` by default. For a GitHub Pages-style subdirectory, set `VITE_BASE` (for example `VITE_BASE=/habitatly/`) when you build. The same value is used as the React Router basename.

## Journey

| Route | Screen |
| --- | --- |
| `/` | Home |
| `/project` | Start Your Project |
| `/analysis` | Smart Space Analysis |
| `/designs` | Design Studio |
| `/materials` | Materials & Budget |
| `/diy` | DIY Guide |
| `/green-living` | Green Living |

The story runs Discover → Analyze → Imagine → Select → Calculate → Renovate → Make an Impact. Choices are kept in `localStorage` under `habitatly-project-v1`, including the room photo as a data URL, so a reload keeps the demo. **Reset demo** in the header or footer clears that state.

You can open any route directly. Missing project details show a prompt or a sample stand-in instead of a broken page.

## Photographs

Images live in `public/images/` and are stored in the repo (they are not hotlinked). They come from Unsplash and Pexels under those libraries' licenses, plus one public-domain cork photograph.

Unsplash photos (https://unsplash.com): `1600210492486`, `1600585154340`, `1616486338812`, `1617325247661`, `1556909212`, `1620626011761`, `1560185007`, `1593062096033`, `1631679706909`, `1618221195710`, `1615876234886`, `1562259949`, `1555041469`, `1513506003901`, `1600166898405`, `1554995207`, `1586023492125`, `1524758631624`, `1585704032915`, `1532996122724`, `1616046229478`, `1449844908441`, `1600566753086`, `1600210491892`.

Pexels photos (https://www.pexels.com): `172292`, `129731`, `6560317`, `1669799`, `6444256`, `112811`, `4792506`, `4246120`, `5691622`, `1094767`, `6474471`, `1123262`, `326311`, `1108572`, `1029604`.

Cork floor: [Cork bathroom flooring](https://commons.wikimedia.org/wiki/File:Cork_bathroom_flooring.jpg) by Mike1024, public domain, via Wikimedia Commons. The file in this repo is a crop of the cork surface.

The Habitatly mark is an original SVG (`src/assets/mark.svg`, `public/favicon.svg`).
