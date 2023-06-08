import { Button, Result } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

const UnauthorizedPage = () => {
  const router = useRouter();
  return (
    <Result
      status="403"
      title="Sin autorización"
      subTitle="Lo sentimos, pero no cuenta con autorización para acceder al recurso."
      extra={
        <Button type="primary" onClick={() => router.replace('/')}>
          Ir al inicio
        </Button>
      }
    />
  );
};

export default UnauthorizedPage;
