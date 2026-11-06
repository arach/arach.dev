import { ArrowUpRight } from 'lucide-react';

// /lab is rewritten to the separate Training Lab app, so links use plain anchors.
const LAB_HREF = '/lab';

const THREADS = [
  {
    label: 'Current thread',
    title: 'Voice memo extraction',
    body: 'Turning short voice memos into titles and small intents, and measuring when a tiny model should hold back.',
  },
  {
    label: 'Foundation',
    title: 'Dictation to structured output',
    body: 'Speech normalization and protocol formatting, split between a model and a deterministic processor.',
  },
];

const MEMO =
  'Need to talk to Maya about the deck or maybe just send it over first, I’m not sure which is less annoying.';

const EXTRACTION = `{
  "title": "Decide how to share deck with Maya",
  "intent": "none",
  "target": ""
}`;

export function LabSection() {
  return (
    <section aria-labelledby="lab-heading" className="mt-20 sm:mt-24">
      <div className="section-head flex-wrap">
        <h2 id="lab-heading" className="fig" style={{ color: 'var(--theme-text-color)' }}>
          ( 02 ) Training lab
        </h2>
        <a href={LAB_HREF} className="fig link-quiet inline-flex items-center gap-1">
          Open the lab <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-12">
        <div>
          <h3 className="max-w-[20ch] text-[28px] font-bold leading-[1.08] tracking-[-0.035em] sm:text-[34px]">
            Voice notes, evals, and tiny models.
          </h3>
          <p
            className="mt-4 max-w-[46ch] text-[15px] leading-[1.65]"
            style={{ color: 'var(--theme-muted-color)' }}
          >
            Training experiments, eval design, and notes written while learning in public.
            Some of it is careful benchmark work; some of it is trying things and writing
            down what changed.
          </p>

          <ul className="mt-8 border-t" style={{ borderColor: 'var(--theme-border-color)' }}>
            {THREADS.map((t) => (
              <li
                key={t.title}
                className="border-b py-4"
                style={{ borderColor: 'var(--theme-border-color)' }}
              >
                <div className="fig">{t.label}</div>
                <div className="mt-1.5 text-[16px] font-semibold tracking-[-0.01em]">{t.title}</div>
                <p className="mt-1 text-[14px] leading-[1.6]" style={{ color: 'var(--theme-muted-color)' }}>
                  {t.body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={LAB_HREF}
          className="group block self-start border"
          style={{ borderColor: 'var(--theme-border-color)', backgroundColor: 'var(--theme-card-bg)' }}
        >
          <div
            className="fig flex items-center justify-between border-b px-4 py-2.5"
            style={{ borderColor: 'var(--theme-border-color)' }}
          >
            <span>Fig. L1 · one current example</span>
            <span className="transition-colors group-hover:text-[color:var(--theme-accent-color)]">/lab</span>
          </div>
          <div className="px-4 py-5 sm:px-5">
            <div className="fig" style={{ color: 'var(--theme-accent-color)' }}>Voice memo</div>
            <p className="mt-2 font-mono text-[13px] leading-[1.65]">“{MEMO}”</p>
          </div>
          <div className="border-t px-4 py-5 sm:px-5" style={{ borderColor: 'var(--theme-border-color)' }}>
            <div className="fig" style={{ color: 'var(--theme-accent-color)' }}>Extraction</div>
            <pre
              className="mt-2 overflow-x-auto font-mono text-[13px] leading-[1.65]"
              style={{ color: 'var(--theme-muted-color)' }}
            >
              {EXTRACTION}
            </pre>
          </div>
        </a>
      </div>
    </section>
  );
}
