import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileClassificationCreateManyInput } from './job-profile-classification-create-many.input';

@ArgsType()
export class CreateManyJobProfileClassificationArgs {
  @Field(() => [JobProfileClassificationCreateManyInput], { nullable: false })
  @Type(() => JobProfileClassificationCreateManyInput)
  data!: Array<JobProfileClassificationCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
