import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionEmployeeWhereInput } from './position-employee-where.input';
import { Type } from 'class-transformer';
import { PositionEmployeeOrderByWithRelationAndSearchRelevanceInput } from './position-employee-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { PositionEmployeeWhereUniqueInput } from './position-employee-where-unique.input';
import { Int } from '@nestjs/graphql';
import { PositionEmployeeScalarFieldEnum } from './position-employee-scalar-field.enum';

@ArgsType()
export class FindFirstPositionEmployeeOrThrowArgs {
  @Field(() => PositionEmployeeWhereInput, { nullable: true })
  @Type(() => PositionEmployeeWhereInput)
  where?: PositionEmployeeWhereInput;

  @Field(() => [PositionEmployeeOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<PositionEmployeeOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => PositionEmployeeWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<PositionEmployeeWhereUniqueInput, 'employee_id_position_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [PositionEmployeeScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof PositionEmployeeScalarFieldEnum>;
}
