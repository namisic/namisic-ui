'use client';

import Authorize from '@/components/auth/authorize';
import PageTitle from '@/components/common/page-title';
import useGeneralSettings from '@/hooks/use-general-settings';
import Head from 'next/head';

const pageTitle = 'Dashboard';

const Dashboard = () => {
  const { generalSettings } = useGeneralSettings();

  return (
    <Authorize>
      <Head>
        <title>
          {pageTitle} - {generalSettings?.condominiumName}
        </title>
      </Head>
      <PageTitle title={pageTitle} />
    </Authorize>
  );
};

export default Dashboard;
