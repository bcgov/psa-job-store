import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyJobProfileStreamArgs {
  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  @Type(() => JobProfileStreamWhereInput)
  where?: JobProfileStreamWhereInput;
}
