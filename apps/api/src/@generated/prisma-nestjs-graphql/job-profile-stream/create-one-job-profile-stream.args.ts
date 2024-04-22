import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateInput } from './job-profile-stream-create.input';

@ArgsType()
export class CreateOneJobProfileStreamArgs {
  @Field(() => JobProfileStreamCreateInput, { nullable: false })
  @Type(() => JobProfileStreamCreateInput)
  data!: JobProfileStreamCreateInput;
}
