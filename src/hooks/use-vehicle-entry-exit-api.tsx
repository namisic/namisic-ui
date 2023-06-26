import { ResidentModel } from '@/types/resident-types';
import { useAxios } from '@/hooks/use-axios';
import { CreateVehicleEntryExitModel } from '@/types/vehicle-entry-exit';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URI}/api/VehicleEntryExit`;

export const useVehicleEntryExitApi = () => {
  const { getAxiosInstance } = useAxios();

  return {
    getAll: async (): Promise<ResidentModel[]> => {
      const { data } = await getAxiosInstance().get<ResidentModel[]>(baseUrl);
      return data;
    },
    create: (newRecord: CreateVehicleEntryExitModel): Promise<void> =>
      getAxiosInstance().post(baseUrl, newRecord),
  };
};
