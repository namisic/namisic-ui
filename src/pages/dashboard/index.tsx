import Authorize from '@/components/auth/authorize';

const Dashboard = () => {
  return (
    <Authorize>
      <div>Este es el dashboard :)</div>
    </Authorize>
  );
};

export default Dashboard;
