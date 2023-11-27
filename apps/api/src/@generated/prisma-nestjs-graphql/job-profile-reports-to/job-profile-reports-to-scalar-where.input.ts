import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';

@InputType()
export class JobProfileReportsToScalarWhereInput {
  @Field(() => [JobProfileReportsToScalarWhereInput], { nullable: true })
  AND?: Array<JobProfileReportsToScalarWhereInput>;

  @Field(() => [JobProfileReportsToScalarWhereInput], { nullable: true })
  OR?: Array<JobProfileReportsToScalarWhereInput>;

  @Field(() => [JobProfileReportsToScalarWhereInput], { nullable: true })
  NOT?: Array<JobProfileReportsToScalarWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  classification_id?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  job_profile_id?: IntFilter;
}
