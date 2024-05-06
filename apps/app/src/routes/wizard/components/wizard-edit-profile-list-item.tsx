/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, List, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import debounce from 'lodash.debounce';
import { Controller, UseFormReturn } from 'react-hook-form';
import { FormItem } from '../../../utils/FormItem';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import { ContextOptions } from './context-options.component';

export type AllowedFieldNames =
  | 'security_screenings'
  | 'accountabilities'
  | 'education'
  | 'job_experience'
  | 'professional_registration_requirements'
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
  validateVerification: () => void;
  fieldName: AllowedFieldNames;
  testId: string;
  label?: string;
  handleReset: (index: number) => void;
  handleAddBack: (index: number) => void;
  handleRemove: (index: number) => void;
  confirmRemoveModal?: () => void;
  onFocus?: () => void;
  originalFields: any[];
  forceSignificant?: boolean;
  isAdmin?: boolean | undefined;
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
  forceSignificant = false,
  isAdmin = undefined,
}) => {
  const ariaLabel = field.disabled
    ? `Undo remove ${label ?? fieldName} ${index + 1}`
    : `Remove ${label ?? fieldName} ${index + 1}`;

  let isEdited = false;
  if (isAdmin === undefined) isEdited = editedFields ? editedFields[index] || field.isCustom : false;
  else isEdited = editedFields ? !isAdmin && (editedFields[index] || field.isCustom) : false;

  const handleFieldChange = debounce((index, updatedValue) => {
    if (field.is_significant || forceSignificant)
      setEditedFields &&
        setEditedFields((prev) => ({ ...prev, [index]: updatedValue !== originalFields[index]?.['text'] }));
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

      {field.is_readonly && (
        <Typography.Text data-testid={`readonly-${testId}-${index}`} style={{ flex: 1, marginRight: '10px' }}>
          {field['text']}
        </Typography.Text>
      )}

      <Controller
        control={useFormReturn.control}
        name={`${fieldName}.${index}.text`}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <label className="sr-only" htmlFor={field.id}>
              {ariaLabel} {index + 1}
            </label>
            <div
              className={`${isEdited ? 'edited-field-container' : ''} input-container`}
              style={{ display: field.is_readonly ? 'none' : 'block' }}
            >
              <TextArea
                id={field.id}
                data-testid={`${testId}-input-${index}`}
                autoSize
                disabled={field.disabled || useFormReturn.getValues(`${fieldName}.${index}.is_readonly`)}
                className={`${field.disabled ? 'strikethrough-textarea' : ''} ${isEdited ? 'edited-textarea' : ''}`}
                onChange={(event) => {
                  onChange(event);
                  const updatedValue = event.target.value;
                  handleFieldChange(index, updatedValue);
                }}
                onBlur={() => {
                  if (isAdmin === undefined) validateVerification();
                  else if (!isAdmin) validateVerification();
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
        )}
      />

      <ContextOptions
        index={index}
        isReadonly={field.is_readonly}
        isDisabled={field.disabled}
        isCustom={field.isCustom}
        isEdited={(() => {
          if (isAdmin === undefined) return editedFields?.[index] ?? false;
          else if (!isAdmin) return editedFields?.[index] ?? false;
          else return false;
        })()}
        ariaLabel={ariaLabel}
        testId={testId}
        handleReset={handleReset}
        handleAddBack={handleAddBack}
        handleRemove={handleRemove}
        confirmRemoveModal={confirmRemoveModal}
      />
    </List.Item>
  );
};

export default WizardEditProfileListItem;
