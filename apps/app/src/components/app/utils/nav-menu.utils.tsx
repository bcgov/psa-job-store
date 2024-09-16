/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from 'antd';
import { MenuItemGroupType, MenuItemType, SubMenuType } from 'antd/es/menu/hooks/useItems';
import { Link } from 'react-router-dom';

const { Text } = Typography;

type NavMenuGroupProps = {
  key: string;
  children: MenuItemType[];
  collapsed: boolean;
  icon?: React.ReactNode;
  label: any;
  style?: React.CSSProperties;
  className?: string;
};
type NavMenuItemProps = {
  key: string;
  icon?: React.ReactNode;
  label: any;
  style?: React.CSSProperties;
  className?: string;
  title?: string;
};
type NavSubMenuProps = {
  key: string;
  children?: (MenuItemGroupType<MenuItemType> | MenuItemType)[];
  icon?: React.ReactNode;
  label: any;
  style?: React.CSSProperties;
  className?: string;
};

export const createMenuGroup = ({ key, children, collapsed, icon, label, style, className }: NavMenuGroupProps) => {
  // When collapsed, render the menu items in a dropdown menu
  // When expanded, render the grouped menu items

  return collapsed
    ? createSubMenu({
        key,
        icon,
        label,
        style,
        className,
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
        style: style,
        className: className,
        key: key,
        type: 'group' as const,
        label: <span style={{ userSelect: 'none' }}>{collapsed ? label : <Text strong>{label}</Text>}</span>,
        children: children,
      };
};

export const createMenuItem = ({ key, icon, label, style, title }: NavMenuItemProps): MenuItemType => ({
  key,
  // icon, // include menu in the link, since it focuses on the link when using keyboard, this way outline encompasses the whole menu item
  label: (
    <Link to={key} style={{}}>
      {icon} <span className="link-label">{label}</span>
    </Link>
  ),
  style,
  title,
});

export const createSubMenu = ({
  key,
  children,
  icon,
  label,
  style,
  className,
}: NavSubMenuProps): SubMenuType<MenuItemType> => ({
  key,
  children: children ?? [],
  icon,
  label,
  style,
  className,
});
