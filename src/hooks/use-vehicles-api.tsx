import {
  CreateOrUpdateVehicleModel,
  DeleteVehicleModel,
  VehicleModel,
} from '@/types/vehicle-types';
import { useAxios } from '@/hooks/use-axios';
import { useContext } from 'react';
import { ApiConfigContext } from '@/contexts/api-config-context';

export const useVehiclesApi = () => {
  const { getAxiosInstance } = useAxios();
  const apiConfig = useContext(ApiConfigContext);
  const baseUrl = `${apiConfig.config?.ApiUri}/api/vehicles`;

  return {
    getAll: async (residentId: string): Promise<VehicleModel[]> => {
      const { data } = await getAxiosInstance().get<VehicleModel[]>(
        `${baseUrl}/${residentId}`
      );
      return data;
    },
    getbyplateNumber: async (
      plate: string
    ): Promise<CreateOrUpdateVehicleModel> => {
      const { data } = await getAxiosInstance().get<CreateOrUpdateVehicleModel>(
        `${baseUrl}/get-by-plate-number`,
        { params: { plateNumber: plate } }
      );
      return data;
    },
    filterPlateNumbers: (plateNumberHint: string) =>
      getAxiosInstance().get<string[]>(`${baseUrl}/filter-plate-numbers`, {
        params: { plateNumberHint },
      }),
    create: (vehicle: CreateOrUpdateVehicleModel): Promise<void> =>
      getAxiosInstance().post(baseUrl, vehicle),
    update: (vehicle: CreateOrUpdateVehicleModel): Promise<void> =>
      getAxiosInstance().put(baseUrl, vehicle),
    deleteById: (vehicle: DeleteVehicleModel): Promise<void> =>
      getAxiosInstance().delete(baseUrl, { data: vehicle }),
  };
};

export default useVehiclesApi;
