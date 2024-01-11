/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageHeader as AntdProPageHeader, PageHeaderProps } from '@ant-design/pro-layout';
import { useMatches } from 'react-router-dom';

interface ExtendedPageHeaderProps extends Omit<PageHeaderProps, 'breadcrumb'> {
  additionalBreadcrumb?: { title: string | undefined; path?: string; icon?: React.ReactNode };
}

export const PageHeader = ({ additionalBreadcrumb, ...props }: ExtendedPageHeaderProps) => {
  const matches = useMatches();
  const breadcrumbs = matches
    .filter((match) => Boolean((match.handle as Record<string, any>)?.breadcrumb))
    .map((match: Record<string, any>) => ({
      key: match.path,
      icon: match.handle.icon,
      title: match.handle.breadcrumb(),
      path: match.path,
    }));

  // If additionalBreadcrumb is provided, append it to the breadcrumbs array
  if (additionalBreadcrumb) {
    breadcrumbs.push({
      key: additionalBreadcrumb.path,
      icon: additionalBreadcrumb.icon,
      title: additionalBreadcrumb.title,
      path: additionalBreadcrumb.path,
    });
  }

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
