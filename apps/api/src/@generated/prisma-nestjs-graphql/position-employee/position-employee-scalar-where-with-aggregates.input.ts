import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class PositionEmployeeScalarWhereWithAggregatesInput {
  @Field(() => [PositionEmployeeScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<PositionEmployeeScalarWhereWithAggregatesInput>;

  @Field(() => [PositionEmployeeScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<PositionEmployeeScalarWhereWithAggregatesInput>;

  @Field(() => [PositionEmployeeScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<PositionEmployeeScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  employee_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  position_id?: StringWithAggregatesFilter;
}
