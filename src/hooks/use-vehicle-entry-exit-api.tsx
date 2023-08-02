import { ResidentModel } from '@/types/resident-types';
import { useAxios } from '@/hooks/use-axios';
import {
  CreateVehicleEntryExitModel,
  FilterVehicleEntryExitModel,
  VehicleEntryExitTableModel,
} from '@/types/vehicle-entry-exit';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URI}/api/VehicleEntryExit`;

export const useVehicleEntryExitApi = () => {
  const { getAxiosInstance } = useAxios();

  return {
    getFiltered: async (
      filters: FilterVehicleEntryExitModel
    ): Promise<VehicleEntryExitTableModel[]> => {
      const { data } = await getAxiosInstance().get<
        VehicleEntryExitTableModel[]
      >(baseUrl, { params: filters });
      return data;
    },
    create: (newRecord: CreateVehicleEntryExitModel): Promise<void> =>
      getAxiosInstance().post(baseUrl, newRecord),
  };
};
