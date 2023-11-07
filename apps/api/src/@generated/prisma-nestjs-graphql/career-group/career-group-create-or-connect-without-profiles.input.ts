import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CareerGroupWhereUniqueInput } from './career-group-where-unique.input';
import { Type } from 'class-transformer';
import { CareerGroupCreateWithoutProfilesInput } from './career-group-create-without-profiles.input';

@InputType()
export class CareerGroupCreateOrConnectWithoutProfilesInput {
  @Field(() => CareerGroupWhereUniqueInput, { nullable: false })
  @Type(() => CareerGroupWhereUniqueInput)
  where!: Prisma.AtLeast<CareerGroupWhereUniqueInput, 'id'>;

  @Field(() => CareerGroupCreateWithoutProfilesInput, { nullable: false })
  @Type(() => CareerGroupCreateWithoutProfilesInput)
  create!: CareerGroupCreateWithoutProfilesInput;
}
