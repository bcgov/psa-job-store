import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DepartmentCreateManyInput } from './department-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyDepartmentArgs {
  @Field(() => [DepartmentCreateManyInput], { nullable: false })
  @Type(() => DepartmentCreateManyInput)
  data!: Array<DepartmentCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
