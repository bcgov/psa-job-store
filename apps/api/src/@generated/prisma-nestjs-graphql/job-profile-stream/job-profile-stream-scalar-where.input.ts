import { Field, InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class JobProfileStreamScalarWhereInput {
  @Field(() => [JobProfileStreamScalarWhereInput], { nullable: true })
  AND?: Array<JobProfileStreamScalarWhereInput>;

  @Field(() => [JobProfileStreamScalarWhereInput], { nullable: true })
  OR?: Array<JobProfileStreamScalarWhereInput>;

  @Field(() => [JobProfileStreamScalarWhereInput], { nullable: true })
  NOT?: Array<JobProfileStreamScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  job_family_id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;
}
