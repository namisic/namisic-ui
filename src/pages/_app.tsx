import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { MainLayout } from '../components/layouts/main-layout';
import { useEffect, useState } from 'react';
import {
  ApiConfig,
  ApiConfigContext,
  defaultApiConfig,
} from '@/contexts/api-config-context';
import { ConfigResponse } from '@/types/config-response';
import axios from 'axios';

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
      } catch (error) {}
    };

    getConfig();
  }, []);

  return (
    <SessionProvider session={session}>
      <MainLayout>
        <ApiConfigContext.Provider value={apiConfig}>
          <Component {...pageProps} />
        </ApiConfigContext.Provider>
      </MainLayout>
    </SessionProvider>
  );
}
