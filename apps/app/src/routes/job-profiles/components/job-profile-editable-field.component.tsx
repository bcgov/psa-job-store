import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { ReactNode, useState } from 'react';
import { Control, useWatch } from 'react-hook-form';
import { BehaviouralCompetency } from '../../../redux/services/graphql-api/job-profile.api';
import { JobProfileValidationModel } from './job-profile.component';

type JobProfileFieldValue =
  | string
  | number
  | Array<{ value: string }>
  | Array<{ behavioural_competency: BehaviouralCompetency }>
  | null
  | undefined;

interface EditableFieldProps {
  renderViewMode: (formValue: JobProfileFieldValue) => ReactNode;
  renderEditMode: () => ReactNode;
  control: Control<JobProfileValidationModel>;
  fieldId: keyof JobProfileValidationModel;
}

export const JobProfileEditableField: React.FC<EditableFieldProps> = ({
  renderViewMode,
  renderEditMode,
  control,
  fieldId,
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    setEditMode(false);
  };

  const formValue = useWatch({
    control,
    name: fieldId,
  });

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1, marginRight: '8px', minWidth: 0 }}>
          {editMode ? renderEditMode() : renderViewMode(formValue)}
        </div>
        {editMode ? (
          <Button onClick={handleSave} icon={<CheckOutlined />} />
        ) : (
          <Button onClick={() => setEditMode(true)} icon={<EditOutlined />} />
        )}
      </div>
    </div>
  );
};
