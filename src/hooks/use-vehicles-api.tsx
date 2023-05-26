import axios from 'axios';
import {
  CreateOrUpdateVehicleModel,
  DeleteVehicleModel,
  VehicleModel,
} from '@/types/vehicle-types';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URI}/api/vehicles`;

export const useVehiclesApi = () => {
  return {
    getAll: async (residentId: string): Promise<VehicleModel[]> => {
      const { data } = await axios.get<VehicleModel[]>(
        `${baseUrl}/${residentId}`
      );
      return data;
    },
    create: (vehicle: CreateOrUpdateVehicleModel): Promise<void> =>
      axios.post(baseUrl, vehicle),
    deleteById: (vehicle: DeleteVehicleModel): Promise<void> =>
      axios.delete(baseUrl, { data: vehicle }),
  };
};

export default useVehiclesApi;
