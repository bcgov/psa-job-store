import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { Type } from 'class-transformer';
import { DepartmentUpdateWithoutLocationInput } from './department-update-without-location.input';

@InputType()
export class DepartmentUpdateWithWhereUniqueWithoutLocationInput {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  @Type(() => DepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentUpdateWithoutLocationInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutLocationInput)
  data!: DepartmentUpdateWithoutLocationInput;
}
