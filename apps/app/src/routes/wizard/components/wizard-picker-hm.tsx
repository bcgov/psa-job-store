/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { UseFieldArrayUpdate } from 'react-hook-form';
import './wizard-behavioural-comptency-picker.css';
import EditFormOptionsPicker, { SelectableOption } from './wizard-edit-profile-options-picker';

interface WizardPickerHMProps {
  // style?: CSSProperties;
  fields: any[];
  data: any;
  triggerValidation?: () => void;
  title: string;
  buttonText: string;
  update: UseFieldArrayUpdate<any, string>;
  // log?: boolean;
}

const WizardPickerHM: React.FC<WizardPickerHMProps> = ({
  fields,
  data,
  triggerValidation,
  title,
  buttonText,
  update,
  // log = false,
}) => {
  // Fetching data from the API
  // console.log('data: ', data);

  const [selectableOptions, setSelectableOptions] = useState<SelectableOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // console.log('fields: ', fields);

  useEffect(() => {
    // console.log('fields for selectedOptions: ', fields);

    const selectedOptions = fields
      .filter((field) => !field.disabled)
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
    // // Sort selectedItems based on the order in selectableOptions
    // const sortedSelectedItems = selectableOptions
    //   .filter((option) => selectedItems.includes(option.value))
    //   .map((option) => option.value);

    // // Remove all existing items
    // const allIndexes = fields.map((_, index) => index);
    // removeAction(allIndexes);

    // // Create a new list of items based on the sorted selected items
    // const newItems = sortedSelectedItems
    //   .map((text) => {
    //     const selectedOption = selectableOptions.find((option) => option.value === text);
    //     if (selectedOption) {
    //       const { text } = selectedOption.object;
    //       return { text };
    //     }
    //     return null;
    //   })
    //   .filter((item): item is { text: any } => item !== null);

    // // Add all new items in the correct order
    // newItems.forEach((item) => {
    //   addAction(item);
    // });

    // Update existing fields
    fields.forEach((field, index) => {
      const isSelected = selectedItems.includes(field.text);
      update(index, { ...field, disabled: !isSelected });
    });

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

export default WizardPickerHM;
