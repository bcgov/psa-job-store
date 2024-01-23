import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class JobProfileMinimumRequirementsWhereInput {
  @Field(() => [JobProfileMinimumRequirementsWhereInput], { nullable: true })
  AND?: Array<JobProfileMinimumRequirementsWhereInput>;

  @Field(() => [JobProfileMinimumRequirementsWhereInput], { nullable: true })
  OR?: Array<JobProfileMinimumRequirementsWhereInput>;

  @Field(() => [JobProfileMinimumRequirementsWhereInput], { nullable: true })
  NOT?: Array<JobProfileMinimumRequirementsWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  requirement?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  grade?: StringFilter;
}
