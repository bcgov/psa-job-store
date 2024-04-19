import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileWhereInput } from './job-profile-where.input';

@ArgsType()
export class DeleteManyJobProfileArgs {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;
}
