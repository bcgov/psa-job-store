import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { EmployeeGroupCreateWithoutClassificationsInput } from './employee-group-create-without-classifications.input';
import { EmployeeGroupWhereUniqueInput } from './employee-group-where-unique.input';

@InputType()
export class EmployeeGroupCreateOrConnectWithoutClassificationsInput {
  @Field(() => EmployeeGroupWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeGroupWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeGroupWhereUniqueInput, 'id'>;

  @Field(() => EmployeeGroupCreateWithoutClassificationsInput, { nullable: false })
  @Type(() => EmployeeGroupCreateWithoutClassificationsInput)
  create!: EmployeeGroupCreateWithoutClassificationsInput;
}
