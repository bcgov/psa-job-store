import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamLinkJobProfileIdStreamIdCompoundUniqueInput } from './job-profile-stream-link-job-profile-id-stream-id-compound-unique.input';
import { JobProfileStreamLinkWhereInput } from './job-profile-stream-link-where.input';
import { IntFilter } from '../prisma/int-filter.input';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';
import { JobProfileStreamRelationFilter } from '../job-profile-stream/job-profile-stream-relation-filter.input';

@InputType()
export class JobProfileStreamLinkWhereUniqueInput {
  @Field(() => JobProfileStreamLinkJobProfileIdStreamIdCompoundUniqueInput, { nullable: true })
  jobProfileId_streamId?: JobProfileStreamLinkJobProfileIdStreamIdCompoundUniqueInput;

  @Field(() => [JobProfileStreamLinkWhereInput], { nullable: true })
  AND?: Array<JobProfileStreamLinkWhereInput>;

  @Field(() => [JobProfileStreamLinkWhereInput], { nullable: true })
  OR?: Array<JobProfileStreamLinkWhereInput>;

  @Field(() => [JobProfileStreamLinkWhereInput], { nullable: true })
  NOT?: Array<JobProfileStreamLinkWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  jobProfileId?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  streamId?: IntFilter;

  @Field(() => JobProfileRelationFilter, { nullable: true })
  jobProfile?: JobProfileRelationFilter;

  @Field(() => JobProfileStreamRelationFilter, { nullable: true })
  stream?: JobProfileStreamRelationFilter;
}
