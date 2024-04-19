import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { DepartmentCreateManyOrganizationInput } from './department-create-many-organization.input';

@InputType()
export class DepartmentCreateManyOrganizationInputEnvelope {
  @Field(() => [DepartmentCreateManyOrganizationInput], { nullable: false })
  @Type(() => DepartmentCreateManyOrganizationInput)
  data!: Array<DepartmentCreateManyOrganizationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
