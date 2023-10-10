import { SiderNavItem, SiderNavItemProps } from './sider-nav-item.component';

export interface SiderNavProps {
  collapsed: boolean;
  items: Omit<SiderNavItemProps, 'collapsed'>[];
}

export const SiderNav = ({ collapsed, items }: SiderNavProps) => {
  return (
    <div style={{ width: '100%', overflowX: 'clip' }}>
      {/* TODO Loop */}
      {items.map(({ icon, title, to }) => (
        <SiderNavItem collapsed={collapsed} icon={icon} key={title} title={title} to={to} />
      ))}
      {/* TODO End Loop */}
    </div>
  );
};
