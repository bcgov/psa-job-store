import { Field, InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class JobProfileClassificationScalarWhereInput {
  @Field(() => [JobProfileClassificationScalarWhereInput], { nullable: true })
  AND?: Array<JobProfileClassificationScalarWhereInput>;

  @Field(() => [JobProfileClassificationScalarWhereInput], { nullable: true })
  OR?: Array<JobProfileClassificationScalarWhereInput>;

  @Field(() => [JobProfileClassificationScalarWhereInput], { nullable: true })
  NOT?: Array<JobProfileClassificationScalarWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  classification_id?: StringFilter;

  @Field(() => IntFilter, { nullable: true })
  job_profile_id?: IntFilter;
}
