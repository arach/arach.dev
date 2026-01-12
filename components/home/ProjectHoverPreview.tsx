'use client';

import { PreviewCard } from '@base-ui/react/preview-card';
import Image from 'next/image';

interface ProjectHoverPreviewProps {
  children: React.ReactNode;
  slug: string;
  title: string;
  hasScreenshot?: boolean;
}

/**
 * Wraps a project card with a hover preview that shows the project screenshot.
 * Uses Base UI's headless PreviewCard component with custom styling.
 */
export function ProjectHoverPreview({
  children,
  slug,
  title,
  hasScreenshot = true,
}: ProjectHoverPreviewProps) {
  // Projects with screenshots
  const projectsWithScreenshots = [
    'talkie', 'og', 'vif', 'arc', 'hooked'
  ];

  const showPreview = hasScreenshot && projectsWithScreenshots.includes(slug);

  if (!showPreview) {
    return <>{children}</>;
  }

  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger
        render={(props) => (
          <div {...props} className="contents">
            {children}
          </div>
        )}
      />
      <PreviewCard.Portal>
        <PreviewCard.Positioner side="right" align="center" sideOffset={16}>
          <PreviewCard.Popup
            className="
              z-50 w-[400px] overflow-hidden rounded-xl
              bg-white dark:bg-gray-900
              shadow-2xl shadow-black/20 dark:shadow-black/50
              border border-gray-200 dark:border-gray-700
              origin-left
              transition-all duration-200 ease-out
              data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
              data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
            "
          >
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                  {title.toLowerCase()}.arach.dev
                </span>
              </div>
              <div className="w-12" /> {/* Spacer */}
            </div>

            {/* Screenshot */}
            <div className="relative aspect-[16/10] bg-gray-50 dark:bg-gray-950">
              <Image
                src={`/screenshots/${slug}.png`}
                alt={`${title} preview`}
                fill
                className="object-cover object-top"
                sizes="400px"
              />
            </div>

            {/* Arrow */}
            <PreviewCard.Arrow className="fill-white dark:fill-gray-900 drop-shadow-sm" />
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
