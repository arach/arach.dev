'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface BrowserFrameProps {
  src: string;
  url: string;
  alt: string;
  className?: string;
}

/**
 * A macOS-style browser frame that wraps a screenshot
 * Features traffic lights, URL bar, and optional click-through to live site
 */
export function BrowserFrame({ src, url, alt, className = '' }: BrowserFrameProps) {
  // Extract display URL (without protocol)
  const displayUrl = url.replace(/^https?:\/\//, '');

  return (
    <div className={`rounded-lg overflow-hidden shadow-2xl ${className}`}>
      {/* Browser Chrome */}
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700">
        {/* Traffic Lights */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex items-center justify-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-gray-900 rounded-md text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors font-mono max-w-md truncate"
          >
            <span className="truncate">{displayUrl}</span>
            <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-50" />
          </a>
        </div>

        {/* Spacer to balance traffic lights */}
        <div className="w-14" />
      </div>

      {/* Screenshot Content */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-[16/10] bg-gray-50 dark:bg-gray-900 hover:opacity-95 transition-opacity"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </a>
    </div>
  );
}
