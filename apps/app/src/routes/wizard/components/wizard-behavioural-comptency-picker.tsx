/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Input, List, Row, Tag, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove, UseFormReturn } from 'react-hook-form';
import LoadingSpinnerWithMessage from '../../../components/app/common/components/loading.component';
import { useGetBehaviouralCompetenciesQuery } from '../../../redux/services/graphql-api/behavioural-comptency.api';
import { BehaviouralCompetency } from '../../../redux/services/graphql-api/job-profile-types';
import { FormItem } from '../../../utils/FormItem';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import { IsIndigenousCompetency } from './is-indigenous-competency.component';
import './wizard-behavioural-comptency-picker.css';
import EditFormOptionsPicker, { OptionsPickerOption, SelectableOption } from './wizard-edit-profile-options-picker';
import WizardValidationError from './wizard-edit-profile-validation-error';

export interface BehaviouralCompetencyData {
  behavioural_competency: BehaviouralCompetency;
  // id: string; // or number if you are using numeric IDs
}

interface BehaviouralComptencyPickerProps {
  // style?: CSSProperties;
  behavioural_competencies_fields: FieldArrayWithId<JobProfileValidationModel, 'behavioural_competencies', 'id'>[];
  addAction: UseFieldArrayAppend<JobProfileValidationModel, 'behavioural_competencies'>;
  removeAction: UseFieldArrayRemove;
  validateFunction: () => void;
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  formErrors: any;
}

const formatEnumString = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b[a-z]/g, (char) => char.toUpperCase());
};

const BehaviouralComptencyPicker: React.FC<BehaviouralComptencyPickerProps> = ({
  behavioural_competencies_fields,
  addAction,
  removeAction,
  validateFunction,
  useFormReturn,
  formErrors,
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
        {option.object.type == 'INDIGENOUS' && <Tag color="blue">Indigenous Relations Behavioural Competencies</Tag>}
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

    validateFunction();
  };

  return (
    <Row justify="start">
      <Col xs={24} sm={24} md={24} lg={18} xl={16}>
        <>
          {behavioural_competencies_fields.length > 0 && (
            <List
              locale={{ emptyText: ' ' }}
              dataSource={behavioural_competencies_fields}
              renderItem={(field, index) => (
                <List.Item
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start', // Align items to the top
                    marginBottom: '0px',
                    borderBottom: 'none',

                    padding: '5px 0',
                  }}
                  key={field.id} // Ensure this is a unique value
                >
                  {/* Display behavioural competency name and description */}
                  <p style={{ flex: 1, marginRight: '10px', marginBottom: 0 }}>
                    <strong>
                      {field.behavioural_competency.name}
                      <IsIndigenousCompetency competency={field.behavioural_competency} />
                    </strong>
                    : {field.behavioural_competency.description}
                  </p>

                  {/* Trash icon/button for deletion */}
                  <Button
                    data-testid={`remove-behavioral-competency-${index}`}
                    type="text" // No button styling, just the icon
                    aria-label={`Remove ${field.behavioural_competency.name} behavioural competency`}
                    icon={<DeleteOutlined aria-hidden />}
                    onClick={() => {
                      removeAction(index);
                    }}
                    style={{
                      marginLeft: '10px',
                      border: '1px solid',
                      borderColor: '#d9d9d9',
                    }}
                  />

                  {/* Hidden fields to submit actual data */}
                  <FormItem
                    name={`behavioural_competencies.${index}.behavioural_competency.id`}
                    control={useFormReturn.control}
                    hidden
                  >
                    <Input />
                  </FormItem>
                  <FormItem
                    hidden
                    name={`behavioural_competencies.${index}.behavioural_competency.name`}
                    control={useFormReturn.control}
                    style={{ flex: 1, marginRight: '10px' }}
                  >
                    <Input placeholder="Name" style={{ width: '100%' }} />
                  </FormItem>
                  <FormItem
                    hidden
                    name={`behavioural_competencies.${index}.behavioural_competency.description`}
                    control={useFormReturn.control}
                    style={{ flex: 2, marginRight: '10px' }}
                  >
                    <TextArea placeholder="Description" style={{ width: '100%' }} />
                  </FormItem>
                </List.Item>
              )}
            />
          )}

          <Typography.Text type="secondary">
            <div style={{ margin: '0.5rem 0' }}>* denotes an Indigenous Relations Behavioural Competency</div>
          </Typography.Text>
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
              'It is highly recommended that there be at least one Indigenous Relations Behavioural Competency in a job profile.'
            }
          ></EditFormOptionsPicker>
        </>

        <WizardValidationError formErrors={formErrors} fieldName="behavioural_competencies" />
      </Col>
    </Row>
  );
};

export default BehaviouralComptencyPicker;
