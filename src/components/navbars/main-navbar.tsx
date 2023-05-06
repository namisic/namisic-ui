import { Menu, MenuProps } from 'antd';
import { ApartmentOutlined, AuditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { getMenuItem } from './navbar-utils';

const menuItems: MenuProps['items'] = [
  getMenuItem('Administración', 'management', <ApartmentOutlined />, [
    getMenuItem('Residentes', 'residents', null),
  ]),

  { type: 'divider' },

  getMenuItem('Reportes', 'reports', <AuditOutlined />, [
    getMenuItem('Entrada/Salida de Vehículos', 'io-vehicles', null),
  ]),
];

export const MainNavbar = () => {
  const router = useRouter();

  // Navigate to page.
  const onClick: MenuProps['onClick'] = (e) => {
    router.push(`/${e.key}`);
  };

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={menuItems}
      theme="dark"
    />
  );
};
