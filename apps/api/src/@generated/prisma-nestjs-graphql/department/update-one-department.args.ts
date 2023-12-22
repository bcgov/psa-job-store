import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DepartmentUpdateInput } from './department-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';

@ArgsType()
export class UpdateOneDepartmentArgs {
  @Field(() => DepartmentUpdateInput, { nullable: false })
  @Type(() => DepartmentUpdateInput)
  data!: DepartmentUpdateInput;

  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  @Type(() => DepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;
}
