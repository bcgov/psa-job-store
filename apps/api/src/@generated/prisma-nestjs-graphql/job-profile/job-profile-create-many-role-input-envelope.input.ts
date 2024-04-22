import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileCreateManyRoleInput } from './job-profile-create-many-role.input';

@InputType()
export class JobProfileCreateManyRoleInputEnvelope {
  @Field(() => [JobProfileCreateManyRoleInput], { nullable: false })
  @Type(() => JobProfileCreateManyRoleInput)
  data!: Array<JobProfileCreateManyRoleInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
