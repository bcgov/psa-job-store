import { registerEnumType } from '@nestjs/graphql';

export enum PositionRequestScalarFieldEnum {
  id = 'id',
  step = 'step',
  reports_to_position_id = 'reports_to_position_id',
  parent_job_profile_id = 'parent_job_profile_id',
  profile_json = 'profile_json',
  user_id = 'user_id',
  title = 'title',
  position_number = 'position_number',
  classification_id = 'classification_id',
  classification_code = 'classification_code',
  submission_id = 'submission_id',
  status = 'status',
}

registerEnumType(PositionRequestScalarFieldEnum, { name: 'PositionRequestScalarFieldEnum', description: undefined });
