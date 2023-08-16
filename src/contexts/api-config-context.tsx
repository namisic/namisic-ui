import { ConfigResponse } from '@/types/config-response';
import { createContext } from 'react';

export type ApiConfig = {
  configRequested: Boolean;
  config?: ConfigResponse;
};

export const defaultApiConfig = {
  configRequested: false,
};

export const ApiConfigContext = createContext<ApiConfig>(defaultApiConfig);
