import { createAnalyticsScript, PULSE_PROPERTY_ID } from '@/lib/analytics';
import Script from 'next/script';

export function GoogleAnalytics() {
  const script = createAnalyticsScript({
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    pulsePropertyId: PULSE_PROPERTY_ID,
  });
  if (!script) return null;

  return (
    <Script id="site-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: script }} />
  );
}
