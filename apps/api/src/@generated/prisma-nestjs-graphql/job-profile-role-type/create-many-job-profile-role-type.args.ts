import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileRoleTypeCreateManyInput } from './job-profile-role-type-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileRoleTypeArgs {
  @Field(() => [JobProfileRoleTypeCreateManyInput], { nullable: false })
  @Type(() => JobProfileRoleTypeCreateManyInput)
  data!: Array<JobProfileRoleTypeCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
