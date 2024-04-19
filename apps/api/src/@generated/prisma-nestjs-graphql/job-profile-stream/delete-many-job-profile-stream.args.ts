import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';

@ArgsType()
export class DeleteManyJobProfileStreamArgs {
  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  @Type(() => JobProfileStreamWhereInput)
  where?: JobProfileStreamWhereInput;
}
