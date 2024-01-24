import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileStreamCreateInput } from './job-profile-stream-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileStreamArgs {
  @Field(() => JobProfileStreamCreateInput, { nullable: false })
  @Type(() => JobProfileStreamCreateInput)
  data!: JobProfileStreamCreateInput;
}
