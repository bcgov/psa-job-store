import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { Type } from 'class-transformer';
import { EmployeeUpdateWithoutClassificationInput } from './employee-update-without-classification.input';

@InputType()
export class EmployeeUpdateWithWhereUniqueWithoutClassificationInput {
  @Field(() => EmployeeWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;

  @Field(() => EmployeeUpdateWithoutClassificationInput, { nullable: false })
  @Type(() => EmployeeUpdateWithoutClassificationInput)
  data!: EmployeeUpdateWithoutClassificationInput;
}
