import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileMinimumRequirementsScalarFieldEnum {
  id = 'id',
  requirement = 'requirement',
  grade = 'grade',
}

registerEnumType(JobProfileMinimumRequirementsScalarFieldEnum, {
  name: 'JobProfileMinimumRequirementsScalarFieldEnum',
  description: undefined,
});
