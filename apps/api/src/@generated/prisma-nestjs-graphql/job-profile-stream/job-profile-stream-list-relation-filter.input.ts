import { Field, InputType } from '@nestjs/graphql';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';

@InputType()
export class JobProfileStreamListRelationFilter {
  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  every?: JobProfileStreamWhereInput;

  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  some?: JobProfileStreamWhereInput;

  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  none?: JobProfileStreamWhereInput;
}
