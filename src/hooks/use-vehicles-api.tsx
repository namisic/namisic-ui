import axios from 'axios';
import { VehicleModel } from '@/types/vehicle-types';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URI}/api/vehicles`;

export const useVehiclesApi = () => {
  return {
    getAll: async (residentId: string): Promise<VehicleModel[]> => {
      const { data } = await axios.get<VehicleModel[]>(
        `${baseUrl}/${residentId}`
      );
      return data;
    },
  };
};

export default useVehiclesApi;
