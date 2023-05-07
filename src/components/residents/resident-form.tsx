import { Form } from 'antd';
import React, { Fragment } from 'react';

export default function ResidentForm({ resident }: { resident: any }) {
  const { name, numberapartment } = resident;
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
        <Form.Item label="Nombre">{name}</Form.Item>
        <Form.Item label="Apartamento">{numberapartment}</Form.Item>
      </Form>
    </Fragment>
  );
}
