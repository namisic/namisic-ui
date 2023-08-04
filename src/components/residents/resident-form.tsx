import { CreateOrUpdateResidentModel } from '@/types/resident-types';
import { Button, Form, FormInstance, Input } from 'antd';
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
      const residentchanged: CreateOrUpdateResidentModel = {
        name: fieldsValue['name'],
        apartmentNumber: fieldsValue['apartmentNumber'],
      };

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
        <Input placeholder="Ejemplo: Manuel" />
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
      {!hideSaveButon && (
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      )}
    </Form>
  );
}
