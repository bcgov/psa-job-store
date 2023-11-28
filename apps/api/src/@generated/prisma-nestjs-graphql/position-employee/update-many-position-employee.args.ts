import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionEmployeeUncheckedUpdateManyInput } from './position-employee-unchecked-update-many.input';
import { Type } from 'class-transformer';
import { PositionEmployeeWhereInput } from './position-employee-where.input';

@ArgsType()
export class UpdateManyPositionEmployeeArgs {
  @Field(() => PositionEmployeeUncheckedUpdateManyInput, { nullable: false })
  @Type(() => PositionEmployeeUncheckedUpdateManyInput)
  data!: PositionEmployeeUncheckedUpdateManyInput;

  @Field(() => PositionEmployeeWhereInput, { nullable: true })
  @Type(() => PositionEmployeeWhereInput)
  where?: PositionEmployeeWhereInput;
}
