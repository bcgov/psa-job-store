/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Card, Col, Flex, Row, Tooltip, Typography } from 'antd';
import { CSSProperties } from 'react';
import { useAuth } from 'react-oidc-context';
import { Handle, NodeProps, Position } from 'reactflow';

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

export const OrgChartNode = ({
  data,
  isConnectable,
  selected,
  sourcePosition = Bottom,
  targetPosition = Top,
  ...rest
}: NodeProps) => {
  const auth = useAuth();
  const positionIsVacant = data.employees.length === 0;

  const roles: string[] = auth.user?.profile['client_roles'] as string[];

  return (
    <>
      <Handle type="target" position={targetPosition} isConnectable={isConnectable} />
      <div>
        <Card
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
            <Col>{data.department.id}</Col>
          </Row>
          <Row gutter={8}>
            <Col style={{ flex: 1 }}>Position Number:</Col>
            <Col style={{ flexShrink: 0 }}>{renderPositionNumber(roles, data)}</Col>
          </Row>
        </Card>
        {selected && (
          <div style={{ marginTop: '0.25rem' }}>
            <Flex justify="space-between" gap="small" style={{ width: '100%' }}>
              <Tooltip
                title={
                  positionIsVacant ? "You can't create a new position which reports to a vacant position." : undefined
                }
              >
                <Button
                  // onClick={createDirectReport}
                  disabled={positionIsVacant}
                  icon={<UserAddOutlined />}
                  data-testid="create-direct-report-button"
                  style={{ width: '100%' }}
                  type="default"
                >
                  Create new direct report
                </Button>
              </Tooltip>
            </Flex>
          </div>
        )}
      </div>
      {/* <NodeToolbar isVisible={selected} position={Bottom}></NodeToolbar> */}
      <Handle type="source" position={sourcePosition} isConnectable={isConnectable} />
    </>
  );
};
