import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionWhereInput } from './position-where.input';
import { Type } from 'class-transformer';
import { PositionUpdateWithoutEmployeesInput } from './position-update-without-employees.input';

@InputType()
export class PositionUpdateToOneWithWhereWithoutEmployeesInput {
  @Field(() => PositionWhereInput, { nullable: true })
  @Type(() => PositionWhereInput)
  where?: PositionWhereInput;

  @Field(() => PositionUpdateWithoutEmployeesInput, { nullable: false })
  @Type(() => PositionUpdateWithoutEmployeesInput)
  data!: PositionUpdateWithoutEmployeesInput;
}
