import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { EmployeeGroupWhereUniqueInput } from './employee-group-where-unique.input';

@ArgsType()
export class DeleteOneEmployeeGroupArgs {
  @Field(() => EmployeeGroupWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeGroupWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeGroupWhereUniqueInput, 'id'>;
}
