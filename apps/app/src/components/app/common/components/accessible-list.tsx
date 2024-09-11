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
      {dataSource.map((item: any, index: any) => {
        const renderedItem = renderItem(item, index);
        // Check if renderedItem is a valid React element
        if (React.isValidElement(renderedItem)) {
          // If it is, clone it and add a key
          return React.cloneElement(renderedItem, { key: item.id || `item-${index}` });
        }
        // If it's not a valid React element, wrap it in a fragment with a key
        return <React.Fragment key={item.id || `item-${index}`}>{renderedItem}</React.Fragment>;
      })}
    </ul>
  </div>
);

export default AccessibleList;
