/* eslint-disable @typescript-eslint/no-explicit-any */
import { EllipsisOutlined } from '@ant-design/icons';
import { PageHeader as AntdProPageHeader, PageHeaderProps } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { Link, useLocation, useMatches, useParams } from 'react-router-dom';
import './page-header.component.css';

// Define the type for your breadcrumb item
interface BreadcrumbItem {
  breadcrumbName?: string | undefined;
  path?: string;
}

interface ExtendedPageHeaderProps extends Omit<PageHeaderProps, 'breadcrumb'> {
  additionalBreadcrumb?: { title?: string; path?: string; icon?: React.ReactNode };
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

  // Check if it's a level 1 subpage (e.g., 'my-position-requests')
  const hideBreadcrumb = segments.length === 1;
  const breadcrumbs: BreadcrumbItem[] = matches
    .filter((match) => Boolean((match.handle as Record<string, any>)?.breadcrumb))
    .map(
      (match: Record<string, any>): BreadcrumbItem => ({
        breadcrumbName: match.handle.breadcrumb(),
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
      breadcrumbName: additionalBreadcrumb.title,
      path: additionalBreadcrumb.path,
    });
  }
  // const breadcrumbItemRender = (
  //   route: {
  //     breadcrumbName?:
  //       | string
  //       | number
  //       | boolean
  //       | ReactElement<any, string | JSXElementConstructor<any>>
  //       | Iterable<ReactNode>
  //       | null
  //       | undefined;
  //   },
  //   params: any,
  //   routes: any[],
  //   paths: any[],
  // ) => {
  //   console.log(route);
  //   console.log(params);
  //   console.log(routes);
  //   console.log(paths);
  //   const last = routes.indexOf(route) === routes.length - 1;
  //   return last ? <span>{route.breadcrumbName}</span> : <Link to={`#${paths.join('/')}`}>{route.breadcrumbName}</Link>;
  // };
  // const itemRender = (item: BreadcrumbItem, any[]) => {
  //     const { path, title } = item;

  //     const isLast = breadcrumbs.indexOf(item) === segmentsLength; //routes.indexOf(route) === routes.length - 1;
  //     return isLast ? (
  //       <span className="breadcrumb-current">{title}</span>
  //     ) : (
  //       <Link className="breadcrumb-link" to={path}>
  //         {title}
  //       </Link>
  //     );
  //   };
  const itemRender = (
    route: Partial<BreadcrumbItem>, // The current route info
    _params: any, // Params (not used in this case)
    routes: Partial<BreadcrumbItem>[], // Array of all route items
  ): React.ReactNode => {
    const isLast = routes.indexOf(route) === segmentsLength;
    return isLast ? (
      <span className="breadcrumb-current">{route.breadcrumbName}</span>
    ) : (
      <Link className="breadcrumb-link" to={route.path ?? '/'}>
        {route.breadcrumbName}
      </Link>
    );
  };
  const breadcrumbProps = hideBreadcrumb
    ? {}
    : {
        breadcrumb: {
          itemRender,
          items: breadcrumbs.map((breadcrumb) => ({
            path: breadcrumb.path,
            breadcrumbName: breadcrumb.breadcrumbName,
            // Map any additional properties from BreadcrumbItem to the expected structure
          })),
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
