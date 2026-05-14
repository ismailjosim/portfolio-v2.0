import { Loading } from '../../components/ui/loading';

const DashboardLoading = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loading message="Preparing dashboard..." />
    </div>
  );
};

export default DashboardLoading;
