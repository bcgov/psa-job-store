import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateManyStreamInput } from './job-profile-create-many-stream.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileCreateManyStreamInputEnvelope {
  @Field(() => [JobProfileCreateManyStreamInput], { nullable: false })
  @Type(() => JobProfileCreateManyStreamInput)
  data!: Array<JobProfileCreateManyStreamInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
