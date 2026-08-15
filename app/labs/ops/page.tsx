import fs from 'node:fs';
import path from 'node:path';

import { OpsLab } from '@/components/labs/ops/OpsLab';
import { getAllIdeas } from '@/lib/ideas';
import { getHomepageProjectsWithLogos } from '@/lib/projects-server';

export const metadata = {
  title: 'ops · labs · arach.dev',
  description: 'On the keys — works, breath, paper.',
};

function plate(name: string) {
  const file = path.join(process.cwd(), 'public/labs/ops', name);
  return fs.existsSync(file) ? `/labs/ops/${name}` : undefined;
}

export default function OpsLabPage() {
  const projects = getHomepageProjectsWithLogos();
  const ideas = getAllIdeas();
  return (
    <OpsLab
      projects={projects}
      ideas={ideas}
      plates={{
        wash: plate('wash.png'),
        hero: plate('hero-plate.png'),
        keys: plate('keys.png'),
        grain: plate('grain.png'),
      }}
    />
  );
}
