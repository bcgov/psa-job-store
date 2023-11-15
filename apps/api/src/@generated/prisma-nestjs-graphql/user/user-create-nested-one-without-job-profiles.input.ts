import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutJob_profilesInput } from './user-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutJob_profilesInput } from './user-create-or-connect-without-job-profiles.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutJob_profilesInput {
  @Field(() => UserCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => UserCreateWithoutJob_profilesInput)
  create?: UserCreateWithoutJob_profilesInput;

  @Field(() => UserCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: UserCreateOrConnectWithoutJob_profilesInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
}
