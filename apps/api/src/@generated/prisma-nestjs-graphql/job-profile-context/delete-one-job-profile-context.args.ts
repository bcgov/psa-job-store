import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileContextWhereUniqueInput } from './job-profile-context-where-unique.input';

@ArgsType()
export class DeleteOneJobProfileContextArgs {
  @Field(() => JobProfileContextWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileContextWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileContextWhereUniqueInput, 'id' | 'job_profile_id'>;
}
