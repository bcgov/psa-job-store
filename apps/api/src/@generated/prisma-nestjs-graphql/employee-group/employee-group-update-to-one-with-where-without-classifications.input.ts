import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeGroupWhereInput } from './employee-group-where.input';
import { Type } from 'class-transformer';
import { EmployeeGroupUpdateWithoutClassificationsInput } from './employee-group-update-without-classifications.input';

@InputType()
export class EmployeeGroupUpdateToOneWithWhereWithoutClassificationsInput {
  @Field(() => EmployeeGroupWhereInput, { nullable: true })
  @Type(() => EmployeeGroupWhereInput)
  where?: EmployeeGroupWhereInput;

  @Field(() => EmployeeGroupUpdateWithoutClassificationsInput, { nullable: false })
  @Type(() => EmployeeGroupUpdateWithoutClassificationsInput)
  data!: EmployeeGroupUpdateWithoutClassificationsInput;
}
