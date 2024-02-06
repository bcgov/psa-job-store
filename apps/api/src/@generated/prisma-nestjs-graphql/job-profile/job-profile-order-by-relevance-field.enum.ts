import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileOrderByRelevanceFieldEnum {
  owner_id = 'owner_id',
  program_overview = 'program_overview',
  title = 'title',
  overview = 'overview',
  professional_registration_requirements = 'professional_registration_requirements',
  preferences = 'preferences',
  knowledge_skills_abilities = 'knowledge_skills_abilities',
  willingness_statements = 'willingness_statements',
  optional_requirements = 'optional_requirements',
}

registerEnumType(JobProfileOrderByRelevanceFieldEnum, {
  name: 'JobProfileOrderByRelevanceFieldEnum',
  description: undefined,
});
