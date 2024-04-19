import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { DepartmentUpdateInput } from './department-update.input';
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
