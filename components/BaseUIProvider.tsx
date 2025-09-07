'use client';

import { ReactNode, useMemo, useEffect, useState } from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { BaseProvider } from 'baseui';

// Create theme based on our existing terminal theme CSS variables
const terminalTheme = {
  colors: {
    primary: '#fbbf24',
    primary50: '#fffbf0',
    primary100: '#fef3c7',
    primary200: '#fde68a',
    primary300: '#fbbf24',
    primary400: '#f59e0b',
    primary500: '#d97706',
    primary600: '#b45309',
    primary700: '#92400e',
    
    // Use CSS custom properties for dynamic theming
    backgroundPrimary: 'var(--bg-primary, #1e293b)',
    backgroundSecondary: 'var(--bg-secondary, #334155)',
    backgroundTertiary: 'var(--bg-terminal, #0f172a)',
    
    contentPrimary: 'var(--text-primary, #fbbf24)',
    contentSecondary: 'var(--text-secondary, #64748b)',
    contentTertiary: 'var(--text-terminal, #fbbf24)',
    
    accent: 'var(--accent, #fbbf24)',
    border: 'var(--border, #475569)',
    
    // Terminal status colors
    positive: 'var(--terminal-green, #22c55e)',
    negative: 'var(--terminal-red, #ef4444)',
    warning: 'var(--terminal-yellow, #fbbf24)',
  },
  typography: {
    font100: {
      fontFamily: 'var(--font-ibm-plex-mono), IBM Plex Mono, monospace',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    font200: {
      fontFamily: 'var(--font-ibm-plex-mono), IBM Plex Mono, monospace',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    font300: {
      fontFamily: 'var(--font-ibm-plex-mono), IBM Plex Mono, monospace',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '28px',
    },
    font400: {
      fontFamily: 'var(--font-ibm-plex-mono), IBM Plex Mono, monospace',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '32px',
    },
    font500: {
      fontFamily: 'var(--font-ibm-plex-mono), IBM Plex Mono, monospace',
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '36px',
    },
  },
  borders: {
    border100: {
      borderColor: 'var(--border, #475569)',
      borderStyle: 'solid',
      borderWidth: '1px',
    },
  },
};

interface BaseUIProviderProps {
  children: ReactNode;
}

export function BaseUIProvider({ children }: BaseUIProviderProps) {
  const [isClient, setIsClient] = useState(false);
  const engine = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new Styletron();
    }
    return null;
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !engine) {
    return <div>{children}</div>;
  }

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={terminalTheme}>
        {children}
      </BaseProvider>
    </StyletronProvider>
  );
}