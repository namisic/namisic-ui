import useResidentsApi from '@/hooks/use-residents-api';
import { CreateOrUpdateResidentModel } from '@/types/resident-types';
import { Form, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import ResidentForm from './resident-form';
import dynamic from 'next/dynamic';

// Loaded with SSR disabled because portals fail with rehydration.
// See https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
const DynamicModal = dynamic(() => import('antd/es/modal'), {
  ssr: false,
});

export interface CreateResidentModalProps {
  openModal: boolean;
  onClose?: () => void;
}

export const CreateResidentModal: React.FC<CreateResidentModalProps> = ({
  openModal,
  onClose,
}) => {
  const residentsApi = useResidentsApi();
  const [formInstance] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const onSaveClick = async (resident: CreateOrUpdateResidentModel) => {
    try {
      await residentsApi.create(resident);
      notification.success({
        description: `El residente '${resident.name}' fue creado.`,
        message: 'Operación realizada correctamente',
      });
      close();
    } catch (error) {}
  };
  const close = () => {
    formInstance.resetFields();
    setIsOpen(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };
  const onOk = () => {
    formInstance.submit();
  };

  useEffect(() => {
    setIsOpen(openModal);
  }, [openModal]);

  return (
    <DynamicModal
      title="Crear nuevo residente"
      open={isOpen}
      cancelText="Cancelar"
      okText="Guardar"
      onOk={onOk}
      onCancel={close}
    >
      <ResidentForm
        formInstance={formInstance}
        hideSaveButon
        onSaveClick={onSaveClick}
      />
    </DynamicModal>
  );
};

export default CreateResidentModal;
