import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionEmployeeCreateInput } from './position-employee-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnePositionEmployeeArgs {
  @Field(() => PositionEmployeeCreateInput, { nullable: false })
  @Type(() => PositionEmployeeCreateInput)
  data!: PositionEmployeeCreateInput;
}
