/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { UseFieldArrayRemove } from 'react-hook-form';
import './wizard-behavioural-comptency-picker.css';
import EditFormOptionsPicker, { SelectableOption } from './wizard-edit-profile-options-picker';

interface WizardPickerProps {
  // style?: CSSProperties;
  fields: any[];
  addAction: (obj: any) => void;
  removeAction: UseFieldArrayRemove;
  data: any;
  triggerValidation?: () => void;
  title: string;
  buttonText: string;
}

const WizardPicker: React.FC<WizardPickerProps> = ({
  fields,
  addAction,
  removeAction,
  data,
  triggerValidation,
  title,
  buttonText,
}) => {
  // Fetching data from the API
  // console.log('data: ', data);

  const [selectableOptions, setSelectableOptions] = useState<SelectableOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // if (log) console.log('fields: ', fields);

  useEffect(() => {
    // if (log) console.log('fields for selectedOptions: ', fields);

    const selectedOptions = fields
      .filter((field) => field.tc_is_readonly)
      .map((field) => {
        // if (log) console.log('field: ', field);
        return field.text;
      });

    const uniqueSelectedOptions = [...new Set(selectedOptions)];

    // console.log('setSelectedOptions: ', uniqueSelectedOptions);
    setSelectedOptions(uniqueSelectedOptions as string[]);
  }, [fields]);

  useEffect(() => {
    if (data) {
      // console.log('building newSelectableOptions, fields: ', fields, data);

      // Generate selectable options based on the current options
      const newSelectableOptions = data
        // .filter((comp: any) => {
        //   // Check if the item exists in the fields array and has readOnly set to false
        //   const include = !fields.find((field) => field.text === comp.text && !field.is_readonly);
        //   // console.log('comp/include: ', comp, include);
        //   // If the item doesn't exist or has readOnly set to true, include it in the selectable options
        //   return include;
        // })
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
    // Create a map of existing fields for quick lookup
    const existingFields = new Map(fields.map((field) => [field.text, field]));

    // Determine which items to keep, add, and their order
    const updatedFields = selectedItems
      .map((text) => {
        const selectedOption = selectableOptions.find((option) => option.value === text);
        if (selectedOption) {
          const existingField = existingFields.get(selectedOption.text);
          if (existingField && existingField.tc_is_readonly) {
            existingFields.delete(selectedOption.text);
            return existingField;
          } else {
            return {
              tc_is_readonly: true,
              text: selectedOption.text,
            };
          }
        }
        return null;
      })
      .filter((item): item is { text: string; tc_is_readonly: boolean } => item !== null);

    // Add non-readonly fields that weren't in selectedItems
    const remainingNonReadonlyFields = Array.from(existingFields.values()).filter((field) => !field.tc_is_readonly);

    // Combine readonly and non-readonly fields
    const finalFields = [...updatedFields, ...remainingNonReadonlyFields];

    // Sort readonly items based on the order in selectableOptions
    finalFields.sort((a, b) => {
      if (a.tc_is_readonly && b.tc_is_readonly) {
        const indexA = selectableOptions.findIndex((option) => option.text === a.text);
        const indexB = selectableOptions.findIndex((option) => option.text === b.text);
        return indexA - indexB;
      }
      return a.tc_is_readonly ? -1 : 1;
    });

    // Remove all existing fields
    removeAction(fields.map((_, index) => index));

    // Add all final fields
    finalFields.forEach((field) => addAction(field));

    triggerValidation?.();
  };

  return (
    <EditFormOptionsPicker
      buttonText={buttonText}
      selectableOptions={selectableOptions}
      title={title}
      selectedOptions={selectedOptions}
      onAdd={onAdd}
    ></EditFormOptionsPicker>
  );
};

export default WizardPicker;
