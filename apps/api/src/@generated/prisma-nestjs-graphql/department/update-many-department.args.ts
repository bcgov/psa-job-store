import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { DepartmentUpdateManyMutationInput } from './department-update-many-mutation.input';
import { DepartmentWhereInput } from './department-where.input';

@ArgsType()
export class UpdateManyDepartmentArgs {
  @Field(() => DepartmentUpdateManyMutationInput, { nullable: false })
  @Type(() => DepartmentUpdateManyMutationInput)
  data!: DepartmentUpdateManyMutationInput;

  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  where?: DepartmentWhereInput;
}
