'use client';

import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from '../ui/button';

interface ClearFiltersButtonProps {
  /**
   * Array of param names to exclude from clearing (e.g., ['page', 'limit'])
   * These params will be preserved when clearing filters
   */
  preserveParams?: string[];

  /**
   * Array of param names to exclude from count (e.g., ['page', 'sort', 'order'])
   * These params won't be counted as filters but will still be cleared
   */
  excludeFromCount?: string[];

  /**
   * Custom onClick handler that runs before clearing
   * Return false to prevent default clear behavior
   */
  onBeforeClear?: () => boolean | void;

  /**
   * Custom onClick handler that runs after clearing
   */
  onAfterClear?: () => void;

  /**
   * Button variant
   */
  variant?: 'ghost' | 'outline' | 'destructive' | 'secondary';

  /**
   * Button size
   */
  size?: 'default' | 'sm' | 'lg' | 'icon';

  /**
   * Custom className
   */
  className?: string;

  /**
   * Custom label
   */
  label?: string;

  /**
   * Show count of active filters
   */
  showCount?: boolean;
}

/**
 * Reusable Clear Filters Button Component
 *
 * Automatically counts active filters (excluding preserved params)
 * and clears all URL parameters when clicked.
 *
 * @example
 * // Basic usage
 * <ClearFiltersButton />
 *
 * @example
 * // Preserve page and limit params
 * <ClearFiltersButton preserveParams={['page', 'limit']} />
 *
 * @example
 * // With custom handlers
 * <ClearFiltersButton
 *   onBeforeClear={() => {
 *     console.log('Clearing filters...');
 *     return true; // proceed with clear
 *   }}
 *   onAfterClear={() => {
 *     console.log('Filters cleared!');
 *   }}
 * />
 */
const ClearFiltersButton = ({
  preserveParams = [],
  excludeFromCount = ['page', 'limit', 'sortBy', 'orderBy'],
  onBeforeClear,
  onAfterClear,
  variant = 'ghost',
  size = 'default',
  className = 'h-10 px-3',
  label = 'Clear',
  showCount = true,
}: ClearFiltersButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Count active filters (excluding preserved params and excluded from count params)
  const activeFiltersCount = Array.from(searchParams.keys()).filter(
    (key) => !preserveParams.includes(key) && !excludeFromCount.includes(key)
  ).length;

  const handleClear = () => {
    // Run before clear handler
    if (onBeforeClear) {
      const shouldProceed = onBeforeClear();
      if (shouldProceed === false) return;
    }

    const params = new URLSearchParams();

    // Preserve specified params
    preserveParams.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        params.set(param, value);
      }
    });

    startTransition(() => {
      // If no params to preserve, just go to base path
      if (params.toString()) {
        router.push(`?${params.toString()}`);
      } else {
        router.push(window.location.pathname);
      }
    });

    // Run after clear handler
    onAfterClear?.();
  };

  // Don't render if no active filters
  if (activeFiltersCount === 0) {
    return null;
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClear}
      disabled={isPending}
      className={className}
    >
      <X className="h-4 w-4 mr-1" />
      {label}
      {showCount && ` (${activeFiltersCount})`}
    </Button>
  );
};

export default ClearFiltersButton;
