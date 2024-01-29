import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileJobFamilyLinkScalarFieldEnum {
  jobProfileId = 'jobProfileId',
  jobFamilyId = 'jobFamilyId',
}

registerEnumType(JobProfileJobFamilyLinkScalarFieldEnum, {
  name: 'JobProfileJobFamilyLinkScalarFieldEnum',
  description: undefined,
});
