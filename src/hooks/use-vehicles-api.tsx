import {
  CreateOrUpdateVehicleModel,
  DeleteVehicleModel,
  VehicleModel,
} from '@/types/vehicle-types';
import { getAxiosInstance } from '@/utils/axios';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URI}/api/vehicles`;

export const useVehiclesApi = () => {
  return {
    getAll: async (residentId: string): Promise<VehicleModel[]> => {
      const { data } = await getAxiosInstance().get<VehicleModel[]>(
        `${baseUrl}/${residentId}`
      );
      return data;
    },
    create: (vehicle: CreateOrUpdateVehicleModel): Promise<void> =>
      getAxiosInstance().post(baseUrl, vehicle),
    deleteById: (vehicle: DeleteVehicleModel): Promise<void> =>
      getAxiosInstance().delete(baseUrl, { data: vehicle }),
  };
};

export default useVehiclesApi;
