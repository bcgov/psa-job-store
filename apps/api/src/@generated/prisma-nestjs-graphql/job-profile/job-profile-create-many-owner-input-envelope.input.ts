import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileCreateManyOwnerInput } from './job-profile-create-many-owner.input';

@InputType()
export class JobProfileCreateManyOwnerInputEnvelope {
  @Field(() => [JobProfileCreateManyOwnerInput], { nullable: false })
  @Type(() => JobProfileCreateManyOwnerInput)
  data!: Array<JobProfileCreateManyOwnerInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
