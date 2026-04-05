'use client';

interface ProjectHoverPreviewProps {
  children: React.ReactNode;
  slug: string;
  title: string;
  hasScreenshot?: boolean;
}

/**
 * Temporary no-op wrapper.
 * The old hover preview depended on a Base UI module that's not available in
 * the current install set, which breaks the whole app build. Keeping the
 * wrapper preserves the call sites while letting the rest of the site ship.
 */
export function ProjectHoverPreview({
  children,
}: ProjectHoverPreviewProps) {
  return <>{children}</>;
}
