import { ServerError } from '@/types/server-error';
import { Modal } from 'antd';
import axios, { AxiosError } from 'axios';

type AxiosErrorConfig = {
  [index: string]: (error: AxiosError) => Promise<any>;
};

const showErrorFromServer = async (error: AxiosError) => {
  const response = error.response?.data as ServerError;
  const errorText = response.detail || response.title;
  Modal.error({
    content: errorText,
    title: 'Oops!, algo salió mal',
  });
};

const DefaultErrorConfig: AxiosErrorConfig = {
  '0': showErrorFromServer,
  '400': showErrorFromServer,
  '404': showErrorFromServer,
  '500': showErrorFromServer,
};

export const getAxiosInstance = (customErrorConfig?: AxiosErrorConfig) => {
  const instance = axios.create();

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const errorConfig = { ...DefaultErrorConfig, ...customErrorConfig };
      const handler = errorConfig[error.response?.status ?? 0];
      debugger;
      await handler(error);
      throw error;
    }
  );

  return instance;
};
