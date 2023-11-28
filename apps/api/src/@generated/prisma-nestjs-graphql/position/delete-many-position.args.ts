import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionWhereInput } from './position-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyPositionArgs {
  @Field(() => PositionWhereInput, { nullable: true })
  @Type(() => PositionWhereInput)
  where?: PositionWhereInput;
}
