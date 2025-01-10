// src/components/job-profile/context-editor/JobContextEditor.tsx
import { Card, Col, Row, Typography } from 'antd';
import DOMPurify from 'dompurify';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import { GetJobProfileResponse } from '../../../redux/services/graphql-api/job-profile-types';
import WizardValidationError from '../../wizard/components/wizard-edit-profile-validation-error';
import QuillEditor from './quill-editor';

interface JobContextEditorProps {
  control: Control<any>;
  isCurrentVersion: boolean;
  jobProfileData?: GetJobProfileResponse;
  triggerBasicDetailsValidation: () => void;
  basicFormErrors: any;
}

export const JobContextEditor: React.FC<JobContextEditorProps> = ({
  control,
  isCurrentVersion,
  jobProfileData,
  triggerBasicDetailsValidation,
  basicFormErrors,
}) => {
  const quillRef = useRef<Quill>(null);

  return (
    <Card title="Job Context" style={{ marginTop: 16 }} bordered={false}>
      <Row justify="start">
        <Col xs={24} sm={24} md={24} lg={18} xl={16}>
          {isCurrentVersion ? (
            <>
              <Controller
                control={control}
                name="jobContext"
                render={({ field: { onChange, onBlur, value } }) => (
                  <QuillEditor
                    ref={quillRef}
                    value={value}
                    onTextChange={() => {
                      const content = quillRef?.current?.root.innerHTML;
                      onChange(content);
                      triggerBasicDetailsValidation();
                    }}
                    onBlur={onBlur}
                    readOnly={false}
                  />
                )}
              />
              <WizardValidationError formErrors={basicFormErrors} fieldName="jobContext" />
            </>
          ) : (
            <Typography.Text>
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    typeof jobProfileData?.jobProfile?.context === 'string'
                      ? jobProfileData?.jobProfile.context
                      : (jobProfileData?.jobProfile.context ?? ''),
                  ),
                }}
              />
            </Typography.Text>
          )}
        </Col>
      </Row>
    </Card>
  );
};
