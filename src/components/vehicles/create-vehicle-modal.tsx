import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useVehiclesApi from "@/hooks/use-vehicles-api";
import { Form, notification } from "antd";
import { CreateOrUpdateVehicleModel } from "@/types/vehicle-types";
import VehicleForm from "./vehicle-form";

// Loaded with SSR disabled because portals fail with rehydration.
// See https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
const DynamicModal = dynamic(() => import("antd/es/modal"), {
  ssr: false,
});

export interface CreateVehicleModalProps {
  openModal: boolean;
  residentId?: string;
  onClose?: () => void;
}

const CreateVehicleModal: React.FC<CreateVehicleModalProps> = ({
  openModal,
  residentId,
  onClose,
}) => {
  const vehiclesApi = useVehiclesApi();
  const [formInstance] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const onSaveClick = async (vehicle: CreateOrUpdateVehicleModel) => {
    await vehiclesApi.create(vehicle);
    notification.success({
      description: `El vehículo con placa '${vehicle.plateNumber}' fue creado.`,
      message: "Operación realizada correctamente",
    });
    close();
  };
  const close = () => {
    formInstance.resetFields();
    setIsOpen(false);
    if (typeof onClose === "function") {
      onClose();
    }
  };
  const onOk = () => {
    formInstance.submit();
  };

  useEffect(() => {
    setIsOpen(openModal);

    if (openModal) {
      formInstance.setFieldValue("residentId", residentId);
    }
  }, [openModal]);

  return (
    <DynamicModal
      title="Crear nuevo vehículo"
      open={isOpen}
      cancelText="Cancelar"
      okText="Guardar"
      afterClose={close}
      onOk={onOk}
      onCancel={close}
    >
      <VehicleForm
        formInstance={formInstance}
        hideSaveButon
        onSaveClick={onSaveClick}
      />
    </DynamicModal>
  );
};

export default CreateVehicleModal;
