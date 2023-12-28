import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileContextUpdateInput } from './job-profile-context-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobProfileContextWhereUniqueInput } from './job-profile-context-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileContextArgs {
  @Field(() => JobProfileContextUpdateInput, { nullable: false })
  @Type(() => JobProfileContextUpdateInput)
  data!: JobProfileContextUpdateInput;

  @Field(() => JobProfileContextWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileContextWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileContextWhereUniqueInput, 'id' | 'job_profile_id'>;
}
