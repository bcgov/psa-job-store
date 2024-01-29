import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { EmployeeGroupWhereUniqueInput } from './employee-group-where-unique.input';
import { Type } from 'class-transformer';
import { EmployeeGroupCreateInput } from './employee-group-create.input';
import { EmployeeGroupUpdateInput } from './employee-group-update.input';

@ArgsType()
export class UpsertOneEmployeeGroupArgs {
  @Field(() => EmployeeGroupWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeGroupWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeGroupWhereUniqueInput, 'id'>;

  @Field(() => EmployeeGroupCreateInput, { nullable: false })
  @Type(() => EmployeeGroupCreateInput)
  create!: EmployeeGroupCreateInput;

  @Field(() => EmployeeGroupUpdateInput, { nullable: false })
  @Type(() => EmployeeGroupUpdateInput)
  update!: EmployeeGroupUpdateInput;
}
