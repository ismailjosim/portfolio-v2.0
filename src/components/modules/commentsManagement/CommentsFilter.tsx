'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import ClearFiltersButton from '../../shared/ClearFiltersButton';
import RefreshButton from '../../shared/RefreshButton';
import SearchFilter from '../../shared/SearchFilter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

const ALL = 'all';

const CommentsFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentStatus = searchParams.get('status') || ALL;

  const changeStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === ALL) {
      params.delete('status');
    } else {
      params.set('status', status);
    }

    params.set('page', '1');

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-3 flex justify-end gap-4">
      <SearchFilter paramName="searchTerm" placeholder="Search comments..." />

      <Select value={currentStatus} onValueChange={changeStatus} disabled={isPending}>
        <SelectTrigger className="w-36 h-10">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All statuses</SelectItem>
          <SelectItem value="visible">Visible</SelectItem>
          <SelectItem value="spam">Spam</SelectItem>
        </SelectContent>
      </Select>

      <ClearFiltersButton />
      <RefreshButton />
    </div>
  );
};

export default CommentsFilter;
