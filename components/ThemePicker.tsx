'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/theme/site/provider';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';

export function ThemePicker() {
  const pathname = usePathname();
  const { currentTheme, themes, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Don't render on gallery pages - they have their own theme system
  if (pathname?.startsWith('/gallery')) {
    return null;
  }

  const handleThemeSwitch = async (themeId: string) => {
    setTheme(themeId as any);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
        >
          <Palette className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(themes).map(([id, theme]) => (
          <DropdownMenuItem
            key={id}
            onClick={() => handleThemeSwitch(id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2 flex-1">
              {/* Color preview - use actual theme colors */}
              <div className="flex gap-0.5">
                <span 
                  className="w-1.5 h-1.5 rounded-full border border-gray-600/30"
                  style={{ backgroundColor: theme.colors.bg }}
                />
                <span 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: theme.colors.accent }}
                />
                <span 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: theme.colors.text }}
                />
              </div>
              <span className="text-sm">{theme.name}</span>
            </div>
            {currentTheme === id && (
              <span className="text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}