import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { PositionRequestCreateManyParent_job_profileInput } from './position-request-create-many-parent-job-profile.input';

@InputType()
export class PositionRequestCreateManyParent_job_profileInputEnvelope {
  @Field(() => [PositionRequestCreateManyParent_job_profileInput], { nullable: false })
  @Type(() => PositionRequestCreateManyParent_job_profileInput)
  data!: Array<PositionRequestCreateManyParent_job_profileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
