import { ColumnConfig } from '@/configs/shared-config';
import useVehiclesApi from '@/hooks/use-vehicles-api';
import { VehicleTableDataType } from '@/types/vehicle-types';
import React, { useCallback, useEffect, useState } from 'react';

import GenericPage from '../generic-page';
import CreateVehicleModal from './create-vehicle-modal';
import ColumnActionSplitted from '../column-actions/column-actions-splitted';
import ColumnActionDelete from '../column-actions/column-action-delete';
import { notification } from 'antd';
import { getVehicleTypeName } from '@/utils/get-vehicle-type-name';
import Link from 'next/link';

export interface VehiclesTabProps {
  residentId?: string;
}

const VehiclesTab: React.FC<VehiclesTabProps> = ({ residentId }) => {
  const vehiclesApi = useVehiclesApi();
  const [data, setData] = useState<VehicleTableDataType[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const deleteVehicle = useCallback(
    async ({ plateNumber, type }: VehicleTableDataType) => {
      if (residentId != undefined) {
        await vehiclesApi.deleteById({
          ResidentId: residentId,
          PlateNumber: plateNumber,
        });
      }

      await getVehicles();
      notification.success({
        description: `El vehiculo '${plateNumber}' fue eliminado.`,
        message: 'Operación realizada correctamente',
      });
    },
    []
  );

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
      render: (value, record, index) => (
        <Link href={`/residents/${residentId}/vehicles/${record.plateNumber}`}>
          {value}
        </Link>
      ),
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      render: (value: string) => getVehicleTypeName(value),
    },
    {
      title: 'Acciones',
      render: (value, record, index) => {
        return (
          <ColumnActionSplitted>
            <ColumnActionDelete
              confirmationTitle="Eliminar Vehiculo"
              confirmationDescription="Por favor confirme que desea eliminar el Vehiculo  ."
              record={record}
              text="Eliminar"
              onActionClick={deleteVehicle}
            />
          </ColumnActionSplitted>
        );
      },
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
