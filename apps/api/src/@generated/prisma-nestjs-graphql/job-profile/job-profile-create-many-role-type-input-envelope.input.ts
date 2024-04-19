import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileCreateManyRole_typeInput } from './job-profile-create-many-role-type.input';

@InputType()
export class JobProfileCreateManyRole_typeInputEnvelope {
  @Field(() => [JobProfileCreateManyRole_typeInput], { nullable: false })
  @Type(() => JobProfileCreateManyRole_typeInput)
  data!: Array<JobProfileCreateManyRole_typeInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
