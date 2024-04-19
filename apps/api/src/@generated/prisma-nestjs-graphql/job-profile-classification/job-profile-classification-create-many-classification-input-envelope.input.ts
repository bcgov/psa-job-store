import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileClassificationCreateManyClassificationInput } from './job-profile-classification-create-many-classification.input';

@InputType()
export class JobProfileClassificationCreateManyClassificationInputEnvelope {
  @Field(() => [JobProfileClassificationCreateManyClassificationInput], { nullable: false })
  @Type(() => JobProfileClassificationCreateManyClassificationInput)
  data!: Array<JobProfileClassificationCreateManyClassificationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
