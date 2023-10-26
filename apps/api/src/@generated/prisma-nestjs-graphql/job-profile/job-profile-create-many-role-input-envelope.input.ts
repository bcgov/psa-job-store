import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateManyRoleInput } from './job-profile-create-many-role.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileCreateManyRoleInputEnvelope {
  @Field(() => [JobProfileCreateManyRoleInput], { nullable: false })
  @Type(() => JobProfileCreateManyRoleInput)
  data!: Array<JobProfileCreateManyRoleInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
