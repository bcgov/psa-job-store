import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileMinimumRequirementsUpdateInput } from './job-profile-minimum-requirements-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobProfileMinimumRequirementsWhereUniqueInput } from './job-profile-minimum-requirements-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileMinimumRequirementsArgs {
  @Field(() => JobProfileMinimumRequirementsUpdateInput, { nullable: false })
  @Type(() => JobProfileMinimumRequirementsUpdateInput)
  data!: JobProfileMinimumRequirementsUpdateInput;

  @Field(() => JobProfileMinimumRequirementsWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileMinimumRequirementsWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileMinimumRequirementsWhereUniqueInput, 'id'>;
}
