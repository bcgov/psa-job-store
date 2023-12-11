import { Button, Card, Col, Row, Select, Space } from 'antd';
import React, { CSSProperties, useState } from 'react';
import { useGetBehaviouralCompetenciesQuery } from '../../../redux/services/graphql-api/behavioural-comptency.api';
import { BehaviouralCompetency } from '../../../redux/services/graphql-api/job-profile-types';
import { IsIndigenousCompetency } from './is-indigenous-competency.component';

const { Option } = Select;

// Utility function to format enum strings to a more readable form
const formatEnumString = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b[a-z]/g, (char) => char.toUpperCase());
};

export interface BehaviouralCompetencyData {
  behavioural_competency: BehaviouralCompetency;
  // id: string; // or number if you are using numeric IDs
}

interface BehaviouralComptencyPickerProps {
  onAdd: (competencyData: BehaviouralCompetencyData) => void;
  onCancel: () => void;
  filterIds: number[];
  style?: CSSProperties;
}

const BehaviouralComptencyPicker: React.FC<BehaviouralComptencyPickerProps> = ({
  onAdd,
  onCancel,
  filterIds,
  style,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedName, setSelectedName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Fetching data from the API
  const { data, error, isLoading } = useGetBehaviouralCompetenciesQuery();

  // Handling the dropdown changes
  const handleGroupChange = (value: string) => {
    setSelectedGroup(value);
    setSelectedName(''); // Reset the name selection when group changes
    setDescription(''); // Clear the description when group changes
  };

  const handleNameChange = (value: string) => {
    setSelectedName(value);
    const competency = data?.behaviouralComptencies.find((c) => c.group === selectedGroup && c.name === value);
    setDescription(competency?.description || '');
  };

  // Generate unique group options for the dropdown
  const groupOptions = Array.from(new Set(data?.behaviouralComptencies.map((c) => c.group))).map((group) => (
    <Option key={group} value={group}>
      {formatEnumString(group)}
    </Option>
  ));
  // Generate name options based on the selected group
  const nameOptions = data?.behaviouralComptencies
    .filter((c) => c.group === selectedGroup && !filterIds.includes(c.id))
    .map((competency) => {
      return (
        <Option key={competency.id} value={competency.name}>
          {competency.name}
          <IsIndigenousCompetency competency={competency} />
        </Option>
      );
    });

  const handleAddCompetency = () => {
    // Find the selected competency based on the selectedName
    const selectedCompetency = data?.behaviouralComptencies.find((c) => c.name === selectedName);

    if (selectedCompetency) {
      const newCompetencyData: BehaviouralCompetencyData = {
        behavioural_competency: {
          id: selectedCompetency.id, // Set the id from the selected competency
          name: selectedName,
          description: description,
        },
      };

      onAdd(newCompetencyData);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <div style={{ ...style }}>
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        <Col xs={24} sm={12} lg={12} style={{ paddingRight: '8px' }}>
          {/* Adjust the column span for different screen sizes */}
          <Select
            placeholder="Categories"
            onChange={handleGroupChange}
            style={{ width: '100%' }}
            aria-label="Categories"
          >
            {groupOptions}
          </Select>
        </Col>

        <Col xs={24} sm={24} lg={24} style={{ paddingRight: '8px' }}>
          {/* Adjust the column span for different screen sizes */}
          <Select
            placeholder="Behavioural Competency"
            onChange={handleNameChange}
            disabled={!selectedGroup}
            style={{ width: '100%' }}
            aria-label="Behavioural Competency"
          >
            {nameOptions}
          </Select>
        </Col>
      </Row>

      <Card
        bordered={!!description} // Only show the border when there is a description
        style={{
          backgroundColor: description ? 'white' : '#f0f0f0', // Change background color when active/inactive
          minHeight: '50px',
          margin: '16px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        {description ? (
          <>
            <strong>{selectedName}</strong>: {description}
          </>
        ) : null}
      </Card>

      <Space size="small">
        <Button type="primary" onClick={handleAddCompetency} disabled={!selectedName}>
          Add
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Space>
    </div>
  );
};

export default BehaviouralComptencyPicker;
