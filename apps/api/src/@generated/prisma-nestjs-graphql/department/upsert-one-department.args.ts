import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { Type } from 'class-transformer';
import { DepartmentCreateInput } from './department-create.input';
import { DepartmentUpdateInput } from './department-update.input';

@ArgsType()
export class UpsertOneDepartmentArgs {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  @Type(() => DepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentCreateInput, { nullable: false })
  @Type(() => DepartmentCreateInput)
  create!: DepartmentCreateInput;

  @Field(() => DepartmentUpdateInput, { nullable: false })
  @Type(() => DepartmentUpdateInput)
  update!: DepartmentUpdateInput;
}
