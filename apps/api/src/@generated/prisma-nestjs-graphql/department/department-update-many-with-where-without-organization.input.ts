import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { DepartmentScalarWhereInput } from './department-scalar-where.input';
import { DepartmentUpdateManyMutationInput } from './department-update-many-mutation.input';

@InputType()
export class DepartmentUpdateManyWithWhereWithoutOrganizationInput {
  @Field(() => DepartmentScalarWhereInput, { nullable: false })
  @Type(() => DepartmentScalarWhereInput)
  where!: DepartmentScalarWhereInput;

  @Field(() => DepartmentUpdateManyMutationInput, { nullable: false })
  @Type(() => DepartmentUpdateManyMutationInput)
  data!: DepartmentUpdateManyMutationInput;
}
