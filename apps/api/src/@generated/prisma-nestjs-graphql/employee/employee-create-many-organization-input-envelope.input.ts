import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateManyOrganizationInput } from './employee-create-many-organization.input';
import { Type } from 'class-transformer';

@InputType()
export class EmployeeCreateManyOrganizationInputEnvelope {
  @Field(() => [EmployeeCreateManyOrganizationInput], { nullable: false })
  @Type(() => EmployeeCreateManyOrganizationInput)
  data!: Array<EmployeeCreateManyOrganizationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
