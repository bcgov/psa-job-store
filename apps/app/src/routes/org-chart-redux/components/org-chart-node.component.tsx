/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckCircleFilled, UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Tag, Tooltip, Typography } from 'antd';
import { CSSProperties } from 'react';
import { useAuth } from 'react-oidc-context';
import { Handle, NodeProps, Position } from 'reactflow';
import { OrgChartContext } from '../enums/org-chart-context.enum';
import { OrgChartType } from '../enums/org-chart-type.enum';
import './org-chart-node.component.css';

const { Top, Bottom } = Position;
const { Text } = Typography;

const applyDoubleBunkingStyles = (employees: unknown[]): CSSProperties => {
  const backgroundColors = ['#F0F0F0', '#F5F5F5', '#F8F8F8'];

  const retVal = {
    ...(employees.length > 1 && {
      boxShadow: employees
        .slice(1, backgroundColors.length + 1)
        .map(
          (_, index) =>
            `${index * 4 + 4}px ${index * 4 + 4}px 0 -1px ${backgroundColors[index]}, ${index * 4 + 4}px ${
              index * 4 + 4
            }px #A1A1A1`,
        )
        .join(','),
    }),
  };

  return retVal;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderPositionNumber = (roles: string[], positionData: Record<string, any>) => {
  if (roles.includes('classification') || roles.includes('total-compensation')) {
    return positionData.id;
  } else if (roles.includes('hiring-manager')) {
    if (positionData.position_status === 'Approved') {
      return positionData.id;
    } else {
      return <em>Pending approval</em>;
    }
  }
};

export interface OrgChartNodeProps extends NodeProps {
  orgChartType: OrgChartType;
  orgChartContext?: OrgChartContext;
}

export const OrgChartNode = ({
  data,
  isConnectable,
  selected,
  sourcePosition = Bottom,
  targetPosition = Top,
  orgChartType,
  orgChartContext,
  ...rest
}: OrgChartNodeProps) => {
  const auth = useAuth();
  const positionIsVacant = data.employees.length === 0;

  const roles: string[] = auth.user?.profile['client_roles'] as string[];

  return (
    <>
      <Handle type="target" position={targetPosition} isConnectable={isConnectable} />
      <div>
        <Card
          actions={
            selected && orgChartType === OrgChartType.DYNAMIC
              ? orgChartContext === OrgChartContext.DEFAULT
                ? [
                    <Tooltip
                      title={
                        positionIsVacant
                          ? "You can't create a new position which reports to a vacant position."
                          : undefined
                      }
                    >
                      <Button
                        // onClick={createDirectReport}
                        disabled={positionIsVacant}
                        icon={<UserAddOutlined />}
                        data-testid="create-direct-report-button"
                        style={{ borderRadius: 0, border: 'none', width: '100%' }}
                        type="default"
                      >
                        Create new direct report
                      </Button>
                    </Tooltip>,
                  ]
                : undefined
              : undefined
          }
          title={data.title}
          extra={
            <Text strong style={{ ...((selected === true || data.isSearchResult === true) && { color: '#FFF' }) }}>
              {data.classification?.code}
            </Text>
          }
          headStyle={{
            ...((selected === true || data.isSearchResult === true) && {
              backgroundColor: '#003366',
              color: 'white',
            }),
          }}
          size="small"
          style={{
            border: '1px solid #B1B1B7',
            cursor: 'pointer',
            width: '300px',
            minHeight: '10px',
            ...applyDoubleBunkingStyles(data.employees),
          }}
        >
          <Tooltip
            title={
              data.employees.length > 1 ? (
                <>
                  Employees:
                  <br />
                  <ul>
                    {data.employees.map((e: Record<string, string>) => {
                      return <li key={e.id}>{e.name}</li>;
                    })}
                  </ul>
                </>
              ) : null
            }
          >
            {positionIsVacant === true ? (
              <Text type="secondary" strong italic>
                Vacant
              </Text>
            ) : (
              <Text strong>
                {data.employees[0].name}
                {data.employees.length > 1 ? <Text type="secondary"> +{data.employees.length - 1}</Text> : <></>}
              </Text>
            )}
          </Tooltip>
          <Row gutter={8}>
            <Col style={{ flex: 1 }}>Department ID :</Col>
            <Col>{data.department?.id}</Col>
          </Row>
          <Row gutter={8}>
            <Col style={{ flex: 1 }}>Position Number:</Col>
            <Col style={{ flexShrink: 0 }}>{renderPositionNumber(roles, data)}</Col>
          </Row>
        </Card>
        {selected && orgChartType === OrgChartType.DYNAMIC && orgChartContext === OrgChartContext.WIZARD && (
          <div
            style={{
              background: '#F3F3F3',
              border: '1px solid #52C41A',
              borderRadius: '0.25rem',
              margin: '0.25rem 0 0 0',
              padding: '0.25rem',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <CheckCircleFilled style={{ color: '#52C41A' }} /> Selected
          </div>
        )}
        {orgChartType === OrgChartType.READONLY &&
          (data.isNewPosition === true || data.isSupervisor === true || data.isExcludedManager === true) && (
            <div
              style={{
                margin: '0.25rem 0',
                padding: '0.25rem',
                textAlign: 'center',
                width: '100%',
              }}
            >
              {data.isExcludedManager && <Tag color="orange">Excluded Manager</Tag>}
              {data.isSupervisor && <Tag color="green">Supervisor</Tag>}
              {data.isNewPosition === true && <Tag color="blue">New Position</Tag>}
            </div>
          )}
      </div>
      {/* <NodeToolbar isVisible={selected} position={Bottom}></NodeToolbar> */}
      <Handle type="source" position={sourcePosition} isConnectable={isConnectable} />
    </>
  );
};
