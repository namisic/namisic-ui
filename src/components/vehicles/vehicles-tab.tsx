import { ColumnConfig } from '@/configs/shared-config';
import useVehiclesApi from '@/hooks/use-vehicles-api';
import { VehicleTableDataType } from '@/types/vehicle-types';
import React, { useEffect, useState } from 'react';

import GenericPage from '../generic-page';
import CreateVehicleModal from './create-vehicle-modal';

export interface VehiclesTabProps {
  residentId?: string;
}

const VehiclesTab: React.FC<VehiclesTabProps> = ({ residentId }) => {
  const vehiclesApi = useVehiclesApi();
  const [data, setData] = useState<VehicleTableDataType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const getVehicles = async () => {
    if (residentId !== undefined) {
      const data = await vehiclesApi.getAll(residentId);
      const vehicles = data.map<VehicleTableDataType>(
        ({ plateNumber, type }) => ({ plateNumber, type, key: plateNumber })
      );
      setData(vehicles);
    }
  };
  const onAddClick = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
    getVehicles();
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

  return (
    <>
      <CreateVehicleModal
        openModal={openModal}
        residentId={residentId}
        onClose={onCloseModal}
      />
      <GenericPage
        columns={columnsConfig}
        data={data}
        onAddClick={onAddClick}
      />
    </>
  );
};

export default VehiclesTab;
