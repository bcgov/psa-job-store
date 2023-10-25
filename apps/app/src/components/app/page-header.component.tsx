/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageHeader as AntdProPageHeader, PageHeaderProps } from '@ant-design/pro-layout';
import { useMatches } from 'react-router-dom';

export const PageHeader = (props: Omit<PageHeaderProps, 'breadcrumb'>) => {
  const matches = useMatches();
  const breadcrumbs = matches
    .filter((match) => Boolean((match.handle as Record<string, any>)?.breadcrumb))
    .map((match: Record<string, any>) => ({
      key: match.path,
      icon: match.handle.icon,
      title: match.handle.breadcrumb(),
      path: match.path,
    }));

  return (
    <AntdProPageHeader
      breadcrumb={{
        items: breadcrumbs,
      }}
      {...props}
      style={{ backgroundColor: '#FFF' }}
    />
  );
};
