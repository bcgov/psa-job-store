import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileClassificationCreateManyJob_profileInput } from './job-profile-classification-create-many-job-profile.input';

@InputType()
export class JobProfileClassificationCreateManyJob_profileInputEnvelope {
  @Field(() => [JobProfileClassificationCreateManyJob_profileInput], { nullable: false })
  @Type(() => JobProfileClassificationCreateManyJob_profileInput)
  data!: Array<JobProfileClassificationCreateManyJob_profileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
