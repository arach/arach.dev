# Analytics for arach.dev and subprojects

arach.dev uses the Google Analytics measurement ID supplied by
`NEXT_PUBLIC_GA_MEASUREMENT_ID` (currently `G-GSHDZPFRZG`). Its Pulse property ID is
`525091599`. These identifiers have different purposes; do not substitute a
measurement ID for a property ID.

## Production collection

`components/GoogleAnalytics.tsx` uses `lib/analytics.ts` to load GA and Pulse only
after all of these checks pass:

- The build is production; Vercel preview and development environments are disabled.
- The browser origin is exactly `https://arach.dev` or `https://www.arach.dev`.
- The URL does not contain `analytics=off`.
- The browser has not enabled Do Not Track or Global Privacy Control.

The origin check runs before either external script is loaded. A production
build served on localhost, a LAN hostname, or a Vercel preview URL therefore
does not collect analytics. `NODE_ENV=production` alone is insufficient because
preview builds also use that value. The same gate applies to 404 pages.

Pulse records the requested URL and uses the explicit marker in
`app/not-found.tsx` to distinguish the site's missing-page view. The marker is a
page signal; it does not inspect the HTTP response status.

## Adding another project

Confirm the intended GA property and web stream in Google Analytics Admin.
Use that project's measurement ID, exact production origins, and Pulse
property ID if Pulse tracking is enabled. Do not copy arach.dev's identifiers
or broaden its allowlist to include local or preview hosts.

If a property intentionally contains multiple public sites, retain the
hostname when reporting traffic so those sites are not confused with each
other. Sharing a measurement ID also shares that property's reporting; it does
not create a separate project.

For a Next.js project, adapt this repository's gated bootstrap. For a static
site, apply the same browser checks before creating the external script tags.
Never paste an unconditional GA loader into a shared layout or static page.

## Verification without production traffic

Run `bun test tests/analytics.test.ts` to exercise the bootstrap in a VM with
stubbed scripts and no network. The tests cover local production builds,
preview URLs, exact production origins, privacy signals, and duplicate loading.

Use `?analytics=off` for browser QA on the production site, retaining it on each
navigation. Confirm that no GA or Pulse script or collector request is sent.
Raw HTTP source checks execute no JavaScript and do not emit analytics events.
Only send a real production beacon when that verification is explicitly wanted.
