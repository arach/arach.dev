import { createAnalyticsScript, PULSE_PROPERTY_ID } from '@/lib/analytics';

export function GoogleAnalytics() {
  const script = createAnalyticsScript({
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    pulsePropertyId: PULSE_PROPERTY_ID,
  });
  if (!script) return null;

  return (
    <script id="site-analytics" dangerouslySetInnerHTML={{ __html: script }} />
  );
}
