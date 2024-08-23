import { Card } from 'antd';
import React from 'react';

interface EmployeeCardProps {
  name: string;
  positionNumber: string;
  classification: string;
  reportCount: number;
}

const TreeCard: React.FC<EmployeeCardProps> = ({ name, positionNumber, classification, reportCount }) => {
  return (
    <Card size="small">
      <p>Name: {name}</p>
      <p>Position Number: {positionNumber}</p>
      <p>Classification: {classification}</p>
      <p>Direct Reports: {reportCount}</p>
    </Card>
  );
};

export default TreeCard;
