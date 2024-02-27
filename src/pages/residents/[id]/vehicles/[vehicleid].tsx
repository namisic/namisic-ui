import Authorize from '@/components/auth/authorize';
import PageTitle from '@/components/common/page-title';
import VehicleForm from '@/components/vehicles/vehicle-form';
import { RoleName } from '@/constants/auth';
import useGeneralSettings from '@/hooks/use-general-settings';
import useVehiclesApi from '@/hooks/use-vehicles-api';
import { CreateOrUpdateVehicleModel } from '@/types/vehicle-types';
import { Form, notification } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface VehicleDetailsProps {}

const pageTitle = 'Modificar Vehículo';

export function VehicleDetails({}: VehicleDetailsProps) {
  const { generalSettings } = useGeneralSettings();
  const vehiclesApi = useVehiclesApi();
  const router = useRouter();
  const [formInstance] = Form.useForm();
  const { vehicleid } = router.query;
  const plate = vehicleid as string;
  const [data, setData] = useState<CreateOrUpdateVehicleModel>();

  useEffect(() => {
    getVehicle();
  }, []);

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
    <Authorize allowedRoles={RoleName.Administrator} redirectWhenUnauthorized>
      <Head>
        <title>
          {pageTitle} - {generalSettings?.condominiumName}
        </title>
      </Head>
      <PageTitle title={pageTitle} />
      <VehicleForm
        formInstance={formInstance}
        onSaveClick={onSaveClick}
        vehicle={data}
        hideSaveButon={undefined}
      />
    </Authorize>
  );
}

export default VehicleDetails;
