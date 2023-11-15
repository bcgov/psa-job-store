import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';
import { Type } from 'class-transformer';
import { PositionUpdateWithoutDepartmentInput } from './position-update-without-department.input';

@InputType()
export class PositionUpdateWithWhereUniqueWithoutDepartmentInput {
  @Field(() => PositionWhereUniqueInput, { nullable: false })
  @Type(() => PositionWhereUniqueInput)
  where!: Prisma.AtLeast<PositionWhereUniqueInput, 'id'>;

  @Field(() => PositionUpdateWithoutDepartmentInput, { nullable: false })
  @Type(() => PositionUpdateWithoutDepartmentInput)
  data!: PositionUpdateWithoutDepartmentInput;
}
