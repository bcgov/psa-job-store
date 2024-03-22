/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './accessible-list.css';

interface AccessibleListProps {
  dataSource: any;
  renderItem: (item: any, index: any) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

const AccessibleList: React.FC<AccessibleListProps> = ({
  dataSource,
  renderItem,
  ariaLabel = 'List',
  className = 'accountabilities-list',
}) => (
  <div className={`ant-list ant-list-split ${className}`}>
    <ul aria-label={ariaLabel} className="ant-list-items" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
      {dataSource.map((item: any, index: any) => renderItem(item, index))}
    </ul>
  </div>
);

export default AccessibleList;
