import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateManyJob_familyInput } from './job-profile-stream-create-many-job-family.input';

@InputType()
export class JobProfileStreamCreateManyJob_familyInputEnvelope {
  @Field(() => [JobProfileStreamCreateManyJob_familyInput], { nullable: false })
  @Type(() => JobProfileStreamCreateManyJob_familyInput)
  data!: Array<JobProfileStreamCreateManyJob_familyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
