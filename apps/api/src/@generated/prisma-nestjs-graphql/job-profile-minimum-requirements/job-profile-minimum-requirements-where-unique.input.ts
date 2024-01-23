import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileMinimumRequirementsWhereInput } from './job-profile-minimum-requirements-where.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class JobProfileMinimumRequirementsWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [JobProfileMinimumRequirementsWhereInput], { nullable: true })
  AND?: Array<JobProfileMinimumRequirementsWhereInput>;

  @Field(() => [JobProfileMinimumRequirementsWhereInput], { nullable: true })
  OR?: Array<JobProfileMinimumRequirementsWhereInput>;

  @Field(() => [JobProfileMinimumRequirementsWhereInput], { nullable: true })
  NOT?: Array<JobProfileMinimumRequirementsWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  requirement?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  grade?: StringFilter;
}
