import ClearFiltersButton from '../../shared/ClearFiltersButton';
import RefreshButton from '../../shared/RefreshButton';
import SearchFilter from '../../shared/SearchFilter';

const BlogsFilter = () => {
  return (
    <div className="space-y-3 flex justify-end gap-4">
      <SearchFilter paramName="searchTerm" placeholder="Search blogs..." />
      <ClearFiltersButton />
      <RefreshButton />
    </div>
  );
};

export default BlogsFilter;
