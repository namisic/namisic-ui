import { GeneralSettingsModel } from '@/types/general-settings-types';
import { Button, Form, FormInstance, Input } from 'antd';
import React, { useEffect } from 'react';

const { Item } = Form;
const { TextArea } = Input;

export interface GeneralSettingsFormProps {
  formInstance: FormInstance;
  data?: GeneralSettingsModel;
  onSaveClick: (data: GeneralSettingsModel) => Promise<void>;
}

const GeneralSettingsForm: React.FunctionComponent<
  GeneralSettingsFormProps
> = ({ formInstance, onSaveClick, data }) => {
  const onFinish = async (fieldsValue: any) => {
    if (onSaveClick !== undefined) {
      const residentchanged = fieldsValue as GeneralSettingsModel;
      await onSaveClick(residentchanged);
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      formInstance.setFieldsValue(data);
    }
  }, [data]);

  return (
    <Form
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      layout="horizontal"
      onFinish={onFinish}
      form={formInstance}
      style={{ maxWidth: 600 }}
    >
      <Item
        name="condominiumName"
        label="Nombre del Condominio"
        rules={[
          {
            required: true,
            message: 'El Nombre del Condominio es obligatorio',
          },
          { max: 60 },
        ]}
      >
        <Input placeholder="Indica como se llama el condominio." />
      </Item>

      <Item
        name="condominiumDescription"
        label="Descripción"
        rules={[{ max: 100 }]}
      >
        <TextArea
          placeholder="Menciona algo que caracterice al condominio."
          rows={3}
        />
      </Item>

      <Item name="condominiumAddress" label="Dirección" rules={[{ max: 60 }]}>
        <Input placeholder="Dirección donde se encuentra el condominio." />
      </Item>

      <Item name="condominiumPhone" label="Teléfono" rules={[{ max: 15 }]}>
        <Input placeholder="Número al cual se pueden comunicar." />
      </Item>

      <Button type="primary" htmlType="submit">
        Guardar
      </Button>
    </Form>
  );
};

export default GeneralSettingsForm;
