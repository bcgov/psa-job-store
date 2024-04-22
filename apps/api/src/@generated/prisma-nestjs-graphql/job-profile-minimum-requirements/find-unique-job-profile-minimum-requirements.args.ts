import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileMinimumRequirementsWhereUniqueInput } from './job-profile-minimum-requirements-where-unique.input';

@ArgsType()
export class FindUniqueJobProfileMinimumRequirementsArgs {
  @Field(() => JobProfileMinimumRequirementsWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileMinimumRequirementsWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileMinimumRequirementsWhereUniqueInput, 'id'>;
}
