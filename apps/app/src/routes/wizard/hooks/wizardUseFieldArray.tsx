/* eslint-disable @typescript-eslint/no-explicit-any */
// useAccountabilityFields.ts
import { Modal } from 'antd';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
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
  forceSignificant?: boolean;
}

const useFormFields = ({
  useFormReturn,
  fieldName,
  setEditedFields,
  originalFields,
  significant,
  forceSignificant,
}: UseFormFieldsProps) => {
  const { fields, append, remove, update } = useFieldArray({
    control: useFormReturn.control,
    name: fieldName,
  });

  const handleRemove = (index: number) => {
    const currentValues = useFormReturn.getValues(fieldName);
    if (currentValues[index].isCustom) {
      Modal.confirm({
        title: 'Are you sure you want to delete this item?',
        content: 'This action cannot be undone.',
        onOk: () => {
          // If confirmed, remove the item
          remove(index);
          if ((significant && currentValues[index].is_significant) || forceSignificant)
            setEditedFields && setEditedFields((prev) => ({ ...prev, [index]: false }));
        },
      });
    } else {
      // If it's an original field, mark as disabled
      update(index, { ...currentValues[index], disabled: true });
      if ((significant && currentValues[index].is_significant) || forceSignificant)
        setEditedFields && setEditedFields((prev) => ({ ...prev, [index]: true }));
    }
  };

  const handleAddBack = (index: number) => {
    const currentValues = useFormReturn.getValues(fieldName);
    update(index, { ...currentValues[index], disabled: false });

    if (currentValues[index].is_significant || forceSignificant)
      setEditedFields &&
        setEditedFields((prev) => ({
          ...prev,
          [index]: (currentValues[index] as AccountabilitiesModel)?.text !== originalFields?.[index]?.text,
        }));
  };

  const handleAddNew = () => {
    if (significant || forceSignificant)
      setEditedFields && setEditedFields((prev) => ({ ...prev, [fields.length]: true }));
    append({ text: '', isCustom: true, disabled: false, ...(significant ? { is_significant: true } : {}) });
    useFormReturn.trigger();
  };

  const handleReset = (index: number) => {
    if (significant || forceSignificant) setEditedFields && setEditedFields((prev) => ({ ...prev, [index]: false }));

    const currentValues: TrackedFieldArrayItem[] = useFormReturn.getValues(
      'accountabilities',
    ) as TrackedFieldArrayItem[];
    currentValues[index].text = originalFields?.[index]?.text;
    update(index, {
      text: originalFields?.[index]?.text,
      disabled: false,
      is_readonly: originalFields?.[index]?.is_readonly,
      is_significant: originalFields?.[index]?.is_significant,
    });
  };

  return {
    fields,
    handleRemove,
    handleAddBack,
    handleAddNew,
    handleReset,
  };
};

export default useFormFields;
