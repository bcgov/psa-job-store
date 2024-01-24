import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateManyRole_typeInput } from './job-profile-create-many-role-type.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileCreateManyRole_typeInputEnvelope {
  @Field(() => [JobProfileCreateManyRole_typeInput], { nullable: false })
  @Type(() => JobProfileCreateManyRole_typeInput)
  data!: Array<JobProfileCreateManyRole_typeInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
