import { Field, InputType } from '@nestjs/graphql';
import { JobProfileClassificationWhereInput } from './job-profile-classification-where.input';

@InputType()
export class JobProfileClassificationListRelationFilter {
  @Field(() => JobProfileClassificationWhereInput, { nullable: true })
  every?: JobProfileClassificationWhereInput;

  @Field(() => JobProfileClassificationWhereInput, { nullable: true })
  some?: JobProfileClassificationWhereInput;

  @Field(() => JobProfileClassificationWhereInput, { nullable: true })
  none?: JobProfileClassificationWhereInput;
}
