'use client';

/*
  THESIS: this route is a shell session, not an about page wearing a `$`. It
  refuses the category default on both sides — the neon-on-black hacker terminal
  and the marketing hero with a prompt glued underneath.
  OWN-WORLD: the site's locked "on the keys" palette rendered as a hardcopy
  terminal — policy paper (#efe9dc), ink, breath teal for the prompt, copper for
  the live signal. One mono face, one left rail, hairline rules, paper tooth.
  STORY: you land mid-session. Someone already ran `whoami`; the answer is the
  page. The cursor is waiting for you.
  FIRST VIEWPORT: full-bleed status line up top, session printing from the top of
  the field, live prompt directly under the last output line, empty paper below
  it, hint rail pinned at the bottom.
  FORM: a printed shell session — chosen over the assigned poster-terminal read
  because the field must be usable, not framed.
*/

import { useEffect, useRef, useState } from 'react';
import CommandLine, { type CommandLineHandle } from '@/components/CommandLine';
import { COMMANDS } from '@/lib/Commands';
import './terminal.css';

const PROMPT = 'arach@arach.dev:~$';
const BOOT_COMMAND = 'whoami';

const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/* Shells print `Sat Aug 15 15:18:27`, not a locale string with commas. */
function shellDate(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? '';
  return `${get('weekday')} ${get('month')} ${get('day')} ${get('hour')}:${get('minute')}:${get('second')}`;
}

export default function AboutTerminalPage() {
  const commandLine = useRef<CommandLineHandle | null>(null);
  const [clock, setClock] = useState<string | null>(null);
  const [login, setLogin] = useState<string | null>(null);

  useEffect(() => {
    setLogin(shellDate(new Date()));
    const tick = () => setClock(timeFormat.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="ops-root tty"
      style={{ ['--tty-grain' as string]: 'url(/labs/ops/grain.png)' }}
    >
      <header className="tty-bar">
        <span className="tty-bar-group">
          <span className="tty-live" aria-hidden />
          <span className="tty-bar-host">arach@arach.dev</span>
          <span className="tty-bar-sep" aria-hidden>·</span>
          <span>~</span>
        </span>
        <span className="tty-bar-group">
          <span className="hidden sm:inline">tty/1</span>
          <span className="tty-bar-sep hidden sm:inline" aria-hidden>·</span>
          <span className="tty-clock" suppressHydrationWarning>{clock ?? '--:--:--'}</span>
        </span>
      </header>

      <main
        className="tty-field"
        onClick={() => commandLine.current?.focus()}
      >
        <div className="tty-session">
          <p className="tty-muted tty-print" style={{ animationDelay: '40ms' }}>
            Last login: <span suppressHydrationWarning>{login ?? '—'}</span> on ttys001
          </p>

          <p className="tty-print" style={{ animationDelay: '200ms', marginTop: '1.6em' }}>
            <span className="tty-accent">{PROMPT}</span>{' '}
            <span
              className="tty-type"
              style={{ ['--tty-type-width' as string]: `${BOOT_COMMAND.length}ch` }}
            >
              {BOOT_COMMAND}
            </span>
          </p>

          <p className="tty-name tty-print" style={{ animationDelay: '860ms', marginTop: '1.6em' }}>
            Arach Tchoupani
          </p>

          <p className="tty-lede tty-print" style={{ animationDelay: '960ms', marginTop: '1em' }}>
            Local-first tools for AI agents, including typography, keyboard
            shortcuts, and interaction design.
          </p>

          <p className="tty-muted tty-print" style={{ animationDelay: '1060ms', marginTop: '1.6em' }}>
            Montreal / SF
            <span className="tty-bar-sep"> · </span>
            <a className="tty-link" href="https://github.com/arach" rel="me noreferrer" target="_blank">
              github.com/arach
            </a>
            <span className="tty-bar-sep"> · </span>
            <a className="tty-link" href="mailto:arach@arach.dev">arach@arach.dev</a>
          </p>

          <div className="tty-print" style={{ animationDelay: '1300ms', marginTop: '1.6em' }}>
            <CommandLine
              className="tty-cli"
              initialOutput={[]}
              promptLabel={PROMPT}
              echoPrefix={PROMPT}
              blockCursor
              autoScroll
              completions={COMMANDS}
              handleRef={commandLine}
            />
          </div>
        </div>
      </main>

      <footer className="tty-hints">
        <span className="tty-hints-label">try</span>
        <span className="tty-chips">
          {COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              className="tty-chip"
              onClick={() => commandLine.current?.run(cmd)}
            >
              {cmd}
            </button>
          ))}
        </span>
        <span className="tty-keys">↑ history · tab completes</span>
      </footer>
    </div>
  );
}
