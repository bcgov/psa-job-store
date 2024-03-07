/* eslint-disable @typescript-eslint/no-explicit-any */
import { EllipsisOutlined } from '@ant-design/icons';
import { PageHeader as AntdProPageHeader, BreadcrumbItemRender, PageHeaderProps } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { ReactNode } from 'react';
import { Link, useLocation, useMatches, useParams } from 'react-router-dom';
import './page-header.component.css';

// Define the type for your breadcrumb item
interface BreadcrumbItem {
  key: string | undefined;
  icon: ReactNode | undefined;
  path: string;
  title: string | undefined;
}
interface ExtendedPageHeaderProps extends Omit<PageHeaderProps, 'breadcrumb'> {
  additionalBreadcrumb?: { title: string; path: string; icon?: React.ReactNode };
  button1Text?: string;
  button1Callback?: () => void;
  showButton1?: boolean;
  button2Text?: string;
  button2Callback?: () => void;
  showButton2?: boolean;
}

export const PageHeader = ({
  additionalBreadcrumb,
  button1Text,
  button1Callback,
  showButton1,
  button2Text,
  button2Callback,
  showButton2,
  title,
  ...props
}: ExtendedPageHeaderProps) => {
  const matches = useMatches();
  const params = useParams<Record<string, string>>();
  const currentPage = useLocation().pathname;
  const segments = currentPage.split('/').filter(Boolean); // Filter out empty segments
  console.log(currentPage);
  console.log(segments);
  // Check if it's a level 1 subpage (e.g., 'my-positions')
  const hideBreadcrumb = segments.length === 1;
  const breadcrumbs: BreadcrumbItem[] = matches
    .filter((match) => Boolean((match.handle as Record<string, any>)?.breadcrumb))
    .map(
      (match: Record<string, any>): BreadcrumbItem => ({
        key: match.pathname,
        icon: match.handle.icon,
        title: match.handle.breadcrumb(),
        path: Object.values(params).reduce(
          (path, param) => path?.replace(new RegExp('/' + param + '/?'), ''),
          match.pathname,
        ),
      }),
    );

  // this currently works because additional breadcrumbs effectively replace the last segment which is a parameter
  const segmentsLength = breadcrumbs.length;

  // If additionalBreadcrumb is provided, append it to the breadcrumbs array
  if (additionalBreadcrumb) {
    breadcrumbs.push({
      key: additionalBreadcrumb.path,
      icon: additionalBreadcrumb.icon,
      title: additionalBreadcrumb.title,
      path: additionalBreadcrumb.path,
    });
  }

  const itemRender: BreadcrumbItemRender<BreadcrumbItem> = (item: BreadcrumbItem) => {
    const { path, title } = item;

    const isLast = breadcrumbs.indexOf(item) === segmentsLength; //routes.indexOf(route) === routes.length - 1;
    return isLast ? (
      <span className="breadcrumb-current">{title}</span>
    ) : (
      <Link className="breadcrumb-link" to={path}>
        {title}
      </Link>
    );
  };
  const breadcrumbProps = hideBreadcrumb
    ? {}
    : {
        breadcrumb: {
          itemRender: itemRender,
          items: breadcrumbs,
        },
      };

  const renderButtons = () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      {showButton1 && (
        <Button icon={<EllipsisOutlined></EllipsisOutlined>} onClick={button1Callback}>
          {button1Text}
        </Button>
      )}
      {showButton2 && (
        <Button type="primary" onClick={button2Callback}>
          {button2Text}
        </Button>
      )}
    </div>
  );

  return (
    <AntdProPageHeader
      extra={renderButtons()}
      {...breadcrumbProps}
      title={<h1 style={{ fontWeight: 600, fontSize: '20px', lineHeight: '32px' }}>{title}</h1>}
      {...props}
      style={{ backgroundColor: '#FFF' }}
    />
  );
};
