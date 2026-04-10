# Google Analytics Setup for Subprojects

Your main arach.dev site is now configured with Google Analytics (G-GSHDZPFRZG).

## For GitHub Pages Subprojects

Add this snippet to the `<head>` section of your HTML files in each subproject:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-GSHDZPFRZG"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-GSHDZPFRZG');
</script>
```

## Projects to Update

Based on your projects list, here are the GitHub Pages sites that should include GA:

- **Blink**: https://arach.github.io/blink
- **Scout**: https://arach.github.io/scout
- **Peal**: https://arach.github.io/peal
- **Pomo**: https://arach.github.io/pomo
- **2048ish**: https://arach.github.io/2048ish
- **Grab**: https://arach.github.io/grab
- **Tempo**: https://arach.github.io/tempo
- **Reflow**: https://arach.github.io/reflow

## For React/Next.js Subprojects

If a subproject uses React or Next.js, you can copy the `GoogleAnalytics` component:

```tsx
// components/GoogleAnalytics.tsx
import Script from 'next/script'; // or use regular <script> tags for non-Next.js

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-GSHDZPFRZG"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GSHDZPFRZG');
        `}
      </Script>
    </>
  );
}
```

Then import and add `<GoogleAnalytics />` to your root layout or main component.

## For Hosted Sites

Sites with custom domains (like Talkie at usetalkie.com) should also include the same GA snippet in their HTML head section.

## Testing

1. Visit your site in a browser
2. Open Developer Tools > Network tab
3. Look for requests to `googletagmanager.com` or `google-analytics.com`
4. Or check Real-Time reports in Google Analytics dashboard

## Environment Variables (Optional)

For better security in projects with build systems, use environment variables:

```bash
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-GSHDZPFRZG
```

Then reference it in code:
```typescript
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
```
