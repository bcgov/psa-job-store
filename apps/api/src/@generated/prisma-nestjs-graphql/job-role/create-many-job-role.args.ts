import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobRoleCreateManyInput } from './job-role-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobRoleArgs {
  @Field(() => [JobRoleCreateManyInput], { nullable: false })
  @Type(() => JobRoleCreateManyInput)
  data!: Array<JobRoleCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
