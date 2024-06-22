import { VehiclesTypesOptions } from '@/constants/vehicles-constants';
import { CreateOrUpdateVehicleModel } from '@/types/vehicle-types';
import { Button, Form, FormInstance, Input, Select } from 'antd';
import React, { useEffect } from 'react';

export interface VehicleFormProps {
  formInstance: FormInstance;
  vehicle?: CreateOrUpdateVehicleModel;
  hideSaveButon?: true;
  loading?: boolean;
  onSaveClick?: (vehicle: CreateOrUpdateVehicleModel) => Promise<void>;
}

const VehicleForm: React.FC<VehicleFormProps> = ({
  formInstance,
  hideSaveButon,
  loading,
  vehicle,
  onSaveClick,
}) => {
  const onFinish = async (fieldsValue: any) => {
    if (onSaveClick !== undefined) {
      const vehicleToSave: CreateOrUpdateVehicleModel = {
        ...fieldsValue,
      };

      if (vehicle != undefined) {
        vehicleToSave.initialPlateNumber = vehicle.initialPlateNumber;
      }

      await onSaveClick(vehicleToSave);
    }
  };

  useEffect(() => {
    if (vehicle !== undefined) {
      formInstance.setFieldsValue(vehicle);
    }
  }, [vehicle]);

  return (
    <Form
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      layout="horizontal"
      onFinish={onFinish}
      form={formInstance}
      style={{ maxWidth: 600 }}
      disabled={loading}
    >
      <Form.Item
        hidden
        name="residentId"
        rules={[
          { required: true, message: 'El Id del residente es obligatorio' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="plateNumber"
        label="Placa"
        rules={[
          { required: true, message: 'La Placa es obligatoria' },
          { max: 8 },
        ]}
      >
        <Input placeholder="Ejemplo: ABC-123" />
      </Form.Item>

      <Form.Item
        name="type"
        label="Tipo de Vehículo"
        rules={[
          {
            required: true,
            message: 'El Tipo de Vehículo es obligatorio',
          },
        ]}
      >
        <Select
          options={VehiclesTypesOptions}
          placeholder="Selecciona una opción"
        />
      </Form.Item>

      {!hideSaveButon && (
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      )}
    </Form>
  );
};

export default VehicleForm;
