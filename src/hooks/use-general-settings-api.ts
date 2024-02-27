import { useContext } from 'react';
import { useAxios } from './use-axios';
import { ApiConfigContext } from '@/contexts/api-config-context';
import {
  GetGeneralSettingsResponse,
  UpdateGeneralSettingsRequest,
} from '@/types/general-settings-types';
import {
  add,
  formatISO,
  isBefore,
  parseISO,
  setMilliseconds,
  setSeconds,
} from 'date-fns';

const nextTimeKey = 'nextTimeToGetGeneralSettings';
const generalSettingsKey = 'generalSettings';
const generateNextTime = () =>
  formatISO(setMilliseconds(setSeconds(add(new Date(), { days: 1 }), 0), 0));

const useGeneralSettingsApi = () => {
  const { getAxiosInstance } = useAxios();
  const apiConfig = useContext(ApiConfigContext);
  const baseUrl = `${apiConfig.config?.ApiUri}/api/GeneralSettings`;

  return {
    getGeneralSettings: async (
      forceRequest = false
    ): Promise<GetGeneralSettingsResponse> => {
      if (!forceRequest) {
        const nextTimeText = localStorage.getItem(nextTimeKey);
        const generalSettingsText = localStorage.getItem(generalSettingsKey);

        if (nextTimeKey !== null && generalSettingsText !== null) {
          const nextTime = parseISO(nextTimeText!);

          if (isBefore(new Date(), nextTime)) {
            return JSON.parse(generalSettingsText);
          }
        }
      }

      const { data } = await getAxiosInstance().get<GetGeneralSettingsResponse>(
        baseUrl
      );

      const nextTime = generateNextTime();

      localStorage.setItem(generalSettingsKey, JSON.stringify(data));
      localStorage.setItem(nextTimeKey, nextTime);

      return data;
    },
    updateGeneralSettings: async (
      data: UpdateGeneralSettingsRequest
    ): Promise<void> => {
      await getAxiosInstance().put(baseUrl, data);
      const nextTime = generateNextTime();
      localStorage.setItem(generalSettingsKey, JSON.stringify(data));
      localStorage.setItem(nextTimeKey, nextTime);
    },
  };
};

export default useGeneralSettingsApi;
