import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { EmployeeGroupWhereUniqueInput } from './employee-group-where-unique.input';
import { Type } from 'class-transformer';
import { EmployeeGroupCreateWithoutProfessional_designationsInput } from './employee-group-create-without-professional-designations.input';

@InputType()
export class EmployeeGroupCreateOrConnectWithoutProfessional_designationsInput {
  @Field(() => EmployeeGroupWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeGroupWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeGroupWhereUniqueInput, 'id'>;

  @Field(() => EmployeeGroupCreateWithoutProfessional_designationsInput, { nullable: false })
  @Type(() => EmployeeGroupCreateWithoutProfessional_designationsInput)
  create!: EmployeeGroupCreateWithoutProfessional_designationsInput;
}
