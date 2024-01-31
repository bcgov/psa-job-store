import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestWhereInput } from './position-request-where.input';

@InputType()
export class PositionRequestListRelationFilter {
  @Field(() => PositionRequestWhereInput, { nullable: true })
  every?: PositionRequestWhereInput;

  @Field(() => PositionRequestWhereInput, { nullable: true })
  some?: PositionRequestWhereInput;

  @Field(() => PositionRequestWhereInput, { nullable: true })
  none?: PositionRequestWhereInput;
}
