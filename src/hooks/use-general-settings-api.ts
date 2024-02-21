import { useContext } from 'react';
import { useAxios } from './use-axios';
import { ApiConfigContext } from '@/contexts/api-config-context';
import { GetGeneralSettingsResponse } from '@/types/general-settings-types';
import {
  add,
  formatISO,
  isBefore,
  parseISO,
  setMilliseconds,
  setSeconds,
} from 'date-fns';

const useGeneralSettingsApi = () => {
  const { getAxiosInstance } = useAxios();
  const apiConfig = useContext(ApiConfigContext);
  const baseUrl = `${apiConfig.config?.ApiUri}/api/GeneralSettings`;
  const nextTimeKey = 'nextTimeToGetGeneralSettings';
  const generalSettingsKey = 'generalSettings';

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

      const nextTime = setMilliseconds(
        setSeconds(add(new Date(), { days: 1 }), 0),
        0
      );

      localStorage.setItem(generalSettingsKey, JSON.stringify(data));
      localStorage.setItem(nextTimeKey, formatISO(nextTime));

      return data;
    },
  };
};

export default useGeneralSettingsApi;
