import { ApartmentOutlined, AuditOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { getMenuItem } from './navbar-utils';

const menuItems: MenuProps['items'] = [
  getMenuItem('Management', 'management', <ApartmentOutlined />, [
    getMenuItem('Residents', 'residents', null),
  ]),

  { type: 'divider' },

  getMenuItem('Reports', 'reports', <AuditOutlined />, [
    getMenuItem('I/O Vehicles', 'io-vehicles', null),
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
