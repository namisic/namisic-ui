import { Form } from "antd";
import React, { Fragment } from "react";

export default function ResidentePersonalInformation({
  resident,
}: {
  resident: any;
}) {
  const { name, numberapartment, numberparking, celphone } = resident;
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

        <Form.Item label="Telefono">{celphone}</Form.Item>

        <Form.Item label="Numero Parqueadero">{numberparking}</Form.Item>
      </Form>
    </Fragment>
  );
}
