import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileMinimumRequirementsWhereUniqueInput } from './job-profile-minimum-requirements-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneJobProfileMinimumRequirementsArgs {
  @Field(() => JobProfileMinimumRequirementsWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileMinimumRequirementsWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileMinimumRequirementsWhereUniqueInput, 'id'>;
}
