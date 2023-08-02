import dayjs from 'dayjs';
import { VehicleEntryExitTypesOptions } from '@/constants/vehicle-entry-exit-constants';
import { VehiclesTypesOptions } from '@/constants/vehicles-constants';
import { FilterVehicleEntryExitModel } from '@/types/vehicle-entry-exit';
import {
  Button,
  Calendar,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Switch,
} from 'antd';
import React, { useEffect, useState } from 'react';

export interface FiltersPanelProps {
  openFilters: boolean;
  onApplyFilters?: (filters: FilterVehicleEntryExitModel) => Promise<void>;
  onClose: () => void;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({
  openFilters,
  onApplyFilters,
  onClose,
}) => {
  const [formInstance] = Form.useForm<FilterVehicleEntryExitModel>();
  const [isOpen, setIsOpen] = useState(false);

  const onFinish = async (filters: FilterVehicleEntryExitModel) => {
    try {
      if (onApplyFilters !== undefined) {
        await onApplyFilters(filters);
      }

      close();
    } catch (error) {}
  };

  const close = () => {
    setIsOpen(false);
    onClose();
  };

  const resetForm = () => {
    formInstance.resetFields();
    formInstance.setFieldValue(
      'beginCreationDate',
      dayjs().subtract(1, 'week').startOf('day')
    );
    formInstance.setFieldValue('currentUser', false);
  };

  useEffect(() => {
    resetForm();
  }, []);

  useEffect(() => setIsOpen(openFilters), [openFilters]);

  return (
    <Drawer
      open={isOpen}
      placement="right"
      maskClosable={false}
      title="Filtros"
      onClose={close}
    >
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        onFinish={onFinish}
        form={formInstance}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="plateNumber"
          label="Número de Placa"
          rules={[{ max: 8, message: 'Este campo admite hasta 8 caracteres' }]}
        >
          <Input placeholder="Ejemplo: ABC-123" />
        </Form.Item>
        <Form.Item name="type" label="Tipo de Registro">
          <Select
            allowClear={true}
            options={VehicleEntryExitTypesOptions}
            placeholder="Selecciona una opción"
          />
        </Form.Item>
        <Form.Item name="vehicleType" label="Tipo de Vehículo">
          <Select
            allowClear={true}
            options={VehiclesTypesOptions}
            placeholder="Selecciona una opción"
          />
        </Form.Item>
        <Form.Item name="beginCreationDate" label="Desde">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="endCreationDate" label="Hasta">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          name="currentUser"
          label="Mostrar solo mis registros"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Space wrap>
          <Button type="default" htmlType="button" onClick={() => resetForm()}>
            Limpiar campos
          </Button>
          <Button type="primary" htmlType="submit">
            Aplicar filtros
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};
