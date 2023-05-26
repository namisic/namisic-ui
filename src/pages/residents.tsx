import ColumnActionDelete from '@/components/column-actions/column-action-delete';
import ColumnActionSplitted from '@/components/column-actions/column-actions-splitted';
import GenericPage from '@/components/generic-page';
import CreateResidentModal from '@/components/residents/create-resident-modal';
import { ColumnConfig } from '@/configs/shared-config';
import useResidentsApi from '@/hooks/use-residents-api';
import { ResidentTableDataType } from '@/types/resident-types';
import { notification } from 'antd';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export const Residents = () => {
  const residentsApi = useResidentsApi();
  const [data, setData] = useState<ResidentTableDataType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const getResidents = useCallback(async () => {
    const data = await residentsApi.getAll();
    const residents = data.map<ResidentTableDataType>(
      ({ id, name, apartmentNumber }) => {
        return { id, name, apartmentNumber, key: id };
      }
    );
    setData(residents);
  }, []);
  const deleteResident = useCallback(
    async ({ id, name }: ResidentTableDataType) => {
      await residentsApi.deleteById(id);
      await getResidents();
      notification.success({
        description: `El residente '${name}' fue eliminado.`,
        message: 'Operación realizada correctamente',
      });
    },
    []
  );

  const onAddClick = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
    getResidents();
  };

  useEffect(() => {
    getResidents();
  }, []);

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
    <>
      <CreateResidentModal openModal={openModal} onClose={onCloseModal} />
      <GenericPage
        columns={columnsConfig}
        data={data}
        title="Residentes"
        onAddClick={onAddClick}
      />
    </>
  );
};

export default Residents;
