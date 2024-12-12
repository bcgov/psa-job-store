/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Row } from 'antd';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import BehaviouralComptencyPicker from './wizard-behavioural-comptency-picker';

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
    move: behavioural_competencies_move,
  } = useFieldArray({
    control: useFormReturn.control,
    name: 'behavioural_competencies',
  });

  return (
    <Card
      title={
        <Row justify="start">
          <Col xs={24} sm={24} md={24} lg={18} xl={16}>
            <h3 style={{ display: 'inline' }}>Behavioural competencies</h3>
            <Button
              data-testid={`reset-behavioral-competencies`}
              type="link" // No button styling, just the icon
              aria-label={`Reset all behavioural competency changes`}
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
      <section aria-label="Behavioural competencies" role="region">
        <BehaviouralComptencyPicker
          behavioural_competencies_fields={behavioural_competencies_fields}
          addAction={behavioural_competencies_append}
          removeAction={behavioural_competencies_remove}
          moveAction={behavioural_competencies_move}
          validateFunction={useFormReturn.trigger}
          useFormReturn={useFormReturn}
          formErrors={formErrors}
        ></BehaviouralComptencyPicker>
      </section>
    </Card>
  );
};

export default WizardBehaviouralCompetencies;
