/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckCircleFilled } from '@ant-design/icons';
import { Card, Col, Row, Tag, Tooltip, Typography } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { useTypedSelector } from '../../../redux/redux.hooks';
import { useLazyGetPositionRequestByPositionNumberQuery } from '../../../redux/services/graphql-api/position-request.api';
import { getUserRoles } from '../../../utils/get-user-roles.util';
import { OrgChartContext } from '../enums/org-chart-context.enum';
import { OrgChartType } from '../enums/org-chart-type.enum';
import { Elements } from '../interfaces/elements.interface';
import { CreatePositionButton } from './create-position-button.component';
import './org-chart-node.component.css';
import { ViewPositionButton } from './view-position-button.component';

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
  // For new positions that are created manually in org chart for display purposes
  // show as "proposed". These don't actually exist in PS.
  if (positionData.id === '000000') {
    return <em>Proposed</em>;
  }

  if (roles.includes('classification') || roles.includes('total-compensation')) {
    return positionData.id;
  } else if (roles.includes('hiring-manager') || roles.includes('idir')) {
    // Approved is the PeopleSoft status, for positions which were created outside the Job Store
    // COMPLETED is the Job Store status, for positions which were created inside the Job Store (PS === Active, CRM === Completed)
    // todo - currently the status is always "Approved" - need to do more complex logic involving PR
    // e.g. if PS status is approved, but PR is in review, then don't show the position number
    if (['Approved', 'COMPLETED'].includes(positionData.position_status)) {
      return positionData.id;
    } else {
      return <em>Pending approval</em>;
    }
  }
};

export interface OrgChartNodeProps extends NodeProps {
  orgChartContext?: OrgChartContext;
  orgChartData: Elements;
  orgChartType: OrgChartType;
}

export const OrgChartNode = ({
  data,
  isConnectable,
  selected,
  sourcePosition = Bottom,
  targetPosition = Top,
  orgChartContext,
  orgChartData,
  orgChartType,
}: OrgChartNodeProps) => {
  const auth = useTypedSelector((state) => state.authReducer);
  const positionIsVacant = data.employees.length === 0;

  const roles: string[] = getUserRoles(auth.user);
  const [prTrigger, { isFetching: isLoadingPositionRequest }] = useLazyGetPositionRequestByPositionNumberQuery();

  const checkForPositionRequest = async (positionNumber: string) => {
    if (!isLoadingPositionRequest) {
      const prData = await prTrigger({ positionNumber: positionNumber }).unwrap();
      return prData?.positionRequestByNumber;
    }
  };
  const [positionRequestId, setPositionRequestId] = useState<number | undefined>(undefined);

  // Fetch position request data when the node is selected
  useEffect(() => {
    let isMounted = true;
    const fetchPositionRequest = async () => {
      if (selected) {
        const prId = await checkForPositionRequest(data.id);
        if (isMounted) {
          setPositionRequestId(prId);
        }
      } else {
        // Clear out the stored ID when no longer selected (optional)
        setPositionRequestId(undefined);
      }
    };

    fetchPositionRequest();
    return () => {
      isMounted = false;
    };
  }, [selected, data.id]); // Re-run whenever the selection state changes or the data.id changes

  return (
    <>
      <Handle type="target" position={targetPosition} isConnectable={isConnectable} />
      <div
        className="org-chart-node"
        data-testid={`org-chart-node-${data.id}`}
        tabIndex={0}
        aria-label={`
        Level ${data.level}.
        ${
          positionIsVacant
            ? 'Vacant position'
            : `${data.employees[0].name}${data.employees.length > 1 ? ` and ${data.employees.length - 1} others` : ''}`
        }. 
      ${data.classification?.code} ${data.title}. 
      ${data.directReports ? `${data.directReports} direct reports.` : 'No direct reports'}
      Position Number: ${renderPositionNumber(roles, data)}. 
      Department ID: ${data.department?.id}. 
      ${data.isExcludedManager ? 'Excluded Manager. ' : ''}
      ${data.isSupervisor ? 'Supervisor. ' : ''}
      ${data.isNewPosition ? 'New Position. ' : ''}
    `
          .trim()
          .replace(/\s+/g, ' ')}
        id={`node-${data.id}`}
      >
        <Card
          actions={
            selected && orgChartType === OrgChartType.DYNAMIC
              ? orgChartContext === OrgChartContext.DEFAULT
                ? roles.includes('hiring-manager')
                  ? [
                      <CreatePositionButton
                        departmentId={data.department?.id}
                        elements={orgChartData}
                        supervisorId={data.id}
                      />,
                      <ViewPositionButton positionRequestId={positionRequestId} />,
                      ,
                    ]
                  : // without this select node doesn't fire for some reason, need to render something
                    // otherwise node doesn't get selected properly
                    [<div style={{ display: 'none' }}></div>]
                : undefined
              : undefined
          }
          title={
            // Link for dragon naturally speaking targetting
            <a
              tabIndex={-1}
              role="link"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
              onClick={(e) => e.preventDefault()}
              title={(positionIsVacant ? 'Vacant position' : data.employees[0].name) + ' - ' + data.title}
            >
              <Text
                style={{
                  color:
                    selected === true || data.isNewPosition === true || data.isSearchResult === true ? '#FFF' : '#000',
                }}
              >
                {data.title}
              </Text>
            </a>
          }
          extra={
            <Text
              strong
              style={{
                ...((selected === true || data.isNewPosition === true || data.isSearchResult === true) && {
                  color: '#FFF',
                }),
              }}
            >
              {data.classification?.code}
            </Text>
          }
          headStyle={{
            ...((selected === true || data.isNewPosition === true || data.isSearchResult === true) && {
              backgroundColor: '#003366',
              color: 'white',
            }),
          }}
          size="small"
          style={{
            border: '1px solid #B1B1B7',
            cursor: orgChartType === OrgChartType.DYNAMIC ? 'pointer' : 'grab',
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
