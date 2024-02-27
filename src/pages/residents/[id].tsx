import Authorize from '@/components/auth/authorize';
import PageTitle from '@/components/common/page-title';
import ResidentInformationTab from '@/components/residents/resident-information-tab';
import VehiclesTab from '@/components/vehicles/vehicles-tab';
import { RoleName } from '@/constants/auth';
import useGeneralSettings from '@/hooks/use-general-settings';
import { Tabs, TabsProps } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';

export interface ResidentDetailsProps {
  defaultActiveTab?: string;
}

const pageTitle = 'Detalles del Residente';

export function ResidentDetails({
  defaultActiveTab = '1',
}: ResidentDetailsProps) {
  const router = useRouter();
  const { generalSettings } = useGeneralSettings();
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
      <Head>
        <title>
          {pageTitle} - {generalSettings?.condominiumName}
        </title>
      </Head>
      <PageTitle title={pageTitle} />
      <Tabs defaultActiveKey={defaultActiveTab} items={items} />
    </Authorize>
  );
}

export default ResidentDetails;
