import { Form } from "antd";
import React, { Fragment } from "react";

export default function ResidentVehicles({ plate }: { plate: any }) {
  const componentDisabled = true;
  return (
    <Fragment>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Placa">{plate}</Form.Item>
      </Form>
    </Fragment>
  );
}
