import { SimpleIdServerProvider } from '@/constants/auth';
import { ServerError } from '@/types/server-error';
import { Modal } from 'antd';
import axios, { AxiosError } from 'axios';
import { useSession, signIn } from 'next-auth/react';
import { NextRouter, useRouter } from 'next/router';

type AxiosErrorConfig = {
  [index: string]: (error: AxiosError, router: NextRouter) => Promise<any>;
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
  '401': async (error) =>
    Modal.warning({
      title: 'Sesión vencida',
      content: 'Por favor inicie sesión nuevamente.',
      onOk: () => {
        signIn(SimpleIdServerProvider);
      },
      cancelText: null,
    }),
  '403': async (error, router) => router.replace('/unauthorized'),
  '404': showErrorFromServer,
  '500': showErrorFromServer,
};

export const useAxios = () => {
  const session = useSession();
  const router = useRouter();
  const getAxiosInstance = (customErrorConfig?: AxiosErrorConfig) => {
    const instance = axios.create();

    if (
      session.status === 'authenticated' &&
      session.data?.accessToken !== undefined
    ) {
      instance.interceptors.request.use((request) => {
        request.headers.Authorization = `Bearer ${session.data.accessToken}`;
        return request;
      });
    }

    instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const errorConfig = { ...DefaultErrorConfig, ...customErrorConfig };
        const handler =
          errorConfig[error.response?.status ?? 0] ?? errorConfig[0];
        await handler(error, router);
        throw error;
      }
    );

    return instance;
  };

  return { getAxiosInstance };
};
