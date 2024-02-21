import { Menu, MenuProps } from 'antd';
import {
  ApartmentOutlined,
  MenuOutlined,
  PoweroffOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { getMenuItem } from './navbar-utils';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

export const MainNavbar = () => {
  const router = useRouter();
  const session = useSession();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems: MenuProps['items'] = [
    getMenuItem(
      collapsed ? 'Mostrar menú' : 'Cerrar menú',
      'collapser',
      <MenuOutlined />
    ),
    getMenuItem('Administración', 'management', <ApartmentOutlined />, [
      getMenuItem('Residentes', 'residents', null),
    ]),
    { type: 'divider' },
    getMenuItem('Seguridad', 'security', <SafetyOutlined />, [
      getMenuItem('Entrada/Salida de Vehículos', 'vehicle-entry-exit', null),
    ]),
  ];

  if (session.status === 'authenticated') {
    menuItems.push(
      getMenuItem('Cerrar Sesión', 'signout', <PoweroffOutlined />)
    );
  }

  // Navigate to page.
  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'collapser':
        setCollapsed((currentValue) => !currentValue);
        break;
      case 'signout':
        signOut();
        break;

      default:
        router.push(`/${e.key}`);
        break;
    }
  };

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      inlineCollapsed={collapsed}
      mode="inline"
      items={menuItems}
      theme="dark"
    />
  );
};
