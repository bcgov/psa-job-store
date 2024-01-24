import { registerEnumType } from '@nestjs/graphql';

export enum PositionRequestScalarFieldEnum {
  id = 'id',
  step = 'step',
  reports_to_position_id = 'reports_to_position_id',
  department_id = 'department_id',
  parent_job_profile_id = 'parent_job_profile_id',
  profile_json = 'profile_json',
  orgchart_json = 'orgchart_json',
  user_id = 'user_id',
  classificationAssignedTo = 'classificationAssignedTo',
  title = 'title',
  position_number = 'position_number',
  classification_id = 'classification_id',
  classification_code = 'classification_code',
  user_name = 'user_name',
  email = 'email',
  submission_id = 'submission_id',
  submitted_at = 'submitted_at',
  approved_at = 'approved_at',
  status = 'status',
  updated_at = 'updated_at',
}

registerEnumType(PositionRequestScalarFieldEnum, { name: 'PositionRequestScalarFieldEnum', description: undefined });
