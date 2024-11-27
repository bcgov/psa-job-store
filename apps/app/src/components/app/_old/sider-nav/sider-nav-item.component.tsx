import { Tooltip } from 'antd';
import { NavLink, To } from 'react-router-dom';

export interface SiderNavItemProps {
  collapsed: boolean;
  icon: React.ReactNode;
  title: string;
  to: To;
  hideTitle?: boolean;
}

export const SiderNavItem = ({ collapsed, icon, title, to, hideTitle }: SiderNavItemProps) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div
          style={{
            cursor: 'pointer',
            width: '200px',
            ...(!isActive && { color: 'rgba(0, 0, 0, 0.88)' }),
            ...(isActive && { backgroundColor: '#F0F8FF' }),
          }}
        >
          <div style={{ padding: '0.625rem 0.9rem' }}>
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
                display: hideTitle ? 'none' : 'inline',
                top: 0,
                marginLeft: '0.7rem',
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
