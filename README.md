# Haddam, Connecticut — Community Site

Static site. Plain HTML5, CSS and vanilla JS. No frameworks, no build step.

**Target URL:** https://springteasers.github.io/haddam-ct-community/
**Repo:** `SpringTeasers/haddam-ct-community`

## Files

| Path | Purpose |
|---|---|
| `index.html` | Home — hero, quick links, stat strip, villages, town life, contact band |
| `about.html` | About Haddam — geography, five villages, full history, Venture Smith, government |
| `things-to-do.html` | Parks, Higganum Cove, Cockaponset, library programs, seasonal events |
| `businesses.html` | Business directory with live search/category filter |
| `services.html` | Town offices, departments, alerts, library, schools, utilities |
| `news-events.html` | News and events — clearly labelled **sample section** |
| `contact.html` | Contact form (sample), Town Hall details, who-to-contact table |
| `css/tokens.css` | Design tokens — the only place raw hex values appear |
| `css/main.css` | All layout, components, responsive rules, print styles |
| `js/site.js` | Mobile menu disclosure + business directory filter (progressive enhancement) |
| `favicon.svg` | Civic mark (three granite/river bars) |
| `.nojekyll` | Required for GitHub Pages — present and empty |

## Deployment notes

- Push the **contents of this `code/` folder to the repo root** — `index.html` must be at the top level, not inside `code/`.
- `.nojekyll` must land at the repo root, or Pages will drop files starting with `_` and fail the build.
- Enable GitHub Pages: Settings → Pages → Deploy from branch → `main` → `/ (root)`.
- No build, no install, no CI. Serving the folder is the whole deploy.

## Build decisions recorded

- **Filenames** follow the designer's fixed set in `design/style-guide.md` §10.8 — `businesses.html` and `services.html`, not the working names in the content filenames. Nav, breadcrumbs and the footer "Explore" column all point at exactly those names.
- **URLs.** No production domain was assigned, so `canonical`, `og:url` and `og:image` use **relative** paths per the canonical-URL rule. `og:image` is omitted entirely rather than fabricated — no licensed 1200×630 image exists. When the Pages URL is live, the canonical/`og:url` can be switched to absolute `https://springteasers.github.io/haddam-ct-community/<page>`.
- **No imagery.** Every image slot in the design system was `[asset needed]` and the research pack recorded no licensed photographs, so **no `<img>` elements were shipped at all** — no placeholders, no fabricated alt text, no stock. The system was designed to look complete without photography. Icons are inline SVG with `aria-hidden="true"`.
- **Fonts.** Source Sans 3 loaded with `display=swap` and a full system-UI fallback; the site renders correctly if the font CDN is blocked. Removing the `<link>` is safe.
- **Business listings** are the 10 verified in `research/haddam-verified-facts.md`, grouped into four categories, each card carrying `data-category` / `data-name` / `data-search` for the filter. Anderson & Son Construction has no street address in the town's entry — that is stated on the card rather than invented.
- **"No website listed"** is the honest fallback on Debs Restaurant and Candlewood Hill Tree Farm, per the design system.
- **Nothing unverified is asserted.** "Mayor", "Town Council" and "City Council" do not appear. No school address or district phone number is published (none was confirmed). No email address is published for this site.
- The **contact form is a layout sample** and does not submit — flagged visibly on the page, as the content file requires.
- The **news page is a sample section** with the notice rendered at the top of the page, not hidden.

## Accessibility

- One `<h1>` per page, no skipped heading levels; landmarks per page: `header`, `nav[aria-label="Primary"]`, `main#main`, `footer`, plus labelled secondary navs.
- Skip link, `:focus-visible` amber ring (gold on the river-blue bands), 44px minimum tap targets.
- Menu state driven by `aria-expanded` / `hidden`; Escape closes and returns focus; works with JS disabled.
- Business filter uses the `hidden` attribute (screen-reader detectable) and announces results via `role="status"`.
- Colour pairings restricted to the validated set in `design/color-palette.md` §4 — no improvised text-on-background combinations.
