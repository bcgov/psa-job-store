import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeGroupUpdateWithoutProfessional_designationsInput } from './employee-group-update-without-professional-designations.input';
import { Type } from 'class-transformer';
import { EmployeeGroupCreateWithoutProfessional_designationsInput } from './employee-group-create-without-professional-designations.input';
import { EmployeeGroupWhereInput } from './employee-group-where.input';

@InputType()
export class EmployeeGroupUpsertWithoutProfessional_designationsInput {
  @Field(() => EmployeeGroupUpdateWithoutProfessional_designationsInput, { nullable: false })
  @Type(() => EmployeeGroupUpdateWithoutProfessional_designationsInput)
  update!: EmployeeGroupUpdateWithoutProfessional_designationsInput;

  @Field(() => EmployeeGroupCreateWithoutProfessional_designationsInput, { nullable: false })
  @Type(() => EmployeeGroupCreateWithoutProfessional_designationsInput)
  create!: EmployeeGroupCreateWithoutProfessional_designationsInput;

  @Field(() => EmployeeGroupWhereInput, { nullable: true })
  @Type(() => EmployeeGroupWhereInput)
  where?: EmployeeGroupWhereInput;
}
