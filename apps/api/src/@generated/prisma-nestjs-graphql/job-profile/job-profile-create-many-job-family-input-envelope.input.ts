import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateManyJob_familyInput } from './job-profile-create-many-job-family.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileCreateManyJob_familyInputEnvelope {
  @Field(() => [JobProfileCreateManyJob_familyInput], { nullable: false })
  @Type(() => JobProfileCreateManyJob_familyInput)
  data!: Array<JobProfileCreateManyJob_familyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
