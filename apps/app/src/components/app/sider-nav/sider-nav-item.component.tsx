import { Tooltip } from 'antd';
import { NavLink, To } from 'react-router-dom';

export interface SiderNavItemProps {
  collapsed: boolean;
  icon: React.ReactNode;
  title: string;
  to: To;
}

export const SiderNavItem = ({ collapsed, icon, title, to }: SiderNavItemProps) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div
          style={{
            cursor: 'pointer',
            width: '12rem',
            ...(!isActive && { color: 'black' }),
          }}
        >
          <div style={{ padding: '0.625rem 1.125rem' }}>
            <span>
              {collapsed ? (
                <Tooltip placement="right" title={title}>
                  {icon}
                </Tooltip>
              ) : (
                icon
              )}
            </span>
            <span
              style={{
                top: 0,
                marginLeft: '1rem',
                ...(collapsed === false
                  ? { opacity: 1, transition: 'opacity 0.5s ease' }
                  : { opacity: 0, transition: 'opacity 0.5s ease' }),
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </span>
          </div>
        </div>
      )}
    </NavLink>
  );
};
