import { Menu, MenuProps } from 'antd';
import {
  ApartmentOutlined,
  AuditOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { getMenuItem } from './navbar-utils';
import { useState } from 'react';

export const MainNavbar = () => {
  const router = useRouter();
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
    getMenuItem('Reportes', 'reports', <AuditOutlined />, [
      getMenuItem('Entrada/Salida de Vehículos', 'io-vehicles', null),
    ]),
  ];

  // Navigate to page.
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'collapser') {
      setCollapsed((currentValue) => !currentValue);
    } else {
      router.push(`/${e.key}`);
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
