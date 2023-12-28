import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileJobFamilyScalarFieldEnum {
  id = 'id',
  name = 'name',
}

registerEnumType(JobProfileJobFamilyScalarFieldEnum, {
  name: 'JobProfileJobFamilyScalarFieldEnum',
  description: undefined,
});
