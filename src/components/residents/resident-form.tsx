import { ResidentModel } from "@/types/resident-types";
import { Button, Form, Input } from "antd";
import React, { Fragment, useEffect } from "react";

export interface ResidentFormProps {
  resident?: ResidentModel;
  onSaveClick?: (resident: ResidentModel) => Promise<void>;
  action: string;
}

export default function ResidentForm({
  resident,
  onSaveClick,
  action,
}: ResidentFormProps) {
  const [form] = Form.useForm();
  const componentDisabled = false;

  const onclick = async (fieldsValue: any) => {
    if (onSaveClick !== undefined) {
      if (resident != undefined) {
        let residentchanged: ResidentModel = {
          id: resident.id,
          name: fieldsValue["name"],
          apartmentNumber: fieldsValue["apartmentNumber"],
        };

        await onSaveClick(residentchanged);
      }
    }
  };

  useEffect(() => {
    if (resident !== undefined) {
      form.setFieldsValue(resident);
    }
  }, [resident]);

  return (
    <Fragment>
      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        onFinish={onclick}
        form={form}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            { required: true, message: "El Nombre es Obligatorio" },
            { max: 200 },
          ]}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          name="apartmentNumber"
          label="Número de Casa/Apartamento"
          rules={[
            {
              required: true,
              message: "Número de Casa/Apartamento es Obligatorio",
            },
            { max: 100 },
          ]}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {action}
        </Button>
      </Form>
    </Fragment>
  );
}
