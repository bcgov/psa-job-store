import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CareerGroupCreateWithoutProfilesInput } from './career-group-create-without-profiles.input';
import { Type } from 'class-transformer';
import { CareerGroupCreateOrConnectWithoutProfilesInput } from './career-group-create-or-connect-without-profiles.input';
import { CareerGroupUpsertWithoutProfilesInput } from './career-group-upsert-without-profiles.input';
import { CareerGroupWhereInput } from './career-group-where.input';
import { Prisma } from '@prisma/client';
import { CareerGroupWhereUniqueInput } from './career-group-where-unique.input';
import { CareerGroupUpdateToOneWithWhereWithoutProfilesInput } from './career-group-update-to-one-with-where-without-profiles.input';

@InputType()
export class CareerGroupUpdateOneWithoutProfilesNestedInput {
  @Field(() => CareerGroupCreateWithoutProfilesInput, { nullable: true })
  @Type(() => CareerGroupCreateWithoutProfilesInput)
  create?: CareerGroupCreateWithoutProfilesInput;

  @Field(() => CareerGroupCreateOrConnectWithoutProfilesInput, { nullable: true })
  @Type(() => CareerGroupCreateOrConnectWithoutProfilesInput)
  connectOrCreate?: CareerGroupCreateOrConnectWithoutProfilesInput;

  @Field(() => CareerGroupUpsertWithoutProfilesInput, { nullable: true })
  @Type(() => CareerGroupUpsertWithoutProfilesInput)
  upsert?: CareerGroupUpsertWithoutProfilesInput;

  @Field(() => CareerGroupWhereInput, { nullable: true })
  @Type(() => CareerGroupWhereInput)
  disconnect?: CareerGroupWhereInput;

  @Field(() => CareerGroupWhereInput, { nullable: true })
  @Type(() => CareerGroupWhereInput)
  delete?: CareerGroupWhereInput;

  @Field(() => CareerGroupWhereUniqueInput, { nullable: true })
  @Type(() => CareerGroupWhereUniqueInput)
  connect?: Prisma.AtLeast<CareerGroupWhereUniqueInput, 'id'>;

  @Field(() => CareerGroupUpdateToOneWithWhereWithoutProfilesInput, { nullable: true })
  @Type(() => CareerGroupUpdateToOneWithWhereWithoutProfilesInput)
  update?: CareerGroupUpdateToOneWithWhereWithoutProfilesInput;
}
