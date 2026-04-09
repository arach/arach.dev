/**
 * Screenshot capture script for project websites
 * Uses Playwright to capture high-quality screenshots of each project's live site
 *
 * Usage: npx tsx scripts/capture-screenshots.ts [slug]
 * - No args: captures all projects with websiteUrl
 * - With slug: captures only that project
 */

import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface ProjectScreenshot {
  slug: string;
  url: string;
  name: string;
}

// Projects with their live website URLs
const projects: ProjectScreenshot[] = [
  { slug: 'openscout', url: 'https://openscout.app', name: 'OpenScout' },
  { slug: 'talkie', url: 'https://usetalkie.com', name: 'Talkie' },
  { slug: 'lattices', url: 'https://lattices.dev', name: 'Lattices' },
  { slug: 'linea', url: 'https://uselinea.com', name: 'Linea' },
  { slug: 'hudson', url: 'https://hudsonos.com', name: 'Hudson' },
  { slug: 'fabric', url: 'https://fab.run', name: 'Fabric' },
  { slug: 'arc', url: 'https://arc.jdi.sh', name: 'Arc' },
  { slug: 'dewey', url: 'https://dewey.arach.dev', name: 'Dewey' },
  { slug: 'og', url: 'https://og.arach.dev', name: 'OG' },
  { slug: 'speakeasy', url: 'https://speakeasy.arach.dev', name: 'Speakeasy' },
  { slug: 'hooked', url: 'https://hooked.arach.dev', name: 'Hooked' },
  { slug: '2048ish', url: 'https://arach.github.io/2048ish', name: '2048ish' },
];

async function captureScreenshot(
  project: ProjectScreenshot,
  outputDir: string
): Promise<void> {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2, // Retina quality
  });

  const page = await context.newPage();

  try {
    console.log(`📸 Capturing ${project.name} (${project.url})...`);

    // Navigate with timeout
    await page.goto(project.url, {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait a bit for any animations to settle
    await page.waitForTimeout(1500);

    // Capture screenshot
    const outputPath = path.join(outputDir, `${project.slug}.png`);
    await page.screenshot({
      path: outputPath,
      type: 'png',
    });

    console.log(`   ✓ Saved to ${outputPath}`);
  } catch (error) {
    console.error(`   ✗ Failed to capture ${project.name}:`, error);
  } finally {
    await browser.close();
  }
}

async function main() {
  const outputDir = path.join(process.cwd(), 'public', 'screenshots');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Created ${outputDir}`);
  }

  // Check for specific slug argument
  const targetSlug = process.argv[2];

  let projectsToCapture = projects;
  if (targetSlug) {
    const found = projects.find(p => p.slug === targetSlug);
    if (!found) {
      console.error(`❌ Project "${targetSlug}" not found`);
      console.log('Available projects:', projects.map(p => p.slug).join(', '));
      process.exit(1);
    }
    projectsToCapture = [found];
  }

  console.log(`\n🎬 Starting screenshot capture for ${projectsToCapture.length} project(s)...\n`);

  for (const project of projectsToCapture) {
    await captureScreenshot(project, outputDir);
  }

  console.log('\n✨ Done!\n');
}

main().catch(console.error);
