'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';

type PaginationData = {
  page: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export default function Pagination({ pagination }: { pagination: PaginationData }) {
  const router = useRouter();
  const params = useSearchParams();

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set('page', String(page));
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex justify-center gap-4 mt-10">
      <Button
        variant="outline"
        disabled={!pagination?.hasPrev}
        onClick={() => goToPage(pagination.page - 1)}
      >
        Prev
      </Button>

      <span className="flex items-center text-sm">
        Page {pagination.page} of {pagination.totalPages}
      </span>

      <Button
        variant="outline"
        disabled={!pagination?.hasNext}
        onClick={() => goToPage(pagination.page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
