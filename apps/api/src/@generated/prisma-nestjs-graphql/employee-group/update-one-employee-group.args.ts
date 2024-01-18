import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { EmployeeGroupUpdateInput } from './employee-group-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { EmployeeGroupWhereUniqueInput } from './employee-group-where-unique.input';

@ArgsType()
export class UpdateOneEmployeeGroupArgs {
  @Field(() => EmployeeGroupUpdateInput, { nullable: false })
  @Type(() => EmployeeGroupUpdateInput)
  data!: EmployeeGroupUpdateInput;

  @Field(() => EmployeeGroupWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeGroupWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeGroupWhereUniqueInput, 'id'>;
}
