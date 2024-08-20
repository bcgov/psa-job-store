import { Typography } from 'antd';
import { MenuItemGroupType, MenuItemType, SubMenuType } from 'antd/es/menu/hooks/useItems';
import { Link } from 'react-router-dom';

const { Text } = Typography;

type NavMenuGroupProps = {
  key: string;
  children: MenuItemType[];
  collapsed: boolean;
  icon?: React.ReactNode;
  label: string;
};
type NavMenuItemProps = { key: string; icon?: React.ReactNode; label: string; title?: string };
type NavSubMenuProps = {
  key: string;
  children?: (MenuItemGroupType<MenuItemType> | MenuItemType)[];
  icon?: React.ReactNode;
  label: string;
};

export const createMenuGroup = ({ key, children, collapsed, icon, label }: NavMenuGroupProps) => {
  // When collapsed, render the menu items in a dropdown menu
  // When expanded, render the grouped menu items

  return collapsed
    ? createSubMenu({
        key,
        icon,
        label,
        children: [
          {
            key: key,
            type: 'group' as const,
            label: <span style={{ userSelect: 'none' }}>{collapsed ? label : <Text strong>{label}</Text>}</span>,
            children: children,
          },
        ],
      })
    : {
        key: key,
        type: 'group' as const,
        label: <span style={{ userSelect: 'none' }}>{collapsed ? label : <Text strong>{label}</Text>}</span>,
        children: children,
      };
};

export const createMenuItem = ({ key, icon, label, title }: NavMenuItemProps): MenuItemType => ({
  key,
  icon,
  label: <Link to={key}>{label}</Link>,
  title,
});

export const createSubMenu = ({ key, children, icon, label }: NavSubMenuProps): SubMenuType<MenuItemType> => ({
  key,
  children: children ?? [],
  icon,
  label,
});