import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutJob_profilesInput } from './user-create-without-job-profiles.input';

@InputType()
export class UserCreateOrConnectWithoutJob_profilesInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

  @Field(() => UserCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => UserCreateWithoutJob_profilesInput)
  create!: UserCreateWithoutJob_profilesInput;
}
