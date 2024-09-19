/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownOutlined, EllipsisOutlined, TagOutlined } from '@ant-design/icons';
import { PageHeader as AntdProPageHeader, PageHeaderProps } from '@ant-design/pro-layout';
import { Button, Popover, Select } from 'antd';
import { AvatarProps } from 'antd/lib';
import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation, useMatches, useParams, useSearchParams } from 'react-router-dom';
import { IdVersion, JobProfileMetaModel } from '../../redux/services/graphql-api/job-profile-types';
import './page-header.component.css';

// Define the type for your breadcrumb item
interface BreadcrumbItem {
  breadcrumbName?: string | undefined;
  path?: string;
}

export interface ExtendedPageHeaderProps extends Omit<PageHeaderProps, 'breadcrumb'> {
  additionalBreadcrumb?: { title?: string; path?: string; icon?: React.ReactNode };
  avatar?: AvatarProps;
  button1Text?: string;
  button1Callback?: () => void;
  showButton1?: boolean;
  button1Content?: () => ReactNode;
  button2Text?: string;
  button2Callback?: () => void;
  showButton2?: boolean;
  versions?: JobProfileMetaModel;
  selectVersionCallback?: (selectedVersion: IdVersion) => void;
  subHeader?: ReactNode;
}

export const PageHeader = ({
  additionalBreadcrumb,
  button1Text,
  button1Callback,
  showButton1,
  button1Content,
  button2Text,
  button2Callback,
  showButton2,
  title,
  versions,
  selectVersionCallback,
  subHeader,
  ...props
}: ExtendedPageHeaderProps) => {
  const matches = useMatches();
  const params = useParams<Record<string, string>>();
  const [searchParams] = useSearchParams();
  const currentPage = useLocation().pathname;
  const segments = currentPage.split('/').filter(Boolean); // Filter out empty segments
  const [isCurrentVersion, setIsCurrentVersion] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState<IdVersion | undefined>({ id: 0, version: 0 });

  const currentVersion =
    versions?.versions?.length ?? 0 > 0
      ? versions?.versions
          ?.map((jp: { version: any }) => jp.version)
          .reduce(function (p: number, v: number) {
            return p > v ? p : v;
          }, '')
      : undefined;
  useEffect(() => {
    if (versions?.versions) {
      const versionParam = searchParams.get('version');
      const selectedVersion = versionParam
        ? versions.versions.find(
            (v: IdVersion) => v.id == parseInt(params.id ?? '') && v.version == parseInt(versionParam ?? '1'),
          )
        : [...versions.versions].sort((a, b) => {
            return b.version - a.version;
          })[0];
      setSelectedVersion(selectedVersion);
      setIsCurrentVersion(selectedVersion?.version === currentVersion);
    }
  }, [currentVersion, params.id, params.version, searchParams, versions?.versions]);
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
  const jobProfileVersions: { label: string; value: any; icon: any }[] = versions
    ? versions?.versions?.map((version: IdVersion) => ({
        label: 'Version ' + version.version,
        value: version?.id + '-' + version?.version,
        icon: <TagOutlined />,
      }))
    : [];

  const onChange = (value: string) => {
    const id_version = value.split('-');
    setIsCurrentVersion(id_version[1] === currentVersion);
    value &&
      selectVersionCallback &&
      selectVersionCallback({ id: parseInt(id_version[0] ?? ''), version: parseInt(id_version[1] ?? '') });
  };

  const showVersions = (versions?.versions?.length ?? 0) > 0;

  const renderButtons = () =>
    showVersions || selectedVersion?.id !== 0 || showButton1 || showButton2 ? (
      <div style={{ display: 'flex', gap: '10px' }}>
        {showVersions && selectedVersion && (
          <Select
            filterSort={(optionA: { label: any }, optionB: { label: any }) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={jobProfileVersions}
            onChange={onChange}
            value={selectedVersion?.id + '-' + selectedVersion?.version}
          >
            <Button>
              Select Version
              <DownOutlined />
            </Button>
          </Select>
          // This could be adapted to simplfy this component
          // <VersionSelect
          //     id={id ?? '-1'}
          //     version={version ?? '-1'}
          //     selectVersionCallback={(selectedVersion: IdVersion) => {
          //     }}
          //   />
        )}
        {showButton1 && (
          <Popover content={button1Content} trigger="click" placement="bottomRight">
            <Button icon={<EllipsisOutlined />} onClick={button1Callback}>
              {button1Text}
            </Button>
          </Popover>
        )}
        {showButton2 && (
          <Button disabled={!isCurrentVersion} type="primary" onClick={button2Callback}>
            {button2Text}
          </Button>
        )}
      </div>
    ) : undefined;

  return (
    <AntdProPageHeader
      extra={renderButtons()}
      {...breadcrumbProps}
      title={<h1 style={{ fontWeight: 600, fontSize: '20px', margin: 0 }}>{title}</h1>}
      {...props}
      style={{ backgroundColor: '#FFF', padding: '16px' }}
    >
      {subHeader}
    </AntdProPageHeader>
  );
};
