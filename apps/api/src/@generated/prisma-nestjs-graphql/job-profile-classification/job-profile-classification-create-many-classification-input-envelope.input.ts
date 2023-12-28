import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileClassificationCreateManyClassificationInput } from './job-profile-classification-create-many-classification.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileClassificationCreateManyClassificationInputEnvelope {
  @Field(() => [JobProfileClassificationCreateManyClassificationInput], { nullable: false })
  @Type(() => JobProfileClassificationCreateManyClassificationInput)
  data!: Array<JobProfileClassificationCreateManyClassificationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
