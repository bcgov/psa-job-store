import { registerEnumType } from '@nestjs/graphql';

export enum PositionRequestOrderByRelevanceFieldEnum {
  reports_to_position_id = 'reports_to_position_id',
  department_id = 'department_id',
  user_id = 'user_id',
  title = 'title',
  classification_id = 'classification_id',
  classification_code = 'classification_code',
  user_name = 'user_name',
  email = 'email',
  submission_id = 'submission_id',
  shareUUID = 'shareUUID',
  additional_info_work_location_id = 'additional_info_work_location_id',
  additional_info_department_id = 'additional_info_department_id',
  additional_info_excluded_mgr_position_number = 'additional_info_excluded_mgr_position_number',
  additional_info_comments = 'additional_info_comments',
}

registerEnumType(PositionRequestOrderByRelevanceFieldEnum, {
  name: 'PositionRequestOrderByRelevanceFieldEnum',
  description: undefined,
});
