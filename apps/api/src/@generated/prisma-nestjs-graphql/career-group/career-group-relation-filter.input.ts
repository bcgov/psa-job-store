import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CareerGroupWhereInput } from './career-group-where.input';

@InputType()
export class CareerGroupRelationFilter {
  @Field(() => CareerGroupWhereInput, { nullable: true })
  is?: CareerGroupWhereInput;

  @Field(() => CareerGroupWhereInput, { nullable: true })
  isNot?: CareerGroupWhereInput;
}
