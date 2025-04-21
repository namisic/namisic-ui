'use client';

import Authorize from '@/components/auth/authorize';
import Page from '@/components/common/page';
import CreateVehicleEntryExitModal from '@/components/vehicle-entry-exit/create-modal';
import { FiltersPanel } from '@/components/vehicle-entry-exit/filters-panel';
import { ColumnConfig } from '@/configs/shared-config';
import { RoleName } from '@/constants/auth';
import useGeneralSettings from '@/hooks/use-general-settings';
import { useVehicleEntryExitApi } from '@/hooks/use-vehicle-entry-exit-api';
import {
  FilterVehicleEntryExitModel,
  VehicleEntryExitTableDataType,
} from '@/types/vehicle-entry-exit';
import { getVehicleEntryExitTypeName } from '@/utils/get-vehicle-entry-exit-type-name';
import { getVehicleTypeName } from '@/utils/get-vehicle-type-name';
import { BookOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import dayjs from 'dayjs';
import Head from 'next/head';
import React, { useState } from 'react';

const pageTitle = 'Entrada y Salida de Vehículos';

const VehicleEntryExitPage = () => {
  const { generalSettings } = useGeneralSettings();
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
      <Head>
        <title>
          {pageTitle} - {generalSettings?.condominiumName}
        </title>
      </Head>
      <CreateVehicleEntryExitModal
        openModal={showCreationModal}
        onClose={() => setShowCreationModal(false)}
      />
      <FiltersPanel
        openFilters={openFilters}
        onApplyFilters={onApplyFilters}
        onClose={() => setOpenFilters(false)}
      />
      <Page
        columns={columnsConfig}
        data={data}
        loading={loading}
        title={pageTitle}
        onAddClick={() => setShowCreationModal(true)}
        onFilterClick={() => setOpenFilters(true)}
      />
    </Authorize>
  );
};

export default VehicleEntryExitPage;
