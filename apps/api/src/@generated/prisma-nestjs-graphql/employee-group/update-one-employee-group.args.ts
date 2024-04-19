import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { EmployeeGroupUpdateInput } from './employee-group-update.input';
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
