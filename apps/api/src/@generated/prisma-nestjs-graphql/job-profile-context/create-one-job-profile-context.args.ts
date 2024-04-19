import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileContextCreateInput } from './job-profile-context-create.input';

@ArgsType()
export class CreateOneJobProfileContextArgs {
  @Field(() => JobProfileContextCreateInput, { nullable: false })
  @Type(() => JobProfileContextCreateInput)
  data!: JobProfileContextCreateInput;
}
