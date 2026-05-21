'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { blogCategories } from '@/src/constants/blogTaxonomy';

const categories = ['All', ...blogCategories];

export default function BlogFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const activeCategory = params.get('category') || 'All';

  const handleCategory = (cat: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (cat === 'All') newParams.delete('category');
    else newParams.set('category', cat);

    newParams.set('page', '1');

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`blog-filter ${activeCategory === cat ? 'active' : ''}`}
          onClick={() => handleCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
