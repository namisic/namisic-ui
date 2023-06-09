import Authorize from '@/components/auth/authorize';
import GenericPage from '@/components/generic-page';
import { ColumnConfig } from '@/configs/shared-config';
import { RoleName } from '@/constants/auth';
import { VehicleEntryExitTableDataType } from '@/types/vehicle-entry-exit';
import { getVehicleEntryExitTypeName } from '@/utils/get-vehicle-entry-exit-type-name';
import { SearchOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import React from 'react';

const IoVehiclesPage = () => {
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
      dataIndex: 'type',
      render: (value: string) => 'PENDIENTE',
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
      <GenericPage
        columns={columnsConfig}
        title="Entrada y Salida de Vehículos"
      />
    </Authorize>
  );
};

export default IoVehiclesPage;
