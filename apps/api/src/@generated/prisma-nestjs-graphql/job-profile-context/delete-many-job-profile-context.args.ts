import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileContextWhereInput } from './job-profile-context-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyJobProfileContextArgs {
  @Field(() => JobProfileContextWhereInput, { nullable: true })
  @Type(() => JobProfileContextWhereInput)
  where?: JobProfileContextWhereInput;
}
