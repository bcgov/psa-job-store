import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileClassificationCreateManyInput } from './job-profile-classification-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileClassificationArgs {
  @Field(() => [JobProfileClassificationCreateManyInput], { nullable: false })
  @Type(() => JobProfileClassificationCreateManyInput)
  data!: Array<JobProfileClassificationCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
