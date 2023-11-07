import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GridWhereInput } from './grid-where.input';

@InputType()
export class GridRelationFilter {
  @Field(() => GridWhereInput, { nullable: true })
  is?: GridWhereInput;

  @Field(() => GridWhereInput, { nullable: true })
  isNot?: GridWhereInput;
}
