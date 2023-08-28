import { DocumentTypesOptions } from '@/constants/common-constants';
import { ResidentTypesOptions } from '@/constants/residents-constants';
import { CreateOrUpdateResidentModel } from '@/types/resident-types';
import { Button, Form, FormInstance, Input, InputNumber, Select } from 'antd';
import React, { useEffect } from 'react';

export interface ResidentFormProps {
  formInstance: FormInstance;
  resident?: CreateOrUpdateResidentModel;
  hideSaveButon?: true;
  onSaveClick?: (resident: CreateOrUpdateResidentModel) => Promise<void>;
}

export default function ResidentForm({
  formInstance,
  hideSaveButon,
  resident,
  onSaveClick,
}: ResidentFormProps) {
  const onFinish = async (fieldsValue: any) => {
    if (onSaveClick !== undefined) {
      const residentchanged = fieldsValue as CreateOrUpdateResidentModel;

      if (typeof fieldsValue.documentNumber === 'number') {
        residentchanged.documentNumber = String(fieldsValue.documentNumber);
      }

      if (typeof fieldsValue.cellphone === 'number') {
        residentchanged.cellphone = String(fieldsValue.cellphone);
      }

      if (resident != undefined) {
        residentchanged.id = resident.id;
      }

      await onSaveClick(residentchanged);
    }
  };

  useEffect(() => {
    if (resident !== undefined) {
      formInstance.setFieldsValue(resident);
    }
  }, [resident]);

  return (
    <Form
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      layout="horizontal"
      onFinish={onFinish}
      form={formInstance}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="name"
        label="Nombre"
        rules={[
          { required: true, message: 'El Nombre es obligatorio' },
          { max: 200 },
        ]}
      >
        <Input placeholder="Ejemplo: Pepita Jimenez" />
      </Form.Item>
      <Form.Item
        name="apartmentNumber"
        label="Número de Casa/Apartamento"
        rules={[
          {
            required: true,
            message: 'El Número de Casa/Apartamento es obligatorio',
          },
          { max: 100 },
        ]}
      >
        <Input placeholder="Ejemplo: Casa 28C" />
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
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name="email"
        label="Correo"
        rules={[
          { type: 'email', message: 'Por favor ingrese un correo válido' },
        ]}
      >
        <Input
          placeholder="Ingrese un correo, ejemplo: pepito@midominio.com"
          type="email"
        />
      </Form.Item>
      <Form.Item name="cellphone" label="Celular">
        <InputNumber
          controls={false}
          placeholder="Ingrese un número de celular"
          type="tel"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item name="residentType" label="Tipo de Residente">
        <Select
          allowClear={true}
          options={ResidentTypesOptions}
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
}
