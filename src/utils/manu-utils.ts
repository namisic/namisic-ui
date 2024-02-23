import { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number] & {
  role?: null | string | string[];
};

export function getMenuItem(
  label: React.ReactNode,
  key: React.Key,
  role?: null | string | string[],
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    role,
  } as MenuItem;
}
