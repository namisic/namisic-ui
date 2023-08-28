import ColumnActionDelete from '@/components/column-actions/column-action-delete';
import ColumnActionSplitted from '@/components/column-actions/column-actions-splitted';
import GenericPage from '@/components/generic-page';
import CreateResidentModal from '@/components/residents/create-resident-modal';
import { ColumnConfig } from '@/configs/shared-config';
import { RoleName } from '@/constants/auth';
import Authorize from '@/components/auth/authorize';
import useResidentsApi from '@/hooks/use-residents-api';
import {
  GetResidentsQuery,
  ResidentModelTableDataType,
  ResidentTableDataType,
} from '@/types/resident-types';
import { notification } from 'antd';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { FiltersPanel } from '@/components/residents/filters-panel';
import { ResidentTypes } from '@/constants/residents-constants';
import { DocumentTypes } from '@/constants/common-constants';

export const ResidentsPage = () => {
  const residentsApi = useResidentsApi();
  const [data, setData] = useState<ResidentTableDataType[]>([]);
  const [openModal, setOpenCreationModal] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const getResidents = async () => {
    try {
      await applyFilters({});
    } catch (error) {}
  };
  const deleteResident = useCallback(
    async ({ id, name }: ResidentTableDataType) => {
      try {
        await residentsApi.deleteById(id);
        notification.success({
          description: `El residente '${name}' fue eliminado.`,
          message: 'Operación realizada correctamente',
        });
        await getResidents();
      } catch (error) {}
    },
    []
  );

  const applyFilters = async (filters: GetResidentsQuery) => {
    setLoading(true);

    try {
      const data = await residentsApi.getAll(filters);
      const dataMapped = data.map<ResidentModelTableDataType>((curr) => ({
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

  const onCloseModal = () => {
    setOpenCreationModal(false);
    getResidents();
  };

  const onAuthorized = () => {
    getResidents();
  };

  const columnsConfig: ColumnConfig<ResidentTableDataType>[] = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      render: (value, record, index) => (
        <Link href={`residents/${record.id}`}>{value}</Link>
      ),
    },
    {
      title: 'Número de Casa/Apartamento',
      dataIndex: 'apartmentNumber',
    },
    {
      title: 'Tipo de Residente',
      dataIndex: 'residentType',
      render: (value: keyof typeof ResidentTypes, record, index) =>
        ResidentTypes[value],
    },
    {
      title: 'Tipo de Documento',
      dataIndex: 'documentType',
      render: (value: keyof typeof DocumentTypes, record, index) =>
        DocumentTypes[value],
    },
    {
      title: 'Número de Documento',
      dataIndex: 'documentNumber',
    },
    {
      title: 'Acciones',
      render: (value, record, index) => {
        return (
          <ColumnActionSplitted>
            <ColumnActionDelete
              confirmationTitle="Eliminar residente"
              confirmationDescription="Por favor confirme que desea eliminar el residente."
              record={record}
              text="Eliminar"
              onActionClick={deleteResident}
            />
          </ColumnActionSplitted>
        );
      },
    },
  ];

  return (
    <Authorize
      allowedRoles={RoleName.Administrator}
      redirectWhenUnauthorized
      onAuthorized={onAuthorized}
    >
      <CreateResidentModal openModal={openModal} onClose={onCloseModal} />
      <FiltersPanel
        openFilters={openFilters}
        onApplyFilters={applyFilters}
        onClose={() => setOpenFilters(false)}
      />
      <GenericPage
        columns={columnsConfig}
        data={data}
        loading={loading}
        title="Residentes"
        onAddClick={() => setOpenCreationModal(true)}
        onFilterClick={() => setOpenFilters(true)}
      />
    </Authorize>
  );
};

export default ResidentsPage;
