import { Button, Form, Select, Typography } from 'antd';
import React, { useState } from 'react';
import { useGetBehaviouralCompetenciesQuery } from '../../../redux/services/graphql-api/behavioural-comptency.api';
import { BehaviouralCompetency } from '../../../redux/services/graphql-api/job-profile.api';

const { Option } = Select;
const { Paragraph } = Typography;

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
}

const BehaviouralComptencyPicker: React.FC<BehaviouralComptencyPickerProps> = ({ onAdd, onCancel }) => {
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
    .filter((c) => c.group === selectedGroup)
    .map((competency) => (
      <Option key={competency.id} value={competency.name}>
        {competency.name}
      </Option>
    ));

  const handleAddCompetency = () => {
    const newCompetencyData: BehaviouralCompetencyData = {
      behavioural_competency: {
        id: Date.now(), // Replace with actual ID assignment logic
        name: selectedName,
        description: description,
      },
      // id: uuidv4(), // Generate a UUID for the outer object's ID
    };

    onAdd(newCompetencyData);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <>
      <Form.Item label="Categories">
        <Select placeholder="Select a category" onChange={handleGroupChange} value={selectedGroup}>
          {groupOptions}
        </Select>
      </Form.Item>

      <Form.Item label="Behavioural Competency">
        <Select
          placeholder="Select a competency"
          onChange={handleNameChange}
          value={selectedName}
          disabled={!selectedGroup} // Disable this select when no group is selected
        >
          {nameOptions}
        </Select>
      </Form.Item>

      <Paragraph>{description}</Paragraph>

      <Button type="primary" onClick={handleAddCompetency} disabled={!selectedName}>
        Add
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
    </>
  );
};

export default BehaviouralComptencyPicker;
