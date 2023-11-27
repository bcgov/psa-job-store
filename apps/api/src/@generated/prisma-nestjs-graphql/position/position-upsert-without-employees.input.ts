import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionUpdateWithoutEmployeesInput } from './position-update-without-employees.input';
import { Type } from 'class-transformer';
import { PositionCreateWithoutEmployeesInput } from './position-create-without-employees.input';
import { PositionWhereInput } from './position-where.input';

@InputType()
export class PositionUpsertWithoutEmployeesInput {
  @Field(() => PositionUpdateWithoutEmployeesInput, { nullable: false })
  @Type(() => PositionUpdateWithoutEmployeesInput)
  update!: PositionUpdateWithoutEmployeesInput;

  @Field(() => PositionCreateWithoutEmployeesInput, { nullable: false })
  @Type(() => PositionCreateWithoutEmployeesInput)
  create!: PositionCreateWithoutEmployeesInput;

  @Field(() => PositionWhereInput, { nullable: true })
  @Type(() => PositionWhereInput)
  where?: PositionWhereInput;
}
