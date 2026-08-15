import { Archivo } from 'next/font/google';

import '@/components/labs/ops/ops.css';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-ops-display',
  display: 'swap',
});

export default function OpsLabLayout({ children }: { children: React.ReactNode }) {
  return <div className={archivo.variable}>{children}</div>;
}
