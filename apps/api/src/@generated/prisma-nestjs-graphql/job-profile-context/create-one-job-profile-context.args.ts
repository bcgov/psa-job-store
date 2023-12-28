import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileContextCreateInput } from './job-profile-context-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileContextArgs {
  @Field(() => JobProfileContextCreateInput, { nullable: false })
  @Type(() => JobProfileContextCreateInput)
  data!: JobProfileContextCreateInput;
}
