import '@/styles/globals.css';
import '@/styles/ant.css';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  ApiConfig,
  ApiConfigContext,
  defaultApiConfig,
} from '@/contexts/api-config-context';
import { ConfigResponse } from '@/types/config-response';
import axios from 'axios';
import { MainLayout } from '@/components/layouts/main-layout';
import theme from '@/theme/theme-config';

import { ConfigProvider, unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';

// TODO Eliminar cuando Ant Design sea compatible con React 19.
unstableSetRender((node, container: any) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [apiConfig, setApiConfig] = useState<ApiConfig>(defaultApiConfig);

  useEffect(() => {
    const getConfig = async () => {
      try {
        const { data } = await axios.get<ConfigResponse>('/api/config');
        setApiConfig({
          configRequested: true,
          config: data,
        });
      } catch (error) { }
    };

    getConfig();
  }, []);

  return (
    <SessionProvider session={session}>
      <ApiConfigContext.Provider value={apiConfig}>
        <ConfigProvider theme={theme}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ConfigProvider>
      </ApiConfigContext.Provider>
    </SessionProvider>
  );
}
