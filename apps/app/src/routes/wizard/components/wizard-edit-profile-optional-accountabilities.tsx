/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, List, Tooltip, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller, UseFormReturn } from 'react-hook-form';
import AccessibleList from '../../../components/app/common/components/accessible-list';
import { FormItem } from '../../../utils/FormItem';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import useFormFields from '../hooks/wizardUseFieldArray';

interface OptionalAccountabilitiesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  validateVerification: () => void;
}

const OptionalAccountabilities: React.FC<OptionalAccountabilitiesProps> = ({ useFormReturn, validateVerification }) => {
  // const { optionalAccountabilitiesAlertShown, setOptionalAccountabilitiesAlertShown } = useWizardContext();

  const { fields, handleRemove, handleAddBack } = useFormFields({
    useFormReturn,
    fieldName: 'optional_accountabilities',
  });

  // const {
  //   fields: acc_opt_fields,
  //   append: acc_opt_append,
  //   remove: acc_opt_remove,
  //   update: acc_opt_update,
  // } = useFieldArray({
  //   control: useFormReturn.control,
  //   name: 'optional_accountabilities',
  // });

  // Function to handle adding a new field
  // const handleOptReqAddNew = () => {
  //   acc_opt_append({ text: '', isCustom: true, disabled: false });
  //   useFormReturn.trigger();
  // };

  // const [editedOptReqFields, setEditedOptReqFields] = useState<{ [key: number]: boolean }>({});

  // const handleOptReqRemove = (index: number) => {
  //   const currentValues = useFormReturn.getValues('optional_accountabilities');
  //   if ((currentValues[index] as TrackedFieldArrayItem).isCustom) {
  //     // If it's a custom field, remove it from the form
  //     Modal.confirm({
  //       title: 'Are you sure you want to delete this item?',
  //       content: 'This action cannot be undone.',
  //       onOk: () => {
  //         // If confirmed, remove the item
  //         acc_opt_remove(index);
  //       },
  //     });
  //   } else {
  //     // If it's an original field, mark as disabled
  //     acc_opt_update(index, { ...(currentValues[index] as TrackedFieldArrayItem), disabled: true });
  //   }
  // };

  // Function to add back a removed field
  // const handleOptReqAddBack = (index: number) => {
  //   const currentValues = useFormReturn.getValues('optional_accountabilities');
  //   acc_opt_update(index, { ...currentValues[index], disabled: false });
  // };

  const renderOptReqFields = (field: any, index: number) => {
    // const handleFieldChange = debounce((index, updatedValue) => {
    // setEditedOptReqFields((prev) => ({ ...prev, [index]: updatedValue !== originalOptReqFields[index]?.value }));
    //   trigger();
    // }, 300);

    const icon = field.disabled ? (
      <PlusOutlined style={{ color: '#000000' }} />
    ) : (
      <DeleteOutlined style={field.is_readonly ? {} : { color: '#000000' }} />
    );
    const ariaLabel = field.disabled
      ? `Undo remove optional accountability ${index + 1}: ${field.text ?? ''}`
      : `Remove optional accountability ${index + 1} : ${field.text ?? ''}`;
    const tooltipTitle = field.is_readonly ? 'Required' : '';
    return (
      <>
        {/* <div aria-live="polite" className="sr-only">
          {ariaLabel}
        </div> */}
        <List.Item
          key={field.id}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '0px',
            borderBottom: 'none',
          }}
        >
          <FormItem name={`optional_accountabilities.${index}.disabled`} control={useFormReturn.control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`optional_accountabilities.${index}.isCustom`} control={useFormReturn.control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`optional_accountabilities.${index}.is_significant`} control={useFormReturn.control} hidden>
            <Input />
          </FormItem>
          <FormItem name={`optional_accountabilities.${index}.is_readonly`} control={useFormReturn.control} hidden>
            <Input />
          </FormItem>
          {!field.isCustom && (
            <Controller
              control={useFormReturn.control}
              name={`optional_accountabilities.${index}.disabled`}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <Checkbox
                      data-testid={`optional-accountability-checkbox-${index}`}
                      className="multiline-checkbox"
                      aria-label={ariaLabel}
                      checked={!value}
                      onChange={(e) => {
                        onChange(!e.target.checked);
                      }}
                      style={{ marginRight: '10px' }}
                    >
                      {field.text}
                    </Checkbox>
                  </>
                );
              }}
            />
          )}
          <Controller
            control={useFormReturn.control}
            name={`optional_accountabilities.${index}.text`}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <label className="sr-only" htmlFor={field.id}>
                  Custom optional accountability {index + 1}
                </label>
                {field.isCustom ? (
                  <div className={`edited-field-container input-container`}>
                    <TextArea
                      id={field.id}
                      autoSize
                      data-testid={`optional-accountability-input-${index}`}
                      style={{
                        display: field.isCustom ? 'block' : 'none',
                      }}
                      className="edited-textarea"
                      disabled={
                        field.disabled || useFormReturn.getValues(`optional_accountabilities.${index}.is_readonly`)
                      }
                      onChange={(event) => {
                        onChange(event);
                        // const updatedValue = event.target.value;
                        // handleFieldChange(index, updatedValue);
                      }}
                      onBlur={() => {
                        validateVerification();
                        onBlur();
                      }}
                      value={value ? (typeof value === 'string' ? value : value.text) : ''}
                    />
                  </div>
                ) : (
                  <TextArea
                    id={field.id}
                    autoSize
                    data-testid={`optional-accountability-input-${index}`}
                    style={{
                      display: field.isCustom ? 'block' : 'none',
                      marginLeft: field.isCustom ? '20px' : '0',
                    }}
                    disabled={
                      field.disabled || useFormReturn.getValues(`optional_accountabilities.${index}.is_readonly`)
                    }
                    onChange={(event) => {
                      onChange(event);
                      // const updatedValue = event.target.value;
                      // handleFieldChange(index, updatedValue);
                    }}
                    onBlur={() => {
                      validateVerification();
                      onBlur();
                    }}
                    value={value ? (typeof value === 'string' ? value : value.text) : ''}
                  />
                )}
              </>
            )}
          />
          {field.isCustom && (
            <Tooltip title={tooltipTitle} overlayStyle={!field.is_readonly ? { display: 'none' } : undefined}>
              <Button
                data-testid={`remove-optional-accountability-${index}`}
                className="remove-item-btn"
                icon={icon}
                aria-label={ariaLabel}
                onClick={() => {
                  field.disabled ? handleAddBack(index) : handleRemove(index);
                }}
                disabled={field.is_readonly}
                style={{ marginLeft: '10px' }}
              />
            </Tooltip>
          )}
        </List.Item>
      </>
    );
  };

  return (
    <>
      {fields.length > 0 && (
        <>
          <Form.Item
            label="Optional accountabilities"
            labelCol={{ className: 'card-label' }}
            className="label-only"
            colon={false}
          ></Form.Item>
          <Typography.Paragraph type="secondary">Choose from optional accountabilities.</Typography.Paragraph>
          <>
            <AccessibleList dataSource={fields} renderItem={renderOptReqFields} ariaLabel="Optional Accountabilities" />
          </>
        </>
      )}
    </>
  );
};

export default OptionalAccountabilities;
