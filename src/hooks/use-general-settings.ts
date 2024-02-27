import { useContext, useEffect, useState } from 'react';
import useGeneralSettingsApi from './use-general-settings-api';
import { GetGeneralSettingsResponse } from '@/types/general-settings-types';
import { ApiConfigContext } from '@/contexts/api-config-context';

const useGeneralSettings = () => {
  const { configRequested } = useContext(ApiConfigContext);
  const { getGeneralSettings } = useGeneralSettingsApi();
  const [generalSettings, setGeneralSettings] =
    useState<GetGeneralSettingsResponse>();

  const callGetGeneralSettings = async () => {
    const newGeneralSettings = await getGeneralSettings();
    setGeneralSettings(newGeneralSettings);
  };

  useEffect(() => {
    if (configRequested) {
      callGetGeneralSettings();
    }
  }, [configRequested]);

  return { generalSettings };
};

export default useGeneralSettings;
