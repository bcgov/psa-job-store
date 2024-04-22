import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { DepartmentCreateWithoutLocationInput } from './department-create-without-location.input';
import { DepartmentUpdateWithoutLocationInput } from './department-update-without-location.input';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';

@InputType()
export class DepartmentUpsertWithWhereUniqueWithoutLocationInput {
  @Field(() => DepartmentWhereUniqueInput, { nullable: false })
  @Type(() => DepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentUpdateWithoutLocationInput, { nullable: false })
  @Type(() => DepartmentUpdateWithoutLocationInput)
  update!: DepartmentUpdateWithoutLocationInput;

  @Field(() => DepartmentCreateWithoutLocationInput, { nullable: false })
  @Type(() => DepartmentCreateWithoutLocationInput)
  create!: DepartmentCreateWithoutLocationInput;
}
