/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import './wizard-behavioural-comptency-picker.css';
import EditFormOptionsPicker, { SelectableOption } from './wizard-edit-profile-options-picker';

interface WizardProfessionalRegistrationPickerProps {
  // style?: CSSProperties;
  fields: FieldArrayWithId<JobProfileValidationModel, 'professional_registration_requirements', 'id'>[];
  addAction: UseFieldArrayAppend<JobProfileValidationModel, 'professional_registration_requirements'>;
  removeAction: UseFieldArrayRemove;
  data: any;
  triggerValidation: () => void;
}

const WizardProfessionalRegistrationPicker: React.FC<WizardProfessionalRegistrationPickerProps> = ({
  fields,
  addAction,
  removeAction,
  data,
  triggerValidation,
}) => {
  // Fetching data from the API
  // console.log('data: ', data);

  const [selectableOptions, setSelectableOptions] = useState<SelectableOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // console.log('fields: ', fields);
  useEffect(() => {
    // console.log('fields for selectedOptions: ', fields);
    const selectedOptions = fields
      .filter((field) => field.is_readonly)
      .map((field) => {
        // console.log('field: ', field);
        return field.text;
      });

    const uniqueSelectedOptions = [...new Set(selectedOptions)];

    // console.log('setSelectedOptions: ', uniqueSelectedOptions);
    setSelectedOptions(uniqueSelectedOptions as string[]);
  }, [fields]);

  useEffect(() => {
    if (data) {
      // Generate selectable options based on the current options
      const newSelectableOptions = data.requirementsWithoutReadOnly
        .filter((comp: any) => {
          // Check if the item exists in the fields array and has readOnly set to false
          const existingField = fields.find((field) => field.text === comp.text && !field.is_readonly);
          // If the item doesn't exist or has readOnly set to true, include it in the selectable options
          return !existingField;
        })
        .map((comp: any) => ({
          value: comp.text,
          text: comp.text,
          object: comp,
        }));
      // console.log('newSelectableOptions: ', newSelectableOptions);

      setSelectableOptions(newSelectableOptions);
    }
  }, [data, fields]);

  // if (isLoading) return <LoadingSpinnerWithMessage mode="small" />;
  // if (error) return <p>An error occurred</p>;

  const onAdd = (selectedItems: string[]) => {
    // console.log('onAdd selectedItems: ', selectedItems);
    // console.log('selectableOptions: ', selectableOptions);

    const selectedBehaviouralCompetencies = selectedItems
      .map((text) => {
        const selectedOption = selectableOptions.find((option) => option.value === text);
        if (selectedOption) {
          const { text } = selectedOption.object;
          return {
            is_readonly: true,
            text,
          };
        }
        return null;
      })
      .filter((item) => item !== null);

    // console.log('selectedBehaviouralCompetencies: ', selectedBehaviouralCompetencies);
    // .filter((item): item is AccountabilitiesModel => item !== null);

    // Filter out items that already exist in the fields array
    const newItems = selectedBehaviouralCompetencies
      .filter(
        (item) =>
          !fields.some((field) => {
            // console.log('building newItems, field, item: ', field, item);
            return item && field.text === item.text && field.is_readonly === true;
          }),
      )
      .filter((item): item is { is_readonly: boolean; text: any } => item !== null);

    // console.log('newItems: ', newItems);

    // Remove items that are no longer in the selectedItems array
    const idsToRemove = fields
      .filter((field) => {
        // console.log('building idsToRemove, field, selectedItems: ', field, selectedItems);
        const res = field.is_readonly == true && !selectedItems.includes(field.text?.toString() ?? '');
        return res;
      })
      .map((field) => field.text);

    // console.log('idsToRemove: ', idsToRemove);

    // Convert idsToRemove to an array of indexes
    const indexesToRemove = idsToRemove.map((text) =>
      fields.findIndex((field) => field.is_readonly == true && field.text === text),
    );
    // console.log('indexesToremove: ', indexesToRemove);
    indexesToRemove.length > 0 && removeAction(indexesToRemove);

    // Add the new items
    newItems.forEach((item) => {
      // console.log('addAction: ', item);
      addAction(item);
    });
    triggerValidation();
  };

  return (
    <EditFormOptionsPicker
      buttonText="Browse and add professional registrations and certifications"
      selectableOptions={selectableOptions}
      title="Professional registrations and certifications"
      selectedOptions={selectedOptions}
      onAdd={onAdd}
    ></EditFormOptionsPicker>
  );
};

export default WizardProfessionalRegistrationPicker;
