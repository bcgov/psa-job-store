import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileCreateInput } from './job-profile-create.input';

@ArgsType()
export class CreateOneJobProfileArgs {
  @Field(() => JobProfileCreateInput, { nullable: false })
  @Type(() => JobProfileCreateInput)
  data!: JobProfileCreateInput;
}
