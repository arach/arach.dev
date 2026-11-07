import { ArrowUpRight } from 'lucide-react';

// /lab is rewritten to the separate Training Lab app, so links use plain anchors.
const LAB_HREF = '/lab';
const RECIPE_HREF = 'https://huggingface.co/arach/parakeet-coreml-recipe';
const CLEANUP_RECIPE_HREF = `${RECIPE_HREF}/tree/main/cleanup`;
const CLEANUP_RESULTS_HREF = `${RECIPE_HREF}/blob/main/cleanup/experiment/TAGGER.md`;

const THREADS = [
  {
    label: 'Published build',
    title: 'Parakeet on Apple Silicon',
    body: 'NVIDIA’s speech model converted to Core ML, with downloadable weights and the recipe to reproduce the build.',
    links: [
      { label: 'Parakeet weights', href: 'https://huggingface.co/arach/parakeet-tdt-0.6b-v3-coreml' },
      { label: 'Build recipe', href: RECIPE_HREF },
    ],
  },
  {
    label: 'New experiment',
    title: 'Tiny transcript cleanup',
    body: 'A 4.37M-parameter model that marks words to keep or delete, with code that limits the edits. An experimental step for after transcription.',
    links: [
      { label: 'Cleanup weights', href: 'https://huggingface.co/arach/transcript-cleanup-tiny' },
      { label: 'Code & training', href: CLEANUP_RECIPE_HREF },
    ],
  },
];

// Recorded input/output from tagger-two-separate-pauses in the frozen synthetic holdout.
const RAW_TRANSCRIPT = 'Um, I think the hinge, uh, needs a little oil.';
const CLEANED_TRANSCRIPT = 'I think the hinge needs a little oil.';

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
            Local speech, evals, and tiny models.
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
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
                  {t.links.map((link) => (
                    <a key={link.href} href={link.href} className="link-quiet inline-flex items-center gap-1 underline underline-offset-4">
                      {link.label} <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={CLEANUP_RESULTS_HREF}
          className="group block self-start border"
          style={{ borderColor: 'var(--theme-border-color)', backgroundColor: 'var(--theme-card-bg)' }}
        >
          <div
            className="fig flex items-center justify-between border-b px-4 py-2.5"
            style={{ borderColor: 'var(--theme-border-color)' }}
          >
            <span>Fig. L1 · cleanup pilot</span>
            <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
          </div>
          <div className="px-4 py-5 sm:px-5">
            <div className="fig" style={{ color: 'var(--theme-accent-color)' }}>Synthetic input</div>
            <p className="mt-2 font-mono text-[13px] leading-[1.65]">“{RAW_TRANSCRIPT}”</p>
          </div>
          <div className="border-t px-4 py-5 sm:px-5" style={{ borderColor: 'var(--theme-border-color)' }}>
            <div className="fig" style={{ color: 'var(--theme-accent-color)' }}>Recorded output</div>
            <p className="mt-2 font-mono text-[13px] leading-[1.65]">“{CLEANED_TRANSCRIPT}”</p>
          </div>
          <div className="border-t px-4 py-4 sm:px-5" style={{ borderColor: 'var(--theme-border-color)' }}>
            <p className="text-[13px] leading-[1.6]" style={{ color: 'var(--theme-muted-color)' }}>
              39/48 reference matches on a synthetic holdout; all 24 unchanged inputs
              preserved. Real dictation and app integration are still ahead.
            </p>
            <span className="mt-3 inline-block text-[13px] underline underline-offset-4">Read the results and limitations</span>
          </div>
        </a>
      </div>
    </section>
  );
}
