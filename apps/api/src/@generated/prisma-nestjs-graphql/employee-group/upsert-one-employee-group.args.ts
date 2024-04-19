import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { EmployeeGroupCreateInput } from './employee-group-create.input';
import { EmployeeGroupUpdateInput } from './employee-group-update.input';
import { EmployeeGroupWhereUniqueInput } from './employee-group-where-unique.input';

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
