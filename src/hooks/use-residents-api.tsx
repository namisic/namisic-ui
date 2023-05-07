import axios from 'axios';
import { ResidentModel } from '@/types/resident-types';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URI}/api/residents`;

export const useResidentsApi = () => {
  return {
    getAll: async (): Promise<ResidentModel[]> => {
      const { data } = await axios.get<ResidentModel[]>(baseUrl);
      return data;
    },
    getById: async (id: string): Promise<ResidentModel> => {
      const { data } = await axios.get<ResidentModel>(`${baseUrl}/${id}`);
      return data;
    },
    deleteById: (id: string): Promise<void> => axios.delete(`${baseUrl}/${id}`),
  };
};

export default useResidentsApi;
