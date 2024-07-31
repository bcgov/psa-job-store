/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, Form, Input, List } from 'antd';
import { UseFormReturn } from 'react-hook-form';
import AccessibleList from '../../../components/app/common/components/accessible-list';
import { FormItem } from '../../../utils/FormItem';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import useFormFields from '../hooks/wizardUseFieldArray';
import { AllowedFieldNames } from './wizard-edit-profile-list-item';

interface OptionalListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  label: string;
  fieldName: AllowedFieldNames;
}

const OptionalList: React.FC<OptionalListProps> = ({ useFormReturn, label, fieldName }) => {
  // const { optionalAccountabilitiesAlertShown, setOptionalAccountabilitiesAlertShown } = useWizardContext();

  const { fields } = useFormFields({
    useFormReturn,
    fieldName: fieldName,
  });

  const anyEnabled = fields.some((field: any) => !field.disabled);

  const renderOptReqFields = (field: any, index: number) => {
    return (
      <>
        <List.Item
          key={field.id}
          style={{
            display: field.disabled ? 'none' : 'flex',
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

          {field.text}
        </List.Item>
      </>
    );
  };

  return (
    <>
      {anyEnabled && (
        <>
          <Divider className="hr-reduced-margin" />
          <Form.Item
            label={label}
            labelCol={{ className: 'card-label' }}
            className="label-only"
            colon={false}
          ></Form.Item>
          <AccessibleList dataSource={fields} renderItem={renderOptReqFields} ariaLabel={label} />
        </>
      )}
    </>
  );
};

export default OptionalList;
