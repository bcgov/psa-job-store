import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationDepartmentCreateManyInput } from './classification-department-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyClassificationDepartmentArgs {
  @Field(() => [ClassificationDepartmentCreateManyInput], { nullable: false })
  @Type(() => ClassificationDepartmentCreateManyInput)
  data!: Array<ClassificationDepartmentCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
