import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileMinimumRequirementsWhereUniqueInput } from './job-profile-minimum-requirements-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileMinimumRequirementsCreateInput } from './job-profile-minimum-requirements-create.input';
import { JobProfileMinimumRequirementsUpdateInput } from './job-profile-minimum-requirements-update.input';

@ArgsType()
export class UpsertOneJobProfileMinimumRequirementsArgs {
  @Field(() => JobProfileMinimumRequirementsWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileMinimumRequirementsWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileMinimumRequirementsWhereUniqueInput, 'id'>;

  @Field(() => JobProfileMinimumRequirementsCreateInput, { nullable: false })
  @Type(() => JobProfileMinimumRequirementsCreateInput)
  create!: JobProfileMinimumRequirementsCreateInput;

  @Field(() => JobProfileMinimumRequirementsUpdateInput, { nullable: false })
  @Type(() => JobProfileMinimumRequirementsUpdateInput)
  update!: JobProfileMinimumRequirementsUpdateInput;
}
