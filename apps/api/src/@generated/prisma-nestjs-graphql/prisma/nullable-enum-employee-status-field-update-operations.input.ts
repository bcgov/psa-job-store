import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeStatus } from './employee-status.enum';

@InputType()
export class NullableEnumEmployeeStatusFieldUpdateOperationsInput {
  @Field(() => EmployeeStatus, { nullable: true })
  set?: keyof typeof EmployeeStatus;
}
