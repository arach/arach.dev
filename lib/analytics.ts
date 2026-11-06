const PRODUCTION_ORIGINS = ['https://arach.dev', 'https://www.arach.dev'];
const GOOGLE_TAG_URL = 'https://www.googletagmanager.com/gtag/js';
const PULSE_TRACKER_URL = 'https://pulse.arach.dev/track.js';
export const PULSE_PROPERTY_ID = '525091599';

interface AnalyticsOptions {
  nodeEnv?: string;
  vercelEnv?: string;
  measurementId?: string;
  pulsePropertyId?: string;
}

// Escape HTML as well as JavaScript because this configuration is rendered inline.
function serialize(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function createAnalyticsScript(options: AnalyticsOptions): string | null {
  if (options.nodeEnv !== 'production') return null;
  if (options.vercelEnv && options.vercelEnv !== 'production') return null;
  if (!options.measurementId && !options.pulsePropertyId) return null;

  const config = {
    origins: PRODUCTION_ORIGINS,
    googleTagUrl: GOOGLE_TAG_URL,
    pulseTrackerUrl: PULSE_TRACKER_URL,
    measurementId: options.measurementId,
    pulsePropertyId: options.pulsePropertyId,
  };

  return `(function () {
    var config = ${serialize(config)};
    if (config.origins.indexOf(window.location.origin) === -1) return;
    if (new URLSearchParams(window.location.search).get('analytics') === 'off') return;
    if (navigator.globalPrivacyControl === true) return;
    var dnt = [navigator.doNotTrack, window.doNotTrack, navigator.msDoNotTrack];
    if (dnt.some(function (value) { return value === '1' || value === 'yes'; })) return;
    if (window.__arachAnalyticsInitialized) return;
    window.__arachAnalyticsInitialized = true;

    if (config.measurementId) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', config.measurementId, {
        page_path: window.location.pathname
      });
      var google = document.createElement('script');
      google.async = true;
      google.referrerPolicy = 'no-referrer';
      google.src = config.googleTagUrl + '?id=' + encodeURIComponent(config.measurementId);
      document.head.appendChild(google);
    }

    if (config.pulsePropertyId) {
      var pulse = document.createElement('script');
      pulse.defer = true;
      pulse.referrerPolicy = 'no-referrer';
      pulse.src = config.pulseTrackerUrl;
      pulse.setAttribute('data-property', config.pulsePropertyId);
      document.head.appendChild(pulse);
    }
  })();`;
}
