import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileRelationFilter {
  @Field(() => JobProfileWhereInput, { nullable: true })
  is?: JobProfileWhereInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  isNot?: JobProfileWhereInput;
}
