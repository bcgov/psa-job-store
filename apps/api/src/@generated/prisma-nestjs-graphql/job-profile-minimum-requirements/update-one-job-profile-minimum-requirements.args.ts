import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileMinimumRequirementsUpdateInput } from './job-profile-minimum-requirements-update.input';
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
