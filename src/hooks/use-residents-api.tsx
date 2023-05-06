import axios from 'axios';
import { ResidentTableDataType } from '@/types/resident-types';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URI}/api/residents`;

export const useResidentsApi = () => {
  return {
    getAll: async (): Promise<ResidentTableDataType[]> => {
      console.log(process.env.NEXT_PUBLIC_API_URI);
      const { data } = await axios.get(baseUrl);
      const residents = (data as any[]).map<ResidentTableDataType>(
        ({ id, name, apartmentNumber }) => {
          return { id, name, apartmentNumber, key: id };
        }
      );

      return residents;
    },
  };
};

export default useResidentsApi;
