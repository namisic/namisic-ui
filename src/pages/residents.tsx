import ColumnActionDelete from '@/components/column-actions/column-action-delete';
import ColumnActionSplitted from '@/components/column-actions/column-actions-splitted';
import GenericPage from '@/components/generic-page';
import { ColumnConfig } from '@/configs/shared-config';
import useResidentsApi from '@/hooks/use-residents-api';
import { ResidentTableDataType } from '@/types/resident-types';
import { useCallback, useEffect, useState } from 'react';

export const Residents = () => {
  const residentsApi = useResidentsApi();
  const [data, setData] = useState<ResidentTableDataType[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    const data = await residentsApi.getAll();
    setData(data);
  }, []);

  const columnsConfig: ColumnConfig<ResidentTableDataType>[] = [
    {
      title: 'Nombre',
      dataIndex: 'name',
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
              confirmationTitle="Delete resident"
              record={record}
              text="Delete"
            />
          </ColumnActionSplitted>
        );
      },
    },
  ];

  return <GenericPage columns={columnsConfig} data={data} title="Residentes" />;
};

export default Residents;
