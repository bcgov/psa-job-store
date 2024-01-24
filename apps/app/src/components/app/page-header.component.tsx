/* eslint-disable @typescript-eslint/no-explicit-any */
import { EllipsisOutlined } from '@ant-design/icons';
import { PageHeader as AntdProPageHeader, PageHeaderProps } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { useMatches } from 'react-router-dom';

interface ExtendedPageHeaderProps extends Omit<PageHeaderProps, 'breadcrumb'> {
  additionalBreadcrumb?: { title: string | undefined; path?: string; icon?: React.ReactNode };
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
  ...props
}: ExtendedPageHeaderProps) => {
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
      breadcrumb={{
        items: breadcrumbs,
      }}
      {...props}
      style={{ backgroundColor: '#FFF' }}
    />
  );
};
