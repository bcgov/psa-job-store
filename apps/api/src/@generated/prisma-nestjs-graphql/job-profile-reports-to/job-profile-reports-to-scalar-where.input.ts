import { Field, InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

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
