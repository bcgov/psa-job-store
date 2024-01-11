/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageHeader as AntdProPageHeader, PageHeaderProps } from '@ant-design/pro-layout';
import { useMatches } from 'react-router-dom';
import { useBreadcrumb } from '../../breadcrumb-context';

export const PageHeader = (props: Omit<PageHeaderProps, 'breadcrumb'>) => {
  const matches = useMatches();
  const { breadcrumb: contextBreadcrumb } = useBreadcrumb(); // Get the breadcrumb from context

  // Generate breadcrumbs from router's matches
  const routerBreadcrumbs = matches
    .filter((match) => Boolean((match.handle as Record<string, any>)?.breadcrumb))
    .map((match: Record<string, any>) => ({
      key: match.path,
      icon: match.handle.icon,
      title: match.handle.breadcrumb(),
      path: match.path,
    }));

  // Append the context breadcrumb if it exists
  if (contextBreadcrumb) {
    routerBreadcrumbs.push({
      key: 'current',
      title: contextBreadcrumb,
    });
  }

  return (
    <AntdProPageHeader
      breadcrumb={{
        items: routerBreadcrumbs,
      }}
      {...props}
      style={{ backgroundColor: '#FFF' }}
    />
  );
};
