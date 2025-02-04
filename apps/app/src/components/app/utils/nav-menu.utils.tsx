/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MenuProps } from 'antd';
import { Typography } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import { Link } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];

const { Text } = Typography;

type NavMenuGroupProps = {
  key: string;
  children: MenuItem[];
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
  children?: MenuItem[];
  icon?: React.ReactNode;
  label: any;
  style?: React.CSSProperties;
  className?: string;
};

// export const createMenuGroup = ({ key, children, collapsed, icon, label, style, className }: NavMenuGroupProps) => {
//   // When collapsed, render the menu items in a dropdown menu
//   // When expanded, render the grouped menu items

//   return collapsed
//     ? createSubMenu({
//         key,
//         icon,
//         label,
//         style,
//         className,
//         children: [
//           {
//             key: key,
//             type: 'group' as const,
//             label: <span style={{ userSelect: 'none' }}>{collapsed ? label : <Text strong>{label}</Text>}</span>,
//             children: children,
//           },
//         ],
//       })
//     : {
//         style: style,
//         className: className,
//         key: key,
//         type: 'group' as const,
//         label: <span style={{ userSelect: 'none' }}>{collapsed ? label : <Text strong>{label}</Text>}</span>,
//         children: children,
//       };
// };

export const createMenuItem = ({ key, icon, label, style, title }: NavMenuItemProps): MenuItemType => ({
  key,
  label: (
    <Link to={key} style={{}} aria-label={label}>
      {icon} <span className="link-label">{label}</span>
    </Link>
  ),
  style,
  title,
});

export const createSubMenu = ({ key, children, icon, label, style, className }: NavSubMenuProps): MenuItem => ({
  key,
  children: children ?? [],
  icon,
  label,
  style,
  className,
});

export const createMenuGroup = ({
  key,
  children,
  collapsed,
  icon,
  label,
  style,
  className,
}: NavMenuGroupProps): MenuItem => {
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
