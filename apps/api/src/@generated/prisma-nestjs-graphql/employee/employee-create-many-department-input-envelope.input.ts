import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateManyDepartmentInput } from './employee-create-many-department.input';
import { Type } from 'class-transformer';

@InputType()
export class EmployeeCreateManyDepartmentInputEnvelope {
  @Field(() => [EmployeeCreateManyDepartmentInput], { nullable: false })
  @Type(() => EmployeeCreateManyDepartmentInput)
  data!: Array<EmployeeCreateManyDepartmentInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
