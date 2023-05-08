import ResidentForm from "@/components/residents/resident-form";
import useResidentsApi from "@/hooks/use-residents-api";
import { ResidentModel } from "@/types/resident-types";
import { Tabs, TabsProps, notification } from "antd";
import { useRouter } from "next/router";
import React, { Component, useCallback, useEffect, useState } from "react";

export function ResidentDetails() {
  const router = useRouter();
  const { id } = router.query;
  const residentsApi = useResidentsApi();
  const [resident, setResident] = useState<ResidentModel | undefined>();

  const getResident = useCallback(async () => {
    const resident = await residentsApi.getById(id as string);
    setResident(resident);
  }, [id]);

  useEffect(() => {
    getResident();
  }, []);

  const onChange = (key: string) => {
    console.log(key);
  };

  let items: TabsProps["items"] = [];

  if (resident !== undefined) {
    const onSaveClick = async (resident: ResidentModel): Promise<void> => {
      await residentsApi.update(resident);
      notification.success({
        description: `El residente '${resident.name}' fue actualizado.`,
        message: "Operación realizada correctamente",
      });
    };

    items = [
      {
        key: "1",
        label: `Información`,
        children: (
          <ResidentForm
            resident={resident}
            action="Guardar"
            onSaveClick={onSaveClick}
          />
        ),
      },
      {
        key: "2",
        label: `Vehículos`,
      },
    ];
  }

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}

export default ResidentDetails;
