import { Form, Input, notification, Select, SelectProps } from 'antd';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { VehicleEntryExitTypesOptions } from '@/constants/vehicle-entry-exit-constants';
import useVehiclesApi from '@/hooks/use-vehicles-api';
import { useVehicleEntryExitApi } from '@/hooks/use-vehicle-entry-exit-api';
import { CreateVehicleEntryExitModel } from '@/types/vehicle-entry-exit';

// Loaded with SSR disabled because portals fail with rehydration.
// See https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
const DynamicModal = dynamic(() => import('antd/es/modal'), { ssr: false });

export interface CreateVehicleEntryExitModalModalProps {
  openModal: boolean;
  onClose?: () => void;
}

let timeout: ReturnType<typeof setTimeout> | null;

const CreateVehicleEntryExitModal: React.FC<
  CreateVehicleEntryExitModalModalProps
> = ({ openModal, onClose }) => {
  const vehiclesApi = useVehiclesApi();
  const vehicleEntryExitApi = useVehicleEntryExitApi();
  const [formInstance] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [plateNumbers, setPlateNumbers] = useState<SelectProps['options']>([]);

  const handleSearch = (plateNumberHint: string) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    const filterPlateNumbers = async () => {
      try {
        const { data } = await vehiclesApi.filterPlateNumbers(plateNumberHint);
        const _plateNumbers = data.map((p) => ({ label: p, value: p }));
        setPlateNumbers(_plateNumbers);
      } catch (error) {}
    };

    if (plateNumberHint.trim().length > 0) {
      timeout = setTimeout(filterPlateNumbers, 700);
    }
  };
  const onFinish = async (newRecord: CreateVehicleEntryExitModel) => {
    try {
      await vehicleEntryExitApi.create(newRecord);
      notification.success({
        description: `El registro para el vehículo '${newRecord.plateNumber}' fue creado.`,
        message: 'Operación realizada correctamente',
      });
      close();
    } catch (error) {}
  };
  const close = () => {
    setIsOpen(false);
    resetForm();
    if (typeof onClose === 'function') {
      onClose();
    }
  };
  const onOk = () => {
    formInstance.submit();
  };
  const resetForm = () => {
    formInstance.resetFields();
    formInstance.setFieldValue('type', 'entry');
    setPlateNumbers([]);
  };

  useEffect(() => {
    resetForm();
  }, []);

  useEffect(() => {
    setIsOpen(openModal);
  }, [openModal]);

  return (
    <DynamicModal
      title="Registrar entrada o salida de vehículo"
      open={isOpen}
      cancelText="Cancelar"
      okText="Guardar"
      onOk={onOk}
      onCancel={close}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        onFinish={onFinish}
        form={formInstance}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="plateNumber"
          label="Número de Placa"
          rules={[
            { required: true, message: 'El Número de Placa es obligatorio' },
            { max: 8 },
          ]}
        >
          <Select
            showSearch
            placeholder="Ejemplo: ABC-123"
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            notFoundContent={null}
            options={plateNumbers}
          />
        </Form.Item>
        <Form.Item
          name="type"
          label="Tipo de Registro"
          rules={[
            { required: true, message: 'El Tipo de Registro es obligatorio' },
          ]}
        >
          <Select
            options={VehicleEntryExitTypesOptions}
            placeholder="Selecciona una opción"
          />
        </Form.Item>
        <Form.Item
          name="remarks"
          label="Notas Adicionales"
          rules={[{ max: 500 }]}
        >
          <Input.TextArea placeholder="Información adicional acerca del suceso." />
        </Form.Item>
      </Form>
    </DynamicModal>
  );
};

export default CreateVehicleEntryExitModal;
