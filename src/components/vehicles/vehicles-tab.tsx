import { ColumnConfig } from '@/configs/shared-config';
import useVehiclesApi from '@/hooks/use-vehicles-api';
import { VehicleTableDataType } from '@/types/vehicle-types';
import React, { useEffect, useState } from 'react';

import GenericPage from '../generic-page';

export interface VehiclesTabProps {
  residentId?: string;
}

const VehiclesTab: React.FC<VehiclesTabProps> = ({ residentId }) => {
  const vehiclesApi = useVehiclesApi();
  const [data, setData] = useState<VehicleTableDataType[]>([]);
  const getVehicles = async () => {
    if (residentId !== undefined) {
      const data = await vehiclesApi.getAll(residentId);
      const vehicles = data.map<VehicleTableDataType>(
        ({ plateNumber, type }) => ({ plateNumber, type, key: plateNumber })
      );
      setData(vehicles);
    }
  };

  useEffect(() => {
    getVehicles();
  }, [residentId]);

  const columnsConfig: ColumnConfig<VehicleTableDataType>[] = [
    {
      title: 'Placa',
      dataIndex: 'plateNumber',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
    },
  ];

  return <GenericPage columns={columnsConfig} data={data} />;
};

export default VehiclesTab;
