import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateManyMinistryInput } from './job-profile-create-many-ministry.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileCreateManyMinistryInputEnvelope {
  @Field(() => [JobProfileCreateManyMinistryInput], { nullable: false })
  @Type(() => JobProfileCreateManyMinistryInput)
  data!: Array<JobProfileCreateManyMinistryInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
