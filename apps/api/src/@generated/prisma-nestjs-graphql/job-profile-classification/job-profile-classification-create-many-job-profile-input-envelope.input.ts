import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileClassificationCreateManyJob_profileInput } from './job-profile-classification-create-many-job-profile.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileClassificationCreateManyJob_profileInputEnvelope {
  @Field(() => [JobProfileClassificationCreateManyJob_profileInput], { nullable: false })
  @Type(() => JobProfileClassificationCreateManyJob_profileInput)
  data!: Array<JobProfileClassificationCreateManyJob_profileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
