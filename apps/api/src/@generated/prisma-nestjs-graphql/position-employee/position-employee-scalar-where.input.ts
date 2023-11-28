import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class PositionEmployeeScalarWhereInput {
  @Field(() => [PositionEmployeeScalarWhereInput], { nullable: true })
  AND?: Array<PositionEmployeeScalarWhereInput>;

  @Field(() => [PositionEmployeeScalarWhereInput], { nullable: true })
  OR?: Array<PositionEmployeeScalarWhereInput>;

  @Field(() => [PositionEmployeeScalarWhereInput], { nullable: true })
  NOT?: Array<PositionEmployeeScalarWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  employee_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  position_id?: StringFilter;
}
