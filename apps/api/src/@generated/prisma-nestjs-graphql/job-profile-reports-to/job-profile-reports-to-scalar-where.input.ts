import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';

@InputType()
export class JobProfileReportsToScalarWhereInput {
  @Field(() => [JobProfileReportsToScalarWhereInput], { nullable: true })
  AND?: Array<JobProfileReportsToScalarWhereInput>;

  @Field(() => [JobProfileReportsToScalarWhereInput], { nullable: true })
  OR?: Array<JobProfileReportsToScalarWhereInput>;

  @Field(() => [JobProfileReportsToScalarWhereInput], { nullable: true })
  NOT?: Array<JobProfileReportsToScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  classification_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  job_profile_id?: IntFilter;
}
