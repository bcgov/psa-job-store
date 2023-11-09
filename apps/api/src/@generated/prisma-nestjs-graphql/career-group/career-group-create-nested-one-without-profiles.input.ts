import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CareerGroupCreateWithoutProfilesInput } from './career-group-create-without-profiles.input';
import { Type } from 'class-transformer';
import { CareerGroupCreateOrConnectWithoutProfilesInput } from './career-group-create-or-connect-without-profiles.input';
import { Prisma } from '@prisma/client';
import { CareerGroupWhereUniqueInput } from './career-group-where-unique.input';

@InputType()
export class CareerGroupCreateNestedOneWithoutProfilesInput {
  @Field(() => CareerGroupCreateWithoutProfilesInput, { nullable: true })
  @Type(() => CareerGroupCreateWithoutProfilesInput)
  create?: CareerGroupCreateWithoutProfilesInput;

  @Field(() => CareerGroupCreateOrConnectWithoutProfilesInput, { nullable: true })
  @Type(() => CareerGroupCreateOrConnectWithoutProfilesInput)
  connectOrCreate?: CareerGroupCreateOrConnectWithoutProfilesInput;

  @Field(() => CareerGroupWhereUniqueInput, { nullable: true })
  @Type(() => CareerGroupWhereUniqueInput)
  connect?: Prisma.AtLeast<CareerGroupWhereUniqueInput, 'id'>;
}
