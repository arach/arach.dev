/** Marks for the ops lab. Breath + route, not generic field-ops. currentColor so they theme. */

export function BreathWave({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 220"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path
        d="M0 110 C 50 110, 70 40, 110 40 S 170 180, 210 180 S 270 40, 310 40 S 370 180, 410 180 S 470 40, 510 40 S 570 180, 610 180 S 670 110, 720 110 H 800"
        strokeWidth="1.25"
      />
      <path
        d="M0 110 C 50 110, 70 62, 110 62 S 170 158, 210 158 S 270 62, 310 62 S 370 158, 410 158 S 470 62, 510 62 S 570 158, 610 158 S 670 110, 720 110 H 800"
        strokeWidth="0.75"
        opacity="0.55"
      />
      <path d="M110 28 v18 M310 28 v18 M510 28 v18" strokeWidth="0.75" />
      <path d="M210 174 v18 M410 174 v18 M610 174 v18" strokeWidth="0.75" />
    </svg>
  );
}

export function BreathMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 24"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M2 12 C 8 12, 10 4, 16 4 S 24 20, 30 20 S 38 12, 46 12" strokeWidth="1.5" />
    </svg>
  );
}

export function CompassArc({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
      aria-hidden
    >
      {Array.from({ length: 13 }, (_, i) => {
        const angle = -36 + i * 6;
        return (
          <line
            key={angle}
            x1="360"
            y1="260"
            x2="360"
            y2="-20"
            transform={`rotate(${angle} 360 260)`}
          />
        );
      })}
      <path d="M120 236 A 248 248 0 0 1 600 236" strokeWidth="1.25" />
      <path d="M200 228 A 168 168 0 0 1 520 228" />
      <circle cx="360" cy="260" r="6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DraftingWheel({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <circle cx="200" cy="200" r="188" strokeWidth="0.75" />
      <circle cx="200" cy="200" r="148" strokeWidth="0.75" />
      <circle cx="200" cy="200" r="92" strokeWidth="1" />
      <circle cx="200" cy="200" r="28" strokeWidth="1.25" />
      {Array.from({ length: 24 }, (_, i) => (
        <line
          key={i}
          x1="200"
          y1="14"
          x2="200"
          y2={i % 3 === 0 ? 42 : 28}
          transform={`rotate(${i * 15} 200 200)`}
          strokeWidth={i % 3 === 0 ? 1.25 : 0.75}
        />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <line
          key={`spoke-${i}`}
          x1="200"
          y1="128"
          x2="200"
          y2="172"
          transform={`rotate(${i * 45} 200 200)`}
          strokeWidth="0.75"
        />
      ))}
    </svg>
  );
}

export function RegistrationMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <circle cx="32" cy="32" r="22" strokeWidth="1.25" />
      <circle cx="32" cy="32" r="8" strokeWidth="1" />
      <line x1="32" y1="2" x2="32" y2="18" strokeWidth="1.25" />
      <line x1="32" y1="46" x2="32" y2="62" strokeWidth="1.25" />
      <line x1="2" y1="32" x2="18" y2="32" strokeWidth="1.25" />
      <line x1="46" y1="32" x2="62" y2="32" strokeWidth="1.25" />
    </svg>
  );
}

export function ChevronStrip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 16" fill="currentColor" className={className} aria-hidden>
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M${i * 22} 0h6l8 8-8 8h-6l8-8z`} />
      ))}
    </svg>
  );
}

export function HatchBand({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={className} aria-hidden>
      <defs>
        <pattern id="ops-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="240" height="24" fill="url(#ops-hatch)" />
    </svg>
  );
}

export function CornerTicks({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <span className="ops-tick ops-tick-tl" />
      <span className="ops-tick ops-tick-tr" />
      <span className="ops-tick ops-tick-bl" />
      <span className="ops-tick ops-tick-br" />
    </div>
  );
}

export function BreathStamp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="1" />
      <path
        d="M52 100 C 64 100, 68 78, 80 78 S 96 122, 108 122 S 124 78, 136 78 S 148 100, 160 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <defs>
        <path id="ops-stamp-ring" d="M100,100 m-66,0 a66,66 0 1,1 132,0 a66,66 0 1,1 -132,0" />
      </defs>
      <text
        fill="currentColor"
        fontSize="10.5"
        letterSpacing="2.6"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        <textPath href="#ops-stamp-ring" startOffset="0%">
          INHALE · BUILD · EXHALE · SHIP · ARACH ·
        </textPath>
      </text>
    </svg>
  );
}

export function RouteLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 24" fill="none" stroke="currentColor" className={className} aria-hidden>
      <line x1="12" y1="12" x2="628" y2="12" strokeWidth="1" />
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      <circle cx="320" cy="12" r="4" fill="currentColor" stroke="none" />
      <circle cx="628" cy="12" r="4" fill="none" strokeWidth="1.5" />
    </svg>
  );
}

export function RotorMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <circle cx="24" cy="24" r="22" strokeWidth="1" />
      <circle cx="24" cy="24" r="14" strokeWidth="0.75" />
      <circle cx="24" cy="24" r="4" fill="currentColor" stroke="none" />
      <line x1="24" y1="2" x2="24" y2="10" strokeWidth="1.25" />
      <line x1="24" y1="38" x2="24" y2="46" strokeWidth="1.25" />
    </svg>
  );
}
