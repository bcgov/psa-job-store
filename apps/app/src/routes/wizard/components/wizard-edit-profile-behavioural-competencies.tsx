/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, List, Row, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormItem } from '../../../utils/FormItem';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import { IsIndigenousCompetency } from './is-indigenous-competency.component';
import BehaviouralComptencyPicker2 from './wizard-behavioural-comptency-picker2';
import WizardValidationError from './wizard-edit-profile-validation-error';

interface WizardBehaviouralCompetenciesProps {
  useFormReturn: UseFormReturn<JobProfileValidationModel, any, undefined>;
  originalBehaviouralCompetenciesFields: any[];
  formErrors: any;
}

const WizardBehaviouralCompetencies: React.FC<WizardBehaviouralCompetenciesProps> = ({
  useFormReturn,
  originalBehaviouralCompetenciesFields,
  formErrors,
}) => {
  const {
    fields: behavioural_competencies_fields,
    append: behavioural_competencies_append,
    remove: behavioural_competencies_remove,
    replace: behavioural_competencies_replace,
  } = useFieldArray({
    control: useFormReturn.control,
    name: 'behavioural_competencies',
  });

  return (
    <Card
      title={
        <Row justify="start">
          <Col xs={24} sm={24} md={24} lg={18} xl={16}>
            <span style={{ fontWeight: '600', fontSize: '16px' }}>Behavioural competencies</span>
            <Button
              data-testid={`reset-behavioral-competencies`}
              type="link" // No button styling, just the icon
              aria-label={`Reset all changes`}
              onClick={() => {
                behavioural_competencies_replace(originalBehaviouralCompetenciesFields);
              }}
              style={{ float: 'right' }}
            >
              Reset all changes
            </Button>
          </Col>
        </Row>
      }
      className="custom-card"
      style={{ marginTop: 16 }}
    >
      {/* <Row justify="start">
        <Col xs={24} sm={24} md={24} lg={18} xl={16}>
          <label
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              maxWidth: '100%',
              height: '32px',
              fontWeight: 500,
            }}
            title="Add behavioural competencies"
          >
            Add behavioural competencies
          </label>
        </Col>
      </Row> */}
      <section aria-label="Behavioural competencies" role="region">
        <Row justify="start">
          <Col xs={24} sm={24} md={24} lg={18} xl={16}>
            <>
              {/* <Typography.Text type="secondary">
                * denotes an Indigenous Relations Behavioural Competency
              </Typography.Text> */}
              {/* <div data-testid="behavioral-competencies-selector">
                <BehaviouralComptencyPicker
                  onAdd={behavioural_competencies_append}
                  onRemove={behavioural_competencies_remove}
                  behavioural_competencies_fields={behavioural_competencies_fields}
                />
              </div> */}

              <List
                locale={{ emptyText: ' ' }}
                dataSource={behavioural_competencies_fields}
                renderItem={(field, index) => (
                  <List.Item
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start', // Align items to the top
                      marginBottom: '0px',
                      borderBottom: 'none',

                      padding: '5px 0',
                    }}
                    key={field.id} // Ensure this is a unique value
                  >
                    {/* Display behavioural competency name and description */}
                    <p style={{ flex: 1, marginRight: '10px', marginBottom: 0 }}>
                      <strong>
                        {field.behavioural_competency.name}
                        <IsIndigenousCompetency competency={field.behavioural_competency} />
                      </strong>
                      : {field.behavioural_competency.description}
                    </p>

                    {/* Trash icon/button for deletion */}
                    <Button
                      data-testid={`remove-behavioral-competency-${index}`}
                      type="text" // No button styling, just the icon
                      aria-label={`Remove ${field.behavioural_competency.name} behavioural competency`}
                      icon={<DeleteOutlined aria-hidden />}
                      onClick={() => {
                        behavioural_competencies_remove(index);
                      }}
                      style={{
                        marginLeft: '10px',
                        border: '1px solid',
                        borderColor: '#d9d9d9',
                      }}
                    />

                    {/* Hidden fields to submit actual data */}
                    <FormItem
                      name={`behavioural_competencies.${index}.behavioural_competency.id`}
                      control={useFormReturn.control}
                      hidden
                    >
                      <Input />
                    </FormItem>
                    <FormItem
                      hidden
                      name={`behavioural_competencies.${index}.behavioural_competency.name`}
                      control={useFormReturn.control}
                      style={{ flex: 1, marginRight: '10px' }}
                    >
                      <Input placeholder="Name" style={{ width: '100%' }} />
                    </FormItem>
                    <FormItem
                      hidden
                      name={`behavioural_competencies.${index}.behavioural_competency.description`}
                      control={useFormReturn.control}
                      style={{ flex: 2, marginRight: '10px' }}
                    >
                      <TextArea placeholder="Description" style={{ width: '100%' }} />
                    </FormItem>
                  </List.Item>
                )}
              />

              <Typography.Text type="secondary">
                <div style={{ margin: '0.5rem 0' }}>* denotes an Indigenous Behavioural Competency</div>
              </Typography.Text>

              <BehaviouralComptencyPicker2
                behavioural_competencies_fields={behavioural_competencies_fields}
                addAction={behavioural_competencies_append}
                removeAction={behavioural_competencies_remove}
              ></BehaviouralComptencyPicker2>
            </>

            <WizardValidationError formErrors={formErrors} fieldName="behavioural_competencies" />
          </Col>
        </Row>
      </section>
    </Card>
  );
};

export default WizardBehaviouralCompetencies;
