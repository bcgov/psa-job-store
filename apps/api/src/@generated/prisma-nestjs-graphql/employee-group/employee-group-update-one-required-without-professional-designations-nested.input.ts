import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeGroupCreateWithoutProfessional_designationsInput } from './employee-group-create-without-professional-designations.input';
import { Type } from 'class-transformer';
import { EmployeeGroupCreateOrConnectWithoutProfessional_designationsInput } from './employee-group-create-or-connect-without-professional-designations.input';
import { EmployeeGroupUpsertWithoutProfessional_designationsInput } from './employee-group-upsert-without-professional-designations.input';
import { Prisma } from '@prisma/client';
import { EmployeeGroupWhereUniqueInput } from './employee-group-where-unique.input';
import { EmployeeGroupUpdateToOneWithWhereWithoutProfessional_designationsInput } from './employee-group-update-to-one-with-where-without-professional-designations.input';

@InputType()
export class EmployeeGroupUpdateOneRequiredWithoutProfessional_designationsNestedInput {
  @Field(() => EmployeeGroupCreateWithoutProfessional_designationsInput, { nullable: true })
  @Type(() => EmployeeGroupCreateWithoutProfessional_designationsInput)
  create?: EmployeeGroupCreateWithoutProfessional_designationsInput;

  @Field(() => EmployeeGroupCreateOrConnectWithoutProfessional_designationsInput, { nullable: true })
  @Type(() => EmployeeGroupCreateOrConnectWithoutProfessional_designationsInput)
  connectOrCreate?: EmployeeGroupCreateOrConnectWithoutProfessional_designationsInput;

  @Field(() => EmployeeGroupUpsertWithoutProfessional_designationsInput, { nullable: true })
  @Type(() => EmployeeGroupUpsertWithoutProfessional_designationsInput)
  upsert?: EmployeeGroupUpsertWithoutProfessional_designationsInput;

  @Field(() => EmployeeGroupWhereUniqueInput, { nullable: true })
  @Type(() => EmployeeGroupWhereUniqueInput)
  connect?: Prisma.AtLeast<EmployeeGroupWhereUniqueInput, 'id'>;

  @Field(() => EmployeeGroupUpdateToOneWithWhereWithoutProfessional_designationsInput, { nullable: true })
  @Type(() => EmployeeGroupUpdateToOneWithWhereWithoutProfessional_designationsInput)
  update?: EmployeeGroupUpdateToOneWithWhereWithoutProfessional_designationsInput;
}
