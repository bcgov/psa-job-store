import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateManyParentInput } from './job-profile-create-many-parent.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileCreateManyParentInputEnvelope {
  @Field(() => [JobProfileCreateManyParentInput], { nullable: false })
  @Type(() => JobProfileCreateManyParentInput)
  data!: Array<JobProfileCreateManyParentInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
