import Authorize from '@/components/auth/authorize';
import ResidentInformationTab from '@/components/residents/resident-information-tab';
import VehiclesTab from '@/components/vehicles/vehicles-tab';
import { RoleName } from '@/constants/auth';
import { Tabs, TabsProps } from 'antd';
import { useRouter } from 'next/router';

export interface ResidentDetailsProps {
  defaultActiveTab?: string;
}

export function ResidentDetails({
  defaultActiveTab = '1',
}: ResidentDetailsProps) {
  const router = useRouter();
  const { id } = router.query;
  const residentId = id as string;

  let items: TabsProps['items'] = [
    {
      key: '1',
      label: `Información`,
      children: <ResidentInformationTab residentId={residentId} />,
    },
    {
      key: '2',
      label: `Vehículos`,
      children: <VehiclesTab residentId={residentId} />,
    },
  ];

  return (
    <Authorize allowedRoles={RoleName.Administrator} redirectWhenUnauthorized>
      <Tabs defaultActiveKey={defaultActiveTab} items={items} />
    </Authorize>
  );
}

export default ResidentDetails;
