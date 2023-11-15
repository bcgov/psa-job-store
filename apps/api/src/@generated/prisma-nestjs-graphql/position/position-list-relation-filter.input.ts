import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionWhereInput } from './position-where.input';

@InputType()
export class PositionListRelationFilter {
  @Field(() => PositionWhereInput, { nullable: true })
  every?: PositionWhereInput;

  @Field(() => PositionWhereInput, { nullable: true })
  some?: PositionWhereInput;

  @Field(() => PositionWhereInput, { nullable: true })
  none?: PositionWhereInput;
}
