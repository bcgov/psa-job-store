import { Field, InputType } from '@nestjs/graphql';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';

@InputType()
export class JobProfileStreamRelationFilter {
  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  is?: JobProfileStreamWhereInput;

  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  isNot?: JobProfileStreamWhereInput;
}
