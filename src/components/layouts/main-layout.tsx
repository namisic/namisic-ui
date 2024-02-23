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
import useAuthorize from '@/hooks/use-authorize';
import { RoleName } from '@/constants/auth';
import { useContext, useEffect, useState } from 'react';
import { ApiConfigContext } from '@/contexts/api-config-context';

const { Content, Sider } = Layout;

// MenuProps['items']

const allMenuItems = [
  getMenuItem('Dashboard', 'dashboard', null, <HomeOutlined />),
  getMenuItem(
    'Administración',
    'management',
    RoleName.Administrator,
    <ApartmentOutlined />,
    [getMenuItem('Residentes', 'residents', null)]
  ),
  getMenuItem(
    'Seguridad',
    'security',
    RoleName.SecurityGuard,
    <SafetyOutlined />,
    [getMenuItem('Entrada/Salida de Vehículos', 'vehicle-entry-exit', null)]
  ),
  getMenuItem('Cerrar Sesión', 'signout', null, <PoweroffOutlined />),
];

export const MainLayout: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const { configRequested } = useContext(ApiConfigContext);
  const router = useRouter();
  const session = useSession();
  const { isAuthorized } = useAuthorize();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);

  // Building menu items according the role.
  useEffect(() => {
    if (configRequested && session.status === 'authenticated') {
      const newMenuItems = allMenuItems.reduce<MenuProps['items']>(
        (prev, curr) => {
          if (isAuthorized(curr.role)) {
            const newMenuItem = { ...curr };
            delete newMenuItem.role;

            prev!.push(newMenuItem);
          }

          return prev;
        },
        []
      );

      setMenuItems(newMenuItems);
    }
  }, [session, configRequested]);

  // Navigate to page.
  const onSelect: MenuProps['onSelect'] = (e) => {
    if (e.key === 'signout') {
      signOut();
      return;
    }

    router.push(`/${e.key}`);
  };

  if (router.pathname === '/') {
    return <>{children}</>;
  }

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
