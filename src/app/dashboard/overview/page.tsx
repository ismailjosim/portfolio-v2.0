import { getDashboardData } from '@/src/services/dashboard.service';
import { DashboardOverview } from '@/src/components/dashboard/DashboardOverview';

export default async function OverviewPage() {
  const data = await getDashboardData();

  return (
    <div className="w-full">
      <DashboardOverview data={data} />
    </div>
  );
}
