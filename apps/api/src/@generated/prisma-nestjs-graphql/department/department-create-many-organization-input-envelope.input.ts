import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateManyOrganizationInput } from './department-create-many-organization.input';
import { Type } from 'class-transformer';

@InputType()
export class DepartmentCreateManyOrganizationInputEnvelope {
  @Field(() => [DepartmentCreateManyOrganizationInput], { nullable: false })
  @Type(() => DepartmentCreateManyOrganizationInput)
  data!: Array<DepartmentCreateManyOrganizationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
