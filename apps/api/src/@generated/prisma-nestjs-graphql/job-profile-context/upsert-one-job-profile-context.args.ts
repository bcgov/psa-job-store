import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileContextCreateInput } from './job-profile-context-create.input';
import { JobProfileContextUpdateInput } from './job-profile-context-update.input';
import { JobProfileContextWhereUniqueInput } from './job-profile-context-where-unique.input';

@ArgsType()
export class UpsertOneJobProfileContextArgs {
  @Field(() => JobProfileContextWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileContextWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileContextWhereUniqueInput, 'id' | 'job_profile_id'>;

  @Field(() => JobProfileContextCreateInput, { nullable: false })
  @Type(() => JobProfileContextCreateInput)
  create!: JobProfileContextCreateInput;

  @Field(() => JobProfileContextUpdateInput, { nullable: false })
  @Type(() => JobProfileContextUpdateInput)
  update!: JobProfileContextUpdateInput;
}
