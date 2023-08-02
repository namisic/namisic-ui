import Authorize from '@/components/auth/authorize';
import GenericPage from '@/components/generic-page';
import CreateVehicleEntryExitModal from '@/components/vehicle-entry-exit/create-modal';
import { FiltersPanel } from '@/components/vehicle-entry-exit/filters-panel';
import { ColumnConfig } from '@/configs/shared-config';
import { RoleName } from '@/constants/auth';
import { useVehicleEntryExitApi } from '@/hooks/use-vehicle-entry-exit-api';
import {
  FilterVehicleEntryExitModel,
  VehicleEntryExitTableDataType,
  VehicleEntryExitTableModel,
} from '@/types/vehicle-entry-exit';
import { getVehicleEntryExitTypeName } from '@/utils/get-vehicle-entry-exit-type-name';
import { getVehicleTypeName } from '@/utils/get-vehicle-type-name';
import { BookOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Popover, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const VehicleEntryExitPage = () => {
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<VehicleEntryExitTableDataType[]>([]);
  const vehicleEntryExitApi = useVehicleEntryExitApi();
  const onAuthorized = () => {
    onApplyFilters({
      beginCreationDate: dayjs()
        .subtract(1, 'week')
        .startOf('day')
        .toISOString(),
      currentUser: false,
    }).catch(() => {});
  };

  const columnsConfig: ColumnConfig<VehicleEntryExitTableDataType>[] = [
    {
      title: 'Fecha del Evento',
      dataIndex: 'creationDate',
      render: (value: string) => dayjs(value).format('DD/MM/YYYY'),
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
        <Popover content={value || 'Sin anotaciones.'}>
          <BookOutlined />
        </Popover>
      ),
    },
  ];

  const onApplyFilters = async (filters: FilterVehicleEntryExitModel) => {
    if (
      filters.beginCreationDate !== undefined &&
      typeof filters.beginCreationDate !== 'string'
    ) {
      filters.beginCreationDate = filters.beginCreationDate.toISOString();
    }

    if (
      filters.endCreationDate !== undefined &&
      typeof filters.endCreationDate !== 'string'
    ) {
      filters.endCreationDate = filters.endCreationDate.toISOString();
    }

    setLoading(true);

    try {
      const data = await vehicleEntryExitApi.getFiltered(filters);
      const dataMapped = data.map<VehicleEntryExitTableDataType>((curr) => ({
        ...curr,
        key: curr.id,
      }));

      setData(dataMapped);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

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
      <FiltersPanel
        openFilters={openFilters}
        onApplyFilters={onApplyFilters}
        onClose={() => setOpenFilters(false)}
      />
      <GenericPage
        columns={columnsConfig}
        customTopButtons={
          <Space wrap>
            <Button type="primary" onClick={() => setShowCreationModal(true)}>
              Nuevo registro
            </Button>
            <Button type="default" onClick={() => setOpenFilters(true)}>
              Mostrar filtros
            </Button>
          </Space>
        }
        data={data}
        loading={loading}
        title="Entrada y Salida de Vehículos"
      />
    </Authorize>
  );
};

export default VehicleEntryExitPage;
