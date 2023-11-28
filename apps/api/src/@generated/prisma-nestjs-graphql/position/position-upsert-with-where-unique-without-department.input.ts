import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { Type } from 'class-transformer';
import { PositionUpdateWithoutDepartmentInput } from './position-update-without-department.input';
import { PositionCreateWithoutDepartmentInput } from './position-create-without-department.input';

@InputType()
export class PositionUpsertWithWhereUniqueWithoutDepartmentInput {
  @Field(() => PositionWhereUniqueInput, { nullable: false })
  @Type(() => PositionWhereUniqueInput)
  where!: Prisma.AtLeast<PositionWhereUniqueInput, 'id'>;

  @Field(() => PositionUpdateWithoutDepartmentInput, { nullable: false })
  @Type(() => PositionUpdateWithoutDepartmentInput)
  update!: PositionUpdateWithoutDepartmentInput;

  @Field(() => PositionCreateWithoutDepartmentInput, { nullable: false })
  @Type(() => PositionCreateWithoutDepartmentInput)
  create!: PositionCreateWithoutDepartmentInput;
}
