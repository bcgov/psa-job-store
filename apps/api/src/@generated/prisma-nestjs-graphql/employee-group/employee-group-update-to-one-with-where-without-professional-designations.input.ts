import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeGroupWhereInput } from './employee-group-where.input';
import { Type } from 'class-transformer';
import { EmployeeGroupUpdateWithoutProfessional_designationsInput } from './employee-group-update-without-professional-designations.input';

@InputType()
export class EmployeeGroupUpdateToOneWithWhereWithoutProfessional_designationsInput {
  @Field(() => EmployeeGroupWhereInput, { nullable: true })
  @Type(() => EmployeeGroupWhereInput)
  where?: EmployeeGroupWhereInput;

  @Field(() => EmployeeGroupUpdateWithoutProfessional_designationsInput, { nullable: false })
  @Type(() => EmployeeGroupUpdateWithoutProfessional_designationsInput)
  data!: EmployeeGroupUpdateWithoutProfessional_designationsInput;
}
