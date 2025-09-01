import { ThemeProvider } from '@/lib/theme/site/provider';

export default function ThemeDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}