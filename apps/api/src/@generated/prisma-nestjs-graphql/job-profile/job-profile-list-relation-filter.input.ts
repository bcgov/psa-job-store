import { Field, InputType } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileListRelationFilter {
  @Field(() => JobProfileWhereInput, { nullable: true })
  every?: JobProfileWhereInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  some?: JobProfileWhereInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  none?: JobProfileWhereInput;
}
