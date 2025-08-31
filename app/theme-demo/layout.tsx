import { ThemeProvider } from '@/lib/theme-provider-clean';

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