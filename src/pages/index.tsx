import { ApiConfigContext } from '@/contexts/api-config-context';
import useGeneralSettingsApi from '@/hooks/use-general-settings-api';
import { GetGeneralSettingsResponse } from '@/types/general-settings-types';
import { FilePdfOutlined, KeyOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
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

  return (
    <div className="md:flex md:flex-row h-screen relative md:w-screen">
      <Head>
        <title>Inicio - {generalSettings?.condominiumName}</title>
      </Head>

      <section className="bg-slate-100 flex flex-col md:h-full md:w-2/5 relative shadow-b md:shadow-r z-10">
        <h1 className="bg-slate-900 font-bold m-0 px-8 py-10 text-3xl text-white">
          Bienvenidos a {generalSettings?.condominiumName}
        </h1>

        {typeof generalSettings?.condominiumDescription === 'string' ? (
          <h2 className="font-medium text-lg bg-slate-300 py-2 px-8 mb-4 mt-0 mx-0">
            {generalSettings?.condominiumDescription}
          </h2>
        ) : null}

        <section className="self-end mr-4">
          <Button
            icon={<KeyOutlined />}
            type="primary"
            onClick={() => router.push('/dashboard')}
          >
            Ingresar
          </Button>
        </section>

        <section className="flex flex-col px-8 my-10">
          {typeof generalSettings?.condominiumAddress === 'string' ? (
            <p className="my-0">
              Dirección: {generalSettings?.condominiumAddress}
            </p>
          ) : null}

          {typeof generalSettings?.condominiumPhone === 'string' ? (
            <p className="my-0">
              Teléfono: {generalSettings?.condominiumPhone}
            </p>
          ) : null}

          <Button
            className="mt-4"
            href={generalSettings?.condominiumCoexistenceManualPath}
            icon={<FilePdfOutlined />}
            type="link"
          >
            Descargar manual de convivencia
          </Button>
        </section>
      </section>

      <section className="overflow-hidden h-full md:w-3/5">
        <Image
          src={
            generalSettings?.homePageBackgroundImagePath ||
            '/img/home_default.jpg'
          }
          alt="Casa"
          height={1024}
          width={1024}
        />
      </section>
    </div>
  );
}
