import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { DepartmentCreateManyInput } from './department-create-many.input';

@ArgsType()
export class CreateManyDepartmentArgs {
  @Field(() => [DepartmentCreateManyInput], { nullable: false })
  @Type(() => DepartmentCreateManyInput)
  data!: Array<DepartmentCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
