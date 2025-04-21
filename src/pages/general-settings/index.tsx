'use client';

import Authorize from '@/components/auth/authorize';
import PageTitle from '@/components/common/page-title';
import GeneralSettingsForm from '@/components/general-settings/general-settings-form';
import { RoleName } from '@/constants/auth';
import useGeneralSettingsApi from '@/hooks/use-general-settings-api';
import { GeneralSettingsModel } from '@/types/general-settings-types';
import { Form, notification } from 'antd';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

const pageTitle = 'Configuración General';

const GeneralSttingsPage = () => {
  const { getGeneralSettings, updateGeneralSettings } = useGeneralSettingsApi();
  const [formInstance] = Form.useForm();
  const [generalSettings, setGeneralSettings] =
    useState<GeneralSettingsModel>();

  const callGetGeneralSettings = async () => {
    const data = await getGeneralSettings();
    setGeneralSettings(data);
  };

  const onSaveClick = async (data: GeneralSettingsModel) => {
    try {
      await updateGeneralSettings(data);
      notification.success({
        description: `Se ha actualizado la información del condominio '${data.condominiumName}'.`,
        message: 'Operación realizada correctamente',
      });
      close();
    } catch (error) {}
  };

  useEffect(() => {
    callGetGeneralSettings();
  }, []);

  return (
    <Authorize allowedRoles={RoleName.Administrator} redirectWhenUnauthorized>
      <Head>
        <title>
          {pageTitle} - {generalSettings?.condominiumName}
        </title>
      </Head>
      <PageTitle title={pageTitle} />
      <GeneralSettingsForm
        formInstance={formInstance}
        data={generalSettings}
        onSaveClick={onSaveClick}
      />
    </Authorize>
  );
};

export default GeneralSttingsPage;
