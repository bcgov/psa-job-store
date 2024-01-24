import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileScalarFieldEnum {
  id = 'id',
  career_group_id = 'career_group_id',
  role_id = 'role_id',
  role_type_id = 'role_type_id',
  scope_id = 'scope_id',
  state = 'state',
  type = 'type',
  updated_at = 'updated_at',
  owner_id = 'owner_id',
  program_overview = 'program_overview',
  review_required = 'review_required',
  title = 'title',
  number = 'number',
  overview = 'overview',
  accountabilities = 'accountabilities',
  requirements = 'requirements',
  professional_registration_requirements = 'professional_registration_requirements',
  preferences = 'preferences',
  knowledge_skills_abilities = 'knowledge_skills_abilities',
  willingness_statements = 'willingness_statements',
  security_screenings = 'security_screenings',
  total_comp_create_form_misc = 'total_comp_create_form_misc',
}

registerEnumType(JobProfileScalarFieldEnum, { name: 'JobProfileScalarFieldEnum', description: undefined });
