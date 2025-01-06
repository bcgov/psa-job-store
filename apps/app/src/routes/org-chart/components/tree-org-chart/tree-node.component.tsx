/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircleFilled, DownOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Tooltip } from 'antd';
import React from 'react';
import { usePosition } from '../../../../components/app/common/contexts/position.context';
import { Elements } from '../../interfaces/elements.interface';
import './tree-node.component.css';

interface TreeNodeProps {
  data: any;
  expanded: boolean;
  onExpand: () => void;
  hasChildren: boolean;
  faded: boolean;
  departmentId: string;
  elements: Elements;
  level: number;
  onKeyDown: (event: React.KeyboardEvent) => void;
  highlighted?: boolean;
  onSelect?: (nodeId: string) => void;
  isSelected?: boolean;
  onCollapse?: (nodeId: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  data,
  expanded,
  onExpand,
  hasChildren,
  faded,
  departmentId,
  elements,
  level,
  onKeyDown,
  highlighted,
  onSelect,
  isSelected,
  onCollapse,
}) => {
  // const [isLoading, setIsLoading] = useState(false);

  const { createNewPosition } = usePosition();
  // const { getNodes } = useReactFlow();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(data.id);
    }
    if (onCollapse) {
      onCollapse(data.id);
    }
  };

  const handleCreateNewReport = async () => {
    if (data.data.employees[0]?.name) {
      // setIsLoading(true);
      try {
        // await new Promise((resolve) => setTimeout(resolve, 300));
        // const png = await generatePNGBase64(getNodes);
        await createNewPosition({
          reportingPositionId: data.id as any,
          selectedDepartment: departmentId,
          orgChartData: elements,
          // svg: png,
        });
      } finally {
        // setIsLoading(false);
      }
    }
  };

  return (
    <div className="card-wrapper">
      <Card
        className="tree-node-card"
        style={{
          width: 300,
          marginBottom: '10px',
          opacity: faded ? 0.5 : 1,
          transition: 'opacity 0.3s',
          border: highlighted ? '2px solid #1890ff' : undefined,
          boxShadow: highlighted ? '0 0 10px rgba(24, 144, 255, 0.5)' : undefined,
          cursor: 'pointer',
        }}
        // apply padding only if hasChildren is true
        bodyStyle={{ padding: hasChildren ? '0 32px 0 0' : '0', position: 'relative' }}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={expanded}
        aria-level={level}
        aria-label={`${data.data.title}, ${data.data.employees[0]?.name || 'Vacant'}`}
        onKeyDown={onKeyDown}
        tabIndex={0}
        onClick={handleClick}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
            background: '#FAF9F8',
            padding: '10px',
          }}
        >
          <span
            style={{
              fontWeight: 'bold',
              display: 'inlineBlock',
              flex: 1,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            <Tooltip title={data.data.title}>{data.data.title}</Tooltip>
          </span>
          <span style={{ color: '#474543' }}>{data.data.classification.code}</span>
        </div>
        <div style={{ padding: '0 10px 10px 10px' }}>
          <div style={{ fontWeight: 'bold' }}>{data.data.employees[0]?.name || 'Vacant'}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Position number:</span>
            <span>{data.id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span>Reports:</span>
            <span>{data.children.length}</span>
          </div>
          {!onSelect ? (
            <Button
              type="link"
              icon={<UserOutlined />}
              onClick={handleCreateNewReport}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  e.preventDefault();
                  handleCreateNewReport();
                }
              }}
              style={{ borderRadius: 0, border: 'none', paddingLeft: '0' }}
              tabIndex={-1}
              // loading={isLoading}
            >
              Create new direct report
            </Button>
          ) : (
            isSelected && (
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
            )
          )}
        </div>

        {hasChildren && (
          <Button
            tabIndex={-1}
            type="text"
            icon={expanded ? <RightOutlined /> : <DownOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                e.preventDefault();
                onExpand();
              }
            }}
            style={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              height: '100%',
              padding: 0,
              borderLeft: '1px solid #D8D8D8',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          />
        )}
      </Card>
    </div>
  );
};

export default TreeNode;
