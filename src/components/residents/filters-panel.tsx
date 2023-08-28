import { GetResidentsQuery } from '@/types/resident-types';
import { Button, Drawer, Form, Input, InputNumber, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { DocumentTypesOptions } from '@/constants/common-constants';
import { ResidentTypesOptions } from '@/constants/residents-constants';

export interface FiltersPanelProps {
  openFilters: boolean;
  onApplyFilters?: (filters: GetResidentsQuery) => Promise<void>;
  onClose: () => void;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({
  openFilters,
  onApplyFilters,
  onClose,
}) => {
  const [formInstance] = Form.useForm<GetResidentsQuery>();
  const [isOpen, setIsOpen] = useState(false);

  const onFinish = async (filters: GetResidentsQuery) => {
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
        <Form.Item name="name" label="Nombre">
          <Input placeholder="Ingrese nombre del residente" />
        </Form.Item>
        <Form.Item name="documentType" label="Tipo de Documento">
          <Select
            allowClear={true}
            options={DocumentTypesOptions}
            placeholder="Selecciona una opción"
          />
        </Form.Item>
        <Form.Item name="documentNumber" label="Número de Documento">
          <InputNumber
            controls={false}
            placeholder="Ingrese un número de documento"
            style={{width: '100%'}}
          />
        </Form.Item>
        <Form.Item name="email" label="Correo">
          <Input placeholder="Ingrese un correo, ejemplo: pepito@midominio.com" />
        </Form.Item>
        <Form.Item name="cellphone" label="Celular">
          <InputNumber
            controls={false}
            placeholder="Ingrese un número de celular"
            type="tel"
            style={{width: '100%'}}
          />
        </Form.Item>
        <Form.Item name="residentType" label="Tipo de Residente">
          <Select
            allowClear={true}
            options={ResidentTypesOptions}
            placeholder="Selecciona una opción"
          />
        </Form.Item>
        <Form.Item name="apartmentNumber" label="Número de Casa/Apartamento">
          <Input placeholder="Ingrese un número de casa o apartamento" />
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
