import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCareerGroupWhereInput } from './job-profile-career-group-where.input';

@InputType()
export class JobProfileCareerGroupRelationFilter {
  @Field(() => JobProfileCareerGroupWhereInput, { nullable: true })
  is?: JobProfileCareerGroupWhereInput;

  @Field(() => JobProfileCareerGroupWhereInput, { nullable: true })
  isNot?: JobProfileCareerGroupWhereInput;
}
