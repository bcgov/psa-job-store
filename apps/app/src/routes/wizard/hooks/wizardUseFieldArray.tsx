/* eslint-disable @typescript-eslint/no-explicit-any */
// useAccountabilityFields.ts
import { Modal } from 'antd';
import { useRef } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { AccountabilitiesModel, TrackedFieldArrayItem } from '../../../redux/services/graphql-api/job-profile-types';

interface UseFormFieldsProps {
  useFormReturn: UseFormReturn<any>;
  setEditedFields?: React.Dispatch<
    React.SetStateAction<{
      [key: number]: boolean;
    }>
  >;
  originalFields?: any[];
  fieldName: string;
  significant?: true | undefined;
  significant_add?: boolean | undefined;
  sectionSignificant?: boolean;
}

const useFormFields = ({
  useFormReturn,
  fieldName,
  setEditedFields,
  originalFields,
  significant,
  significant_add = true,
  sectionSignificant = true,
}: UseFormFieldsProps) => {
  const { fields, append, remove, update } = useFieldArray({
    control: useFormReturn.control,
    name: fieldName,
  });
  const newFieldIndexRef = useRef<number | null>(null);

  const handleRemove = (index: number) => {
    const currentValues = useFormReturn.getValues(fieldName);
    if (currentValues[index].isCustom) {
      Modal.confirm({
        title: 'Are you sure you want to delete this item?',
        content: 'This action cannot be undone.',
        onOk: () => {
          // If confirmed, remove the item
          remove(index);
          if (significant && currentValues[index].is_significant && sectionSignificant)
            setEditedFields && setEditedFields((prev) => ({ ...prev, [index]: false }));
        },
      });
    } else {
      // If it's an original field, mark as disabled
      update(index, { ...currentValues[index], disabled: true });
      if (significant && currentValues[index].is_significant && sectionSignificant)
        setEditedFields && setEditedFields((prev) => ({ ...prev, [index]: true }));
    }
  };

  const handleAddBack = (index: number) => {
    const currentValues = useFormReturn.getValues(fieldName);
    update(index, { ...currentValues[index], disabled: false });

    if (currentValues[index].is_significant && sectionSignificant)
      setEditedFields &&
        setEditedFields((prev) => ({
          ...prev,
          [index]: (currentValues[index] as AccountabilitiesModel)?.text !== originalFields?.[index]?.text,
        }));
  };

  const handleAddNew = () => {
    // When adding a new item, mark it for verification if it's significant
    // The section significance flag should not affect the verification of existing items
    if (significant && significant_add)
      setEditedFields && setEditedFields((prev) => ({ ...prev, [fields.length]: true }));
    
    append({
      text: '',
      isCustom: true,
      disabled: false,
      ...(significant && significant_add ? { is_significant: true } : {}),
    });
    newFieldIndexRef.current = fields.length;
    useFormReturn.trigger();
    setTimeout(function () {
      setFocusOnNewField();
    }, 0);
  };

  const setFocusOnNewField = () => {
    if (newFieldIndexRef.current !== null) {
      const inputElement = document.querySelector(`[name="${fieldName}.${newFieldIndexRef.current}.text"]`);
      if (inputElement) {
        (inputElement as HTMLInputElement).focus();
        newFieldIndexRef.current = null;
      }
    }
  };

  const handleReset = (index: number) => {
    // console.log('wizardUseFiledArray: handleReset: ', index, originalFields?.[index]);
    setEditedFields && setEditedFields((prev) => ({ ...prev, [index]: false }));
    const currentValues: TrackedFieldArrayItem[] = useFormReturn.getValues(fieldName) as TrackedFieldArrayItem[];
    currentValues[index].text = originalFields?.[index]?.text;
    // console.log('handle reset: ', index, originalFields?.[index]?.text);
    // update for some reason doesn't update the value in the text box
    update(index, {
      text: originalFields?.[index]?.text,
      disabled: false,
      is_readonly: originalFields?.[index]?.is_readonly,
      is_significant: originalFields?.[index]?.is_significant,
    });
    // useFormReturn.setValue(`${fieldName}.${index}.text`, originalFields?.[index]?.text);
    // useFormReturn.setValue(`${fieldName}.${index}.disabled`, false);
    // useFormReturn.setValue(`${fieldName}.${index}.is_readonly`, originalFields?.[index]?.is_readonly);
    // useFormReturn.setValue(`${fieldName}.${index}.is_significant`, originalFields?.[index]?.is_significant);
  };

  return {
    fields,
    handleRemove,
    handleAddBack,
    handleAddNew,
    handleReset,
    remove,
    append,
    update,
  };
};

export default useFormFields;
