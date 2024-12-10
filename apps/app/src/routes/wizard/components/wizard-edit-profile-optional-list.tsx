/* eslint-disable @typescript-eslint/no-explicit-any */
import { MinusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, List, Tooltip } from 'antd';
import { UseFormReturn } from 'react-hook-form';
import AccessibleList from '../../../components/app/common/components/accessible-list';
import { FormItem } from '../../../utils/FormItem';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import { AllowedFieldNames } from './wizard-edit-profile-list-item';
import './wizard-edit-profile-optional-list.css';

interface OptionalListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  label: string;
  fieldName: AllowedFieldNames;
  fields: Record<'id', string>[];
  handleRemove: (index: number) => void;
}

const OptionalList: React.FC<OptionalListProps> = ({ useFormReturn, label, fieldName, fields, handleRemove }) => {
  // const { optionalAccountabilitiesAlertShown, setOptionalAccountabilitiesAlertShown } = useWizardContext();

  if (!fields) return null;

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

          <div>{field.text}</div>
          <div>
            <Tooltip title={field.isCustom ? 'Delete' : 'Remove'}>
              <Button
                className="remove-item-btn"
                icon={<MinusCircleOutlined />}
                aria-label={'Remove ' + field.text}
                onClick={() => {
                  handleRemove(index);
                  // isDisabled ? doAction('add') : doAction('remove');
                }}
                style={{ marginLeft: '10px' }}
              />
            </Tooltip>
          </div>
        </List.Item>
      </>
    );
  };

  return (
    <>
      {anyEnabled && (
        <>
          {/* <Divider className="hr-reduced-margin" /> */}
          <div
            style={{ borderLeft: '1px solid #D8D8D8', paddingLeft: '12px', marginBottom: '12px' }}
            className="optionalList"
          >
            <Form.Item
              label={
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#474543' }}>
                  <h4>{label}</h4>
                </span>
              }
              labelCol={{ className: 'card-label' }}
              className="label-only"
              colon={false}
            ></Form.Item>
            <div style={{ paddingLeft: '10px' }}>
              <AccessibleList dataSource={fields} renderItem={renderOptReqFields} ariaLabel={label} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OptionalList;
