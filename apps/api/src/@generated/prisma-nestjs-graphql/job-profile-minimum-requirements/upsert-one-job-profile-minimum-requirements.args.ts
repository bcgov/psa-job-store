import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileMinimumRequirementsCreateInput } from './job-profile-minimum-requirements-create.input';
import { JobProfileMinimumRequirementsUpdateInput } from './job-profile-minimum-requirements-update.input';
import { JobProfileMinimumRequirementsWhereUniqueInput } from './job-profile-minimum-requirements-where-unique.input';

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
