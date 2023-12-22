import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutJob_profilesInput } from './user-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutJob_profilesInput } from './user-create-or-connect-without-job-profiles.input';
import { UserUpsertWithoutJob_profilesInput } from './user-upsert-without-job-profiles.input';
import { UserWhereInput } from './user-where.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutJob_profilesInput } from './user-update-to-one-with-where-without-job-profiles.input';

@InputType()
export class UserUpdateOneWithoutJob_profilesNestedInput {
  @Field(() => UserCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => UserCreateWithoutJob_profilesInput)
  create?: UserCreateWithoutJob_profilesInput;

  @Field(() => UserCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: UserCreateOrConnectWithoutJob_profilesInput;

  @Field(() => UserUpsertWithoutJob_profilesInput, { nullable: true })
  @Type(() => UserUpsertWithoutJob_profilesInput)
  upsert?: UserUpsertWithoutJob_profilesInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  disconnect?: UserWhereInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  delete?: UserWhereInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

  @Field(() => UserUpdateToOneWithWhereWithoutJob_profilesInput, { nullable: true })
  @Type(() => UserUpdateToOneWithWhereWithoutJob_profilesInput)
  update?: UserUpdateToOneWithWhereWithoutJob_profilesInput;
}
