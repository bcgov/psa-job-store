import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileBehaviouralCompetencyScalarFieldEnum {
  behavioural_competency_id = 'behavioural_competency_id',
  job_profile_id = 'job_profile_id',
}

registerEnumType(JobProfileBehaviouralCompetencyScalarFieldEnum, {
  name: 'JobProfileBehaviouralCompetencyScalarFieldEnum',
  description: undefined,
});
