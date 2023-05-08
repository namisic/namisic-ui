import axios from "axios";
import { ResidentModel } from "@/types/resident-types";

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
    update: async (residentmodel: ResidentModel): Promise<void> => {
      await axios.put<ResidentModel>(
        `${baseUrl}/${residentmodel.id}`,
        residentmodel
      );
    },
  };
};

export default useResidentsApi;
