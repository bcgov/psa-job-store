/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import LoadingSpinnerWithMessage from '../../../components/app/common/components/loading.component';
import { useGetBehaviouralCompetenciesQuery } from '../../../redux/services/graphql-api/behavioural-comptency.api';
import { BehaviouralCompetency } from '../../../redux/services/graphql-api/job-profile-types';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import './wizard-behavioural-comptency-picker.css';
import EditFormOptionsPicker, { OptionsPickerOption, SelectableOption } from './wizard-edit-profile-options-picker';

export interface BehaviouralCompetencyData {
  behavioural_competency: BehaviouralCompetency;
  // id: string; // or number if you are using numeric IDs
}

interface BehaviouralComptencyPickerProps {
  // style?: CSSProperties;
  behavioural_competencies_fields: FieldArrayWithId<JobProfileValidationModel, 'behavioural_competencies', 'id'>[];
  addAction: UseFieldArrayAppend<JobProfileValidationModel, 'behavioural_competencies'>;
  removeAction: UseFieldArrayRemove;
}

const formatEnumString = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b[a-z]/g, (char) => char.toUpperCase());
};

const BehaviouralComptencyPicker2: React.FC<BehaviouralComptencyPickerProps> = ({
  behavioural_competencies_fields,
  addAction,
  removeAction,
}) => {
  // Fetching data from the API
  const { data, error, isLoading } = useGetBehaviouralCompetenciesQuery();
  const [options, setOptions] = useState<OptionsPickerOption[]>([]);
  const [selectableOptions, setSelectableOptions] = useState<SelectableOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    setSelectedOptions(
      behavioural_competencies_fields.map((field) => {
        return field.behavioural_competency.id.toString();
      }),
    );
  }, [behavioural_competencies_fields]);

  useEffect(() => {
    if (data) {
      // Get unique categories from the behavioural competencies
      const categories = Array.from(new Set(data.behaviouralComptencies.map((comp) => comp.category)));

      // Generate options based on the unique categories
      const newOptions = categories.map((category) => ({
        label: formatEnumString(category),
        value: category,
        type: 'category',
      }));
      setOptions(newOptions);

      // Generate selectable options based on the current options
      const newSelectableOptions = data.behaviouralComptencies.map((comp) => ({
        searchText: comp.name + ' ' + comp.description,
        value: comp.id.toString(),
        object: comp,
      }));
      setSelectableOptions(newSelectableOptions);
    }
  }, [data]);

  if (isLoading) return <LoadingSpinnerWithMessage mode="small" />;
  if (error) return <p>An error occurred</p>;

  const renderOption = (option: SelectableOption) => {
    return (
      <div>
        <strong>{option.object.name}</strong>
        <div>{option.object.description}</div>
      </div>
    );
  };

  const renderOptionExtra = (option: SelectableOption) => {
    return (
      <div style={{ marginBottom: '0.5rem' }}>
        <Tag>{formatEnumString(option.object.category)}</Tag>
        {option.object.type == 'INDIGENOUS' && <Tag color="blue">Indigenous Behavioural Competency</Tag>}
      </div>
    );
  };

  const onAdd = (selectedItems: string[]) => {
    const selectedBehaviouralCompetencies = selectedItems
      .map((id) => {
        const selectedOption = selectableOptions.find((option) => option.value === id);
        if (selectedOption) {
          const { id, name, description } = selectedOption.object;
          return {
            behavioural_competency: {
              id: parseInt(id),
              name,
              description,
            },
          };
        }
        return null;
      })
      .filter((item): item is { behavioural_competency: BehaviouralCompetency } => item !== null);

    // Remove all existing items by index
    removeAction();

    // Add the new items
    selectedBehaviouralCompetencies.forEach((item) => {
      addAction(item);
    });
  };

  return (
    <EditFormOptionsPicker
      renderOption={renderOption}
      renderOptionExtra={renderOptionExtra}
      filterOptions={options}
      buttonText="Browse and add behavioural competencies"
      selectableOptions={selectableOptions}
      title="Behavioural competencies"
      selectedOptions={selectedOptions}
      onAdd={onAdd}
      infoContent={
        'It is highly recommended that there be at least one Indigenous Behavioural Competency in a job profile.'
      }
    ></EditFormOptionsPicker>
  );
};

export default BehaviouralComptencyPicker2;
