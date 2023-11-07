import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileCreateInput } from './job-profile-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileArgs {
  @Field(() => JobProfileCreateInput, { nullable: false })
  @Type(() => JobProfileCreateInput)
  data!: JobProfileCreateInput;
}
