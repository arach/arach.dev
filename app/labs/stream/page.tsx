import { DevLog } from '@/components/labs/DevLog';

export const metadata = {
  title: 'dev log · labs · arach.dev',
  description: 'Prototype: chronological developer log — commits, releases, project landings, and notes interleaved by time.',
};

export default function StreamLabPage() {
  return <DevLog />;
}
