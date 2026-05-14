import { cn } from '@/src/lib/utils';
import React from 'react';
import { Spinner } from './spinner';

interface LoadingProps {
  message?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message, className = '' }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-4 space-y-2', className)}>
      <Spinner className="h-8 w-8 text-primary" />
      {message && <span className="text-sm text-muted-foreground">{message}</span>}
    </div>
  );
};
