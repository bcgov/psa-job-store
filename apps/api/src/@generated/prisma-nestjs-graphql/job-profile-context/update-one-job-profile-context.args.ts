import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileContextUpdateInput } from './job-profile-context-update.input';
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
