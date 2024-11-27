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
      const newSelectableOptions = data.map((comp: any) => ({
        value: comp.text,
        text: comp.text,
        object: comp,
      }));
      // console.log('newSelectableOptions: ', newSelectableOptions);

      setSelectableOptions(newSelectableOptions);
    }
  }, [data, fields]);

  const onAdd = (selectedItems: string[]) => {
    // console.log('onAdd selectedItems: ', selectedItems);
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
