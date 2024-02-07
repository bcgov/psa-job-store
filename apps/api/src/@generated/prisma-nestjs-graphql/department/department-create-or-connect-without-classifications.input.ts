import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutClassificationsInput } from './department-create-without-classifications.input';

@InputType()
export class DepartmentCreateOrConnectWithoutClassificationsInput {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  @Type(() => DepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentCreateWithoutClassificationsInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutClassificationsInput)
  create!: DepartmentCreateWithoutClassificationsInput;
}
