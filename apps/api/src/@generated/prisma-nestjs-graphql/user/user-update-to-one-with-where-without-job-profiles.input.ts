import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutJob_profilesInput } from './user-update-without-job-profiles.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutJob_profilesInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => UserUpdateWithoutJob_profilesInput)
  data!: UserUpdateWithoutJob_profilesInput;
}
