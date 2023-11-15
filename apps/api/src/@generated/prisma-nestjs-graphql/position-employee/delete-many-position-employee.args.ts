import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionEmployeeWhereInput } from './position-employee-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyPositionEmployeeArgs {
  @Field(() => PositionEmployeeWhereInput, { nullable: true })
  @Type(() => PositionEmployeeWhereInput)
  where?: PositionEmployeeWhereInput;
}
