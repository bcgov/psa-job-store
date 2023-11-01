import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateManyCareer_groupInput } from './job-profile-create-many-career-group.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileCreateManyCareer_groupInputEnvelope {
  @Field(() => [JobProfileCreateManyCareer_groupInput], { nullable: false })
  @Type(() => JobProfileCreateManyCareer_groupInput)
  data!: Array<JobProfileCreateManyCareer_groupInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
