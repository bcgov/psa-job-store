/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, List, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import debounce from 'lodash.debounce';
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
  label?: string;
  handleReset: (index: number) => void;
  handleAddBack: (index: number) => void;
  handleRemove: (index: number) => void;
  confirmRemoveModal?: () => void;
  onFocus?: () => void;
  originalFields?: any[];
  isAdmin?: boolean | undefined;
  update?: UseFieldArrayUpdate<any, string>;
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
  originalFields,
  isAdmin = undefined,
  update,
}) => {
  const ariaLabel = field.disabled
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

  return (
    <List.Item
      key={field.id}
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
      {/* <FormItem name={`${fieldName}.${index}.tc_is_readonly`} control={useFormReturn.control} hidden>
        <Input />
      </FormItem> */}

      {/* || field.tc_is_readonly */}
      {field.is_readonly && (
        <Typography.Text data-testid={`readonly-${testId}-${index}`} style={{ flex: 1, marginRight: '10px' }}>
          {field['text']}
        </Typography.Text>
      )}

      <Controller
        control={useFormReturn.control}
        name={`${fieldName}.${index}.text`}
        render={({ field: { onChange, onBlur, value } }) => {
          // if (fieldName === 'accountabilities') console.log('field: ', field);

          return (
            <>
              <label className="sr-only" htmlFor={field.id}>
                {ariaLabel} {index + 1}
              </label>
              <div
                className={`${isEdited && field.is_significant ? 'edited-field-container' : ''} input-container`}
                style={{ display: field.is_readonly ? 'none' : 'block' }}
                // || field.tc_is_readonly
              >
                <TextArea
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
                    // If this is not a custom field and it's now empty,
                    // when user leaves the field, restore the text to original
                    // and mark as disabled. This prevents the issue where
                    // transformFormData automatically removes empty fields and
                    // shifts the order of items, causing diff view corruption.

                    if (!field.isCustom && !value) {
                      // set the value from originalFields?.[index]?.['text']
                      // onChange(originalFields?.[index]?.['text']);
                      setEditedFields && setEditedFields((prev) => ({ ...prev, [index]: true }));
                      // set disabled to true
                      update?.(index, {
                        ...field,
                        text: originalFields?.[index]?.['text'],
                        disabled: true,
                      });
                      useFormReturn.trigger();
                    }

                    if (isAdmin === undefined) validateVerification?.();
                    else if (!isAdmin) validateVerification?.();
                    onBlur();
                  }}
                  onFocus={() => {
                    if (isAdmin === undefined) onFocus?.();
                    else if (!isAdmin) onFocus?.();
                  }}
                  value={value ? (typeof value === 'string' ? value : value.text) : ''}
                />
              </div>
            </>
          );
        }}
      />

      {/* {field.tc_is_readonly ? (
        <ContextOptionsReadonly
          isReadonly={field.tc_is_readonly ?? false}
          onEdit={() => {
            update?.(index, {
              ...fields?.[index],
              tc_is_readonly: false,
              // isCustom: true,
            });
          }}
          onRemove={() => {
            remove?.(index);
            trigger?.();
          }}
        />
      ) : ( */}
      <ContextOptions
        index={index}
        isReadonly={field.is_readonly}
        isDisabled={field.disabled}
        isCustom={field.isCustom}
        isEdited={(() => {
          return editedFields?.[index] ?? false;
        })()}
        ariaLabel={ariaLabel}
        testId={testId}
        handleReset={handleReset}
        handleAddBack={handleAddBack}
        handleRemove={handleRemove}
        confirmRemoveModal={confirmRemoveModal}
      />
      {/* )} */}
    </List.Item>
  );
};

export default WizardEditProfileListItem;
