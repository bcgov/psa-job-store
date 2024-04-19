import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { EmployeeGroupCreateOrConnectWithoutClassificationsInput } from './employee-group-create-or-connect-without-classifications.input';
import { EmployeeGroupCreateWithoutClassificationsInput } from './employee-group-create-without-classifications.input';
import { EmployeeGroupWhereUniqueInput } from './employee-group-where-unique.input';

@InputType()
export class EmployeeGroupCreateNestedOneWithoutClassificationsInput {
  @Field(() => EmployeeGroupCreateWithoutClassificationsInput, { nullable: true })
  @Type(() => EmployeeGroupCreateWithoutClassificationsInput)
  create?: EmployeeGroupCreateWithoutClassificationsInput;

  @Field(() => EmployeeGroupCreateOrConnectWithoutClassificationsInput, { nullable: true })
  @Type(() => EmployeeGroupCreateOrConnectWithoutClassificationsInput)
  connectOrCreate?: EmployeeGroupCreateOrConnectWithoutClassificationsInput;

  @Field(() => EmployeeGroupWhereUniqueInput, { nullable: true })
  @Type(() => EmployeeGroupWhereUniqueInput)
  connect?: Prisma.AtLeast<EmployeeGroupWhereUniqueInput, 'id'>;
}
