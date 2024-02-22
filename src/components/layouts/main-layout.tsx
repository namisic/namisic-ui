import { useRouter } from 'next/router';
import { Layout, Menu, MenuProps, theme } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { getMenuItem } from '../../utils/manu-utils';
import {
  ApartmentOutlined,
  HomeOutlined,
  PoweroffOutlined,
  SafetyOutlined,
} from '@ant-design/icons';

const { Content, Sider } = Layout;

export const MainLayout: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const session = useSession();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (router.pathname === '/') {
    return <>{children}</>;
  }

  const menuItems: MenuProps['items'] = [
    getMenuItem('Dashboard', 'dashboard', <HomeOutlined />),
    getMenuItem('Administración', 'management', <ApartmentOutlined />, [
      getMenuItem('Residentes', 'residents', null),
    ]),
    getMenuItem('Seguridad', 'security', <SafetyOutlined />, [
      getMenuItem('Entrada/Salida de Vehículos', 'vehicle-entry-exit', null),
    ]),
    getMenuItem('Cerrar Sesión', 'signout', <PoweroffOutlined />),
  ];

  // Navigate to page.
  const onSelect: MenuProps['onSelect'] = (e) => {
    if (e.key === 'signout') {
      signOut();
    }

    router.push(`/${e.key}`);
  };

  return (
    <Layout className="md:h-screen md:w-screen" hasSider>
      <Sider breakpoint="md" collapsedWidth={0}>
        <Menu
          onSelect={onSelect}
          mode="inline"
          items={menuItems}
          theme="dark"
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
