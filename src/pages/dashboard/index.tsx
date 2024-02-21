import Authorize from '@/components/auth/authorize';
import { MainLayout } from '@/components/layouts/main-layout';

const Dashboard = () => {
  return (
    <Authorize>
      <MainLayout>
        <div>Este es el dashboard :)</div>
      </MainLayout>
    </Authorize>
  );
};

export default Dashboard;
