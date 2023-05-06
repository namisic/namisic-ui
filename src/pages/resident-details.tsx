import { Tabs, TabsProps } from "antd";
import React, { Component, useState } from "react";
import ResidentePersonalInformation from "./resident-personal-information";
import ResidentVehicles from "./resident-vehicles";

export function ResidentDetails() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const [resident, setResident] = useState({
    name: "jhoan david alvear",
    numberapartment: "401 Tamesis",
    numberparking: "101",
    celphone: "3057680026",
  });

  const plate: string = "FJM288";

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Information Personal`,
      children: <ResidentePersonalInformation resident={resident} />,
    },
    {
      key: "2",
      label: `Vehicles`,
      children: <ResidentVehicles plate={plate} />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}

export default ResidentDetails;
