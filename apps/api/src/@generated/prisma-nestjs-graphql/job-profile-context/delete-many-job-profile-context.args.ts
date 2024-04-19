import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileContextWhereInput } from './job-profile-context-where.input';

@ArgsType()
export class DeleteManyJobProfileContextArgs {
  @Field(() => JobProfileContextWhereInput, { nullable: true })
  @Type(() => JobProfileContextWhereInput)
  where?: JobProfileContextWhereInput;
}
