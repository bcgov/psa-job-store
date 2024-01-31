import { registerEnumType } from '@nestjs/graphql';

export enum JobProfileStreamLinkScalarFieldEnum {
  jobProfileId = 'jobProfileId',
  streamId = 'streamId',
}

registerEnumType(JobProfileStreamLinkScalarFieldEnum, {
  name: 'JobProfileStreamLinkScalarFieldEnum',
  description: undefined,
});
