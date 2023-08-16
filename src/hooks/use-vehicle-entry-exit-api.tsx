import { ApiConfigContext } from '@/contexts/api-config-context';
import { useAxios } from '@/hooks/use-axios';
import {
  CreateVehicleEntryExitModel,
  FilterVehicleEntryExitModel,
  VehicleEntryExitTableModel,
} from '@/types/vehicle-entry-exit';
import { useContext } from 'react';

export const useVehicleEntryExitApi = () => {
  const { getAxiosInstance } = useAxios();
  const apiConfig = useContext(ApiConfigContext);
  const baseUrl = `${apiConfig.config?.ApiUri}/api/VehicleEntryExit`;

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
