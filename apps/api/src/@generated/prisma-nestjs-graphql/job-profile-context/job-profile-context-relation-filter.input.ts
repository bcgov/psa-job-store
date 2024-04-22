import { Field, InputType } from '@nestjs/graphql';
import { JobProfileContextWhereInput } from './job-profile-context-where.input';

@InputType()
export class JobProfileContextRelationFilter {
  @Field(() => JobProfileContextWhereInput, { nullable: true })
  is?: JobProfileContextWhereInput;

  @Field(() => JobProfileContextWhereInput, { nullable: true })
  isNot?: JobProfileContextWhereInput;
}
