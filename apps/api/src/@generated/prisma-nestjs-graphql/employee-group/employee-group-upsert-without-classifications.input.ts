import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeGroupUpdateWithoutClassificationsInput } from './employee-group-update-without-classifications.input';
import { Type } from 'class-transformer';
import { EmployeeGroupCreateWithoutClassificationsInput } from './employee-group-create-without-classifications.input';
import { EmployeeGroupWhereInput } from './employee-group-where.input';

@InputType()
export class EmployeeGroupUpsertWithoutClassificationsInput {
  @Field(() => EmployeeGroupUpdateWithoutClassificationsInput, { nullable: false })
  @Type(() => EmployeeGroupUpdateWithoutClassificationsInput)
  update!: EmployeeGroupUpdateWithoutClassificationsInput;

  @Field(() => EmployeeGroupCreateWithoutClassificationsInput, { nullable: false })
  @Type(() => EmployeeGroupCreateWithoutClassificationsInput)
  create!: EmployeeGroupCreateWithoutClassificationsInput;

  @Field(() => EmployeeGroupWhereInput, { nullable: true })
  @Type(() => EmployeeGroupWhereInput)
  where?: EmployeeGroupWhereInput;
}
