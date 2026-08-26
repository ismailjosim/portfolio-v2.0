import { ManagementPageLoading } from '../../../components/shared/ManagementPageLoading';

const ManagementLoading = () => {
  return (
    <ManagementPageLoading columns={7} filterCount={3} filterWidths={['w-48', 'w-36', 'w-24']} />
  );
};

export default ManagementLoading;
