import Authorize from '@/components/auth/authorize';
import GenericPage from '@/components/generic-page';
import CreateVehicleEntryExitModal from '@/components/vehicle-entry-exit/create-modal';
import { ColumnConfig } from '@/configs/shared-config';
import { RoleName } from '@/constants/auth';
import { VehicleEntryExitTableDataType } from '@/types/vehicle-entry-exit';
import { getVehicleEntryExitTypeName } from '@/utils/get-vehicle-entry-exit-type-name';
import { getVehicleTypeName } from '@/utils/get-vehicle-type-name';
import { SearchOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import React, { useState } from 'react';

const VehicleEntryExitPage = () => {
  const [showCreationModal, setShowCreationModal] = useState(false);
  const onAuthorized = () => {};

  const columnsConfig: ColumnConfig<VehicleEntryExitTableDataType>[] = [
    {
      title: 'Fecha del Evento',
      dataIndex: 'creationDate',
    },
    {
      title: 'Placa',
      dataIndex: 'plateNumber',
    },
    {
      title: 'Tipo de Vehículo',
      dataIndex: 'vehicleType',
      render: (value: string) => getVehicleTypeName(value),
    },
    {
      title: 'Tipo de Evento',
      dataIndex: 'type',
      render: (value: string) => getVehicleEntryExitTypeName(value),
    },
    {
      title: 'Anotación',
      dataIndex: 'remarks',
      render: (value: string) => (
        <Popover content={value}>
          <SearchOutlined />
        </Popover>
      ),
    },
  ];

  return (
    <Authorize
      allowedRoles={RoleName.SecurityGuard}
      redirectWhenUnauthorized
      onAuthorized={onAuthorized}
    >
      <CreateVehicleEntryExitModal
        openModal={showCreationModal}
        onClose={() => setShowCreationModal(false)}
      />
      <GenericPage
        columns={columnsConfig}
        title="Entrada y Salida de Vehículos"
        onAddClick={() => setShowCreationModal(true)}
      />
    </Authorize>
  );
};

export default VehicleEntryExitPage;
