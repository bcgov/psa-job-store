import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DepartmentUpdateManyMutationInput } from './department-update-many-mutation.input';
import { Type } from 'class-transformer';
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
