import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IdentityCreateWithoutUserInput } from './identity-create-without-user.input';
import { Type } from 'class-transformer';
import { IdentityCreateOrConnectWithoutUserInput } from './identity-create-or-connect-without-user.input';
import { IdentityUpsertWithWhereUniqueWithoutUserInput } from './identity-upsert-with-where-unique-without-user.input';
import { IdentityCreateManyUserInputEnvelope } from './identity-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { IdentityWhereUniqueInput } from './identity-where-unique.input';
import { IdentityUpdateWithWhereUniqueWithoutUserInput } from './identity-update-with-where-unique-without-user.input';
import { IdentityUpdateManyWithWhereWithoutUserInput } from './identity-update-many-with-where-without-user.input';
import { IdentityScalarWhereInput } from './identity-scalar-where.input';

@InputType()
export class IdentityUncheckedUpdateManyWithoutUserNestedInput {
  @Field(() => [IdentityCreateWithoutUserInput], { nullable: true })
  @Type(() => IdentityCreateWithoutUserInput)
  create?: Array<IdentityCreateWithoutUserInput>;

  @Field(() => [IdentityCreateOrConnectWithoutUserInput], { nullable: true })
  @Type(() => IdentityCreateOrConnectWithoutUserInput)
  connectOrCreate?: Array<IdentityCreateOrConnectWithoutUserInput>;

  @Field(() => [IdentityUpsertWithWhereUniqueWithoutUserInput], { nullable: true })
  @Type(() => IdentityUpsertWithWhereUniqueWithoutUserInput)
  upsert?: Array<IdentityUpsertWithWhereUniqueWithoutUserInput>;

  @Field(() => IdentityCreateManyUserInputEnvelope, { nullable: true })
  @Type(() => IdentityCreateManyUserInputEnvelope)
  createMany?: IdentityCreateManyUserInputEnvelope;

  @Field(() => [IdentityWhereUniqueInput], { nullable: true })
  @Type(() => IdentityWhereUniqueInput)
  set?: Array<Prisma.AtLeast<IdentityWhereUniqueInput, 'sub_identity_provider'>>;

  @Field(() => [IdentityWhereUniqueInput], { nullable: true })
  @Type(() => IdentityWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<IdentityWhereUniqueInput, 'sub_identity_provider'>>;

  @Field(() => [IdentityWhereUniqueInput], { nullable: true })
  @Type(() => IdentityWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<IdentityWhereUniqueInput, 'sub_identity_provider'>>;

  @Field(() => [IdentityWhereUniqueInput], { nullable: true })
  @Type(() => IdentityWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<IdentityWhereUniqueInput, 'sub_identity_provider'>>;

  @Field(() => [IdentityUpdateWithWhereUniqueWithoutUserInput], { nullable: true })
  @Type(() => IdentityUpdateWithWhereUniqueWithoutUserInput)
  update?: Array<IdentityUpdateWithWhereUniqueWithoutUserInput>;

  @Field(() => [IdentityUpdateManyWithWhereWithoutUserInput], { nullable: true })
  @Type(() => IdentityUpdateManyWithWhereWithoutUserInput)
  updateMany?: Array<IdentityUpdateManyWithWhereWithoutUserInput>;

  @Field(() => [IdentityScalarWhereInput], { nullable: true })
  @Type(() => IdentityScalarWhereInput)
  deleteMany?: Array<IdentityScalarWhereInput>;
}
