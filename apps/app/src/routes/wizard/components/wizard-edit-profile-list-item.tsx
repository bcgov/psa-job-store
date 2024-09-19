/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, List, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import debounce from 'lodash.debounce';
import { useRef } from 'react';
import { Controller, UseFieldArrayRemove, UseFieldArrayUpdate, UseFormReturn, UseFormTrigger } from 'react-hook-form';
import { FormItem } from '../../../utils/FormItem';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import { ContextOptions } from './context-options.component';

export type AllowedFieldNames =
  | 'security_screenings'
  | 'optional_security_screenings'
  | 'accountabilities'
  | 'optional_accountabilities'
  | 'education'
  | 'job_experience'
  | 'professional_registration_requirements'
  | 'optional_professional_registration_requirements'
  | 'preferences'
  | 'knowledge_skills_abilities'
  | 'willingness_statements'
  | 'optional_requirements';

interface FieldItemProps {
  field: any;
  index: number;
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  editedFields?: { [key: number]: boolean };
  setEditedFields?: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
  validateVerification?: () => void;
  fieldName: AllowedFieldNames;
  testId: string;
  label: string;
  handleReset: (index: number) => void;
  handleAddBack: (index: number) => void;
  handleRemove: (index: number) => void;
  confirmRemoveModal?: () => void;
  update: UseFieldArrayUpdate<any, string>;
  onFocus?: (inputRef: any) => void;
  originalFields?: any[];
  isAdmin?: boolean | undefined;
  remove?: UseFieldArrayRemove;
  fields?: Record<'id', string>[];
  trigger?: UseFormTrigger<JobProfileValidationModel>;
}

const WizardEditProfileListItem: React.FC<FieldItemProps> = ({
  field,
  index,
  useFormReturn,
  editedFields,
  setEditedFields,
  validateVerification,
  fieldName,
  testId,
  label,
  handleReset,
  handleAddBack,
  handleRemove,
  confirmRemoveModal,
  onFocus,
  update,
  originalFields,
  isAdmin = undefined,
}) => {
  const inputRef = useRef(null);
  const removeAriaLabel = field.is_readonly
    ? `Cannot remove ${label ?? fieldName} ${index + 1} because field is required`
    : field.disabled
      ? `Undo remove ${label ?? fieldName} ${index + 1}`
      : `Remove ${label ?? fieldName} ${index + 1}`;

  let isEdited = false;
  if (isAdmin === undefined) isEdited = editedFields ? editedFields[index] || field.isCustom : false;
  else isEdited = editedFields ? !isAdmin && (editedFields[index] || field.isCustom) : false;

  const handleFieldChange = debounce((index, updatedValue) => {
    setEditedFields &&
      setEditedFields((prev) => ({ ...prev, [index]: updatedValue !== originalFields?.[index]?.['text'] }));
    useFormReturn.trigger();
  }, 300);

  // let debug = false;
  // if (field.text.startsWith('editable, sig')) {
  //   console.log('field: ', field);
  //   debug = true;
  // }

  // if (!field.id) {
  //   console.log('field does not have id', field);
  // }

  return (
    <List.Item
      style={{
        textDecoration: field.disabled ? 'line-through' : 'none',
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '0px',
        borderBottom: 'none',
      }}
    >
      <FormItem name={`${fieldName}.${index}.disabled`} control={useFormReturn.control} hidden>
        <Input />
      </FormItem>
      <FormItem name={`${fieldName}.${index}.isCustom`} control={useFormReturn.control} hidden>
        <Input />
      </FormItem>
      <FormItem name={`${fieldName}.${index}.is_significant`} control={useFormReturn.control} hidden>
        <Input />
      </FormItem>
      <FormItem name={`${fieldName}.${index}.is_readonly`} control={useFormReturn.control} hidden>
        <Input />
      </FormItem>
      {field.is_readonly && (
        <Typography.Text data-testid={`readonly-${testId}-${index}`} style={{ flex: 1, marginRight: '10px' }}>
          {field['text']}
        </Typography.Text>
      )}

      <Controller
        control={useFormReturn.control}
        name={`${fieldName}.${index}.text`}
        render={({ field: { onChange, onBlur, value } }) => {
          // if (debug) {
          //   console.log('field: ', field, value);
          // }
          // if (fieldName === 'accountabilities') console.log('field: ', field);

          return (
            <>
              <label className="sr-only" htmlFor={field.id}>
                {label ?? fieldName} {index + 1}
              </label>
              <div
                className={`${isEdited && field.is_significant ? 'edited-field-container' : ''} input-container`}
                style={{ display: field.is_readonly ? 'none' : 'block' }}
                // || field.tc_is_readonly
              >
                <TextArea
                  name={`${fieldName}.${index}.text`}
                  ref={inputRef}
                  id={field.id}
                  data-testid={`${testId}-input-${index}`}
                  autoSize
                  disabled={field.disabled || useFormReturn.getValues(`${fieldName}.${index}.is_readonly`)}
                  className={`${field.disabled ? 'strikethrough-textarea' : ''} ${
                    isEdited && field.is_significant ? 'edited-textarea' : ''
                  }`}
                  onChange={(event) => {
                    onChange(event);
                    const updatedValue = event.target.value;
                    handleFieldChange(index, updatedValue);
                  }}
                  onBlur={() => {
                    // console.log('text area onBlur: ', inputRef);

                    // If this is not a custom field and it's now empty,
                    // when user leaves the field, restore the text to original
                    // and mark as disabled. This prevents the issue where
                    // transformFormData automatically removes empty fields and
                    // shifts the order of items, causing diff view corruption.

                    if (!field.isCustom && !value) {
                      setEditedFields && setEditedFields((prev) => ({ ...prev, [index]: true }));

                      update(index, {
                        ...field,
                        text: originalFields?.[index]?.text,
                        disabled: true,
                      });

                      useFormReturn.trigger();
                    }

                    // setTimeout(() => {
                    if (isAdmin === undefined) validateVerification?.();
                    else if (!isAdmin) validateVerification?.();
                    // }, 100);

                    onBlur();
                  }}
                  onFocus={() => {
                    console.log('onFocus, inputRef: ', inputRef);
                    if (isAdmin === undefined) onFocus?.(inputRef);
                    else if (!isAdmin) onFocus?.(inputRef);
                  }}
                  value={value ? (typeof value === 'string' ? value : value.text) : ''}
                />
              </div>
              <ContextOptions
                index={index}
                isReadonly={field.is_readonly}
                isDisabled={field.disabled}
                isCustom={field.isCustom}
                isEdited={(() => {
                  // return editedFields?.[index] ?? false;
                  return value !== originalFields?.[index]?.text;
                })()}
                isSignificant={field.is_significant && !isAdmin}
                removeAriaLabel={removeAriaLabel}
                id={label}
                handleReset={handleReset}
                handleAddBack={handleAddBack}
                handleRemove={handleRemove}
                confirmRemoveModal={confirmRemoveModal}
                focusFallback={`${fieldName}.${index}.text`}
              />
            </>
          );
        }}
      />
    </List.Item>
  );
};

export default WizardEditProfileListItem;
