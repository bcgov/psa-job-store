import { DescriptionsProps } from 'antd';
import React from 'react';

interface AccessibleDocumentProps {
  items: DescriptionsProps['items'];
}

const AccessibleDocumentFromDescriptions: React.FC<AccessibleDocumentProps> = ({ items }) => {
  if (!items) return null;
  return (
    <div className="accessible-document">
      {items.map((item) => (
        <section key={item.key} className="document-section">
          <div className="section-label">
            {React.isValidElement(item.label) ? item.label : <h3 tabIndex={0}>{item.label}</h3>}
          </div>
          <div className="section-content">
            {React.isValidElement(item.children) ? item.children : <div tabIndex={0}>{item.children}</div>}
          </div>
        </section>
      ))}
    </div>
  );
};

export default AccessibleDocumentFromDescriptions;
