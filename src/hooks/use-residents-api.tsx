import {
  CreateOrUpdateResidentModel,
  ResidentModel,
} from '@/types/resident-types';
import { useAxios } from '@/hooks/use-axios';
import { useContext } from 'react';
import { ApiConfigContext } from '@/contexts/api-config-context';

export const useResidentsApi = () => {
  const { getAxiosInstance } = useAxios();
  const apiConfig = useContext(ApiConfigContext);
  const baseUrl = `${apiConfig.config?.ApiUri}/api/residents`;

  return {
    getAll: async (): Promise<ResidentModel[]> => {
      const { data } = await getAxiosInstance().get<ResidentModel[]>(baseUrl);
      return data;
    },
    getById: async (id: string): Promise<ResidentModel> => {
      const { data } = await getAxiosInstance().get<ResidentModel>(
        `${baseUrl}/${id}`
      );
      return data;
    },
    create: (resident: CreateOrUpdateResidentModel): Promise<void> =>
      getAxiosInstance().post(baseUrl, resident),
    update: (residentmodel: CreateOrUpdateResidentModel): Promise<void> =>
      getAxiosInstance().put(`${baseUrl}/${residentmodel.id}`, residentmodel),
    deleteById: (id: string): Promise<void> =>
      getAxiosInstance().delete(`${baseUrl}/${id}`),
  };
};

export default useResidentsApi;
