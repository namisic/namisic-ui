import ResidentInformationTab from '@/components/residents/resident-information-tab';
import VehicleForm from '@/components/vehicles/vehicle-form';
import useVehiclesApi from '@/hooks/use-vehicles-api';
import { CreateOrUpdateVehicleModel, VehicleModel } from '@/types/vehicle-types';
import { Form, Tabs, TabsProps, notification } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface VehicleDetailsProps {
}


export function VehicleDetails({
  
}: VehicleDetailsProps) {
  
  const vehiclesApi = useVehiclesApi();
  const router = useRouter();
  const [formInstance] = Form.useForm();
  const { vehicleid } = router.query;
  const plate = vehicleid as string;
  const [data, setData] = useState<CreateOrUpdateVehicleModel>();

  useEffect(() => {
    getVehicle();
    
  },[]);


  const getVehicle = async () => {
    if (plate !== undefined) {
      const data = await vehiclesApi.getbyplateNumber(plate);
      const vehicles = data;
      setData(vehicles);
    }
  };


  const onSaveClick = async (vehicle: CreateOrUpdateVehicleModel) => {
    try {
      vehicle.initialPlateNumber = plate;
      await vehiclesApi.update(vehicle);
      notification.success({
        description: `El vehículo con placa '${vehicle.plateNumber}' fue actualizado.`,
        message: 'Operación realizada correctamente',
      });
      
    } catch (error) {}
  };
 
  
  return (
    
  <VehicleForm
    formInstance={formInstance}
    onSaveClick={onSaveClick}
    vehicle={ data}
    hideSaveButon = { undefined}
  />
 );
}

export default VehicleDetails;