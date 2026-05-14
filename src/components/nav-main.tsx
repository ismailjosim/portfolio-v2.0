'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/lib/utils';

type NavItem = {
  title: string;
  url: string;
  icon: React.ElementType;
};

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-2">
      {items.map((item) => {
        // ✅ build full path correctly
        const fullPath = `/dashboard${item.url}`;

        // ✅ correct active detection
        const isActive = pathname === fullPath || pathname.startsWith(fullPath + '/');

        return (
          <Link
            key={item.title}
            href={fullPath}
            className={cn(
              'relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200',

              // default
              'text-muted-foreground hover:text-foreground hover:bg-accent',

              // active
              isActive && 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90'
            )}
          >
            {/* 🔥 Active Indicator */}
            {isActive && (
              <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
            )}

            <item.icon
              className={cn(
                'h-4 w-4 transition-colors',
                isActive ? 'text-primary-foreground' : 'text-muted-foreground'
              )}
            />

            {/* Hide text in collapsed mode */}
            <span className="truncate group-data-[collapsible=icon]:hidden">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
