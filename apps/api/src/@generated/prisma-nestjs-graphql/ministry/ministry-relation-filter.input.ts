import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MinistryWhereInput } from './ministry-where.input';

@InputType()
export class MinistryRelationFilter {
  @Field(() => MinistryWhereInput, { nullable: true })
  is?: MinistryWhereInput;

  @Field(() => MinistryWhereInput, { nullable: true })
  isNot?: MinistryWhereInput;
}
