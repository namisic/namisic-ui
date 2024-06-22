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
  const { plate, residentId } = router.query;
  const [vehicle, setVehicle] = useState<CreateOrUpdateVehicleModel>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getVehicle();
  }, [plate]);

  const getVehicle = async () => {
    if (plate !== undefined) {
      try {
        setLoading(true);
        const data = await vehiclesApi.getbyplateNumber(plate as string);
        data.residentId = residentId as string;
        data.initialPlateNumber = plate as string;
        setVehicle(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  };

  const onSaveClick = async (vehicle: CreateOrUpdateVehicleModel) => {
    try {
      setLoading(true);
      await vehiclesApi.update(vehicle);
      notification.success({
        description: `El vehículo con placa '${vehicle.plateNumber}' fue actualizado.`,
        message: 'Operación realizada correctamente',
      });
      setVehicle({ ...vehicle, initialPlateNumber: vehicle.plateNumber });
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
        loading={loading}
        vehicle={vehicle}
        onSaveClick={onSaveClick}
      />
    </Authorize>
  );
}

export default VehicleDetails;
