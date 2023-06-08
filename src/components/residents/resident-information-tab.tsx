import useResidentsApi from '@/hooks/use-residents-api';
import {
  CreateOrUpdateResidentModel,
  ResidentModel,
} from '@/types/resident-types';
import { Form, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import ResidentForm from './resident-form';

export interface ResidentInformationTabProps {
  residentId?: string;
}

const ResidentInformationTab: React.FC<ResidentInformationTabProps> = ({
  residentId,
}) => {
  const residentsApi = useResidentsApi();
  const [resident, setResident] = useState<ResidentModel | undefined>();
  const [formInstance] = Form.useForm();
  const getResident = async () => {
    if (residentId !== undefined) {
      const resident = await residentsApi.getById(residentId as string);
      setResident(resident);
    }
  };
  const onSaveClick = async (
    resident: CreateOrUpdateResidentModel
  ): Promise<void> => {
    try {
      await residentsApi.update(resident);
      notification.success({
        description: `El residente '${resident.name}' fue actualizado.`,
        message: 'Operación realizada correctamente',
      });
    } catch (error) {}
  };

  useEffect(() => {
    getResident();
  }, [residentId]);

  if (residentId === undefined) return null;

  return (
    <ResidentForm
      formInstance={formInstance}
      resident={resident}
      onSaveClick={onSaveClick}
    />
  );
};

export default ResidentInformationTab;
