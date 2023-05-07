import useResidentsApi from '@/hooks/use-residents-api';
import { ResidentModel } from '@/types/resident-types';
import { Tabs, TabsProps } from 'antd';
import { useRouter } from 'next/router';
import React, { Component, useCallback, useEffect, useState } from 'react';

export function ResidentDetails() {
  const router = useRouter();
  const { id } = router.query;
  const residentsApi = useResidentsApi();
  const [resident, setResident] = useState<ResidentModel | undefined>();

  const getResident = useCallback(async () => {
    const resident = await residentsApi.getById(id as string);
    setResident(resident);
  }, [id]);

  useEffect(() => {
    getResident();
  }, []);

  const onChange = (key: string) => {
    console.log(key);
  };

  const plate: string = 'FJM288';

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Información`,
      children: 'a',
    },
    {
      key: '2',
      label: `Vehículos`,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}

export default ResidentDetails;
