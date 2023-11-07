import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateManyOwnerInput } from './job-profile-create-many-owner.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileCreateManyOwnerInputEnvelope {
  @Field(() => [JobProfileCreateManyOwnerInput], { nullable: false })
  @Type(() => JobProfileCreateManyOwnerInput)
  data!: Array<JobProfileCreateManyOwnerInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
