import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileCreateManyInput } from './job-profile-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileArgs {
  @Field(() => [JobProfileCreateManyInput], { nullable: false })
  @Type(() => JobProfileCreateManyInput)
  data!: Array<JobProfileCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
