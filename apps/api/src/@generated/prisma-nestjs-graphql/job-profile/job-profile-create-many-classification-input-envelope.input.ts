import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateManyClassificationInput } from './job-profile-create-many-classification.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileCreateManyClassificationInputEnvelope {
  @Field(() => [JobProfileCreateManyClassificationInput], { nullable: false })
  @Type(() => JobProfileCreateManyClassificationInput)
  data!: Array<JobProfileCreateManyClassificationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
