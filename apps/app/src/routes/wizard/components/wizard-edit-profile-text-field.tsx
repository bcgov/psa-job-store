/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Form, Input, Row, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import debounce from 'lodash.debounce';
import { useState } from 'react';
import { Controller, UseFormReturn, UseFormTrigger } from 'react-hook-form';
import { FormItem } from '../../../utils/FormItem';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import { BasicDetailsValidationModel } from '../../total-comp-create-profile/components/total-comp-create-profile.component';

type AllowedFieldNames = 'overview' | 'program_overview' | 'title';

interface SingleTextFieldProps {
  useFormReturn:
    | UseFormReturn<JobProfileValidationModel, any, undefined>
    | UseFormReturn<BasicDetailsValidationModel, any, undefined>;
  name: AllowedFieldNames;
  label: string;
  placeholder?: string;
  isTextArea?: boolean;
  testId: string;
  trigger: UseFormTrigger<JobProfileValidationModel> | UseFormTrigger<BasicDetailsValidationModel>;
  formErrors: any;
  jobTitleWarning?: boolean;
  showCharacterCount?: boolean;
  maxCharacterCount?: number;
  readOnly?: boolean;
}

const WizardTextField: React.FC<SingleTextFieldProps> = ({
  useFormReturn,
  name,
  label,
  placeholder,
  isTextArea = false,
  testId,
  formErrors,
  trigger,
  jobTitleWarning = false,
  showCharacterCount = false,
  maxCharacterCount = -1,
  readOnly = false,
}) => {
  const [currentValue, setCurrentValue] = useState<string>('');
  const [valueOver30, setValueOver30] = useState<boolean>(
    (useFormReturn as UseFormReturn<any, any, undefined>).getValues(`${name}.text`)?.length > 30,
  );

  const handleFieldChange = debounce((event: any) => {
    const updatedValue = event.target.value;
    setValueOver30(() => updatedValue.length > 30);
    setCurrentValue(updatedValue);
    trigger();
  }, 300);

  return (
    <>
      <FormItem
        name={`${name}.disabled`}
        control={(useFormReturn as UseFormReturn<any, any, undefined>).control}
        hidden
      >
        <Input />
      </FormItem>
      <FormItem
        name={`${name}.isCustom`}
        control={(useFormReturn as UseFormReturn<any, any, undefined>).control}
        hidden
      >
        <Input />
      </FormItem>

      <Card title={label} bordered={false} className="custom-card" style={{ marginTop: 16 }}>
        <section aria-label={label} role="region">
          <Row justify="start">
            <Col xs={24} sm={24} md={24} lg={18} xl={16}>
              <Form.Item
                name="confirmation"
                validateStatus={formErrors[name]?.text || (valueOver30 && jobTitleWarning) ? 'error' : ''}
                help={
                  formErrors[name]?.text?.message
                    ? formErrors[name].text.message
                    : valueOver30 && jobTitleWarning
                      ? 'Warning: Job titles over 30 characters will be truncated by PeopleSoft and will appear so in the Organization Chart.'
                      : ''
                }
              >
                <Controller
                  control={(useFormReturn as UseFormReturn<any, any, undefined>).control}
                  name={`${name}.text`}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return readOnly ? (
                      <Typography.Text>{value}</Typography.Text>
                    ) : isTextArea ? (
                      <TextArea
                        data-testid={`${testId}-input`}
                        autoSize
                        onChange={(event) => {
                          handleFieldChange(event);
                          onChange(event);
                        }}
                        value={value}
                        maxLength={maxCharacterCount == -1 ? undefined : maxCharacterCount}
                        placeholder={placeholder}
                        onBlur={onBlur}
                      />
                    ) : (
                      <Input
                        data-testid={`${testId}-input`}
                        placeholder={placeholder}
                        aria-label={label}
                        onBlur={onBlur}
                        value={value}
                        onChange={(event) => {
                          handleFieldChange(event);
                          onChange(event);
                        }}
                      />
                    );
                  }}
                />
              </Form.Item>
              <label className="sr-only" htmlFor={`${name}.text`}>
                {label}
              </label>
              {showCharacterCount && !readOnly && (
                <Typography.Paragraph type="secondary" style={{ textAlign: 'right', width: '100%', margin: '0' }}>
                  {currentValue.length.toString()} / {maxCharacterCount}
                </Typography.Paragraph>
              )}
            </Col>
          </Row>
        </section>
      </Card>
    </>
  );
};

export default WizardTextField;
