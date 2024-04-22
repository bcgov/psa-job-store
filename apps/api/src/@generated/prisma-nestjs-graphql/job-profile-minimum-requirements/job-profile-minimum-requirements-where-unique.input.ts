import { Field, InputType, Int } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileMinimumRequirementsWhereInput } from './job-profile-minimum-requirements-where.input';

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
