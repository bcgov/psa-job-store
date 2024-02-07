import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationDepartmentCreateManyDepartmentInput } from './classification-department-create-many-department.input';
import { Type } from 'class-transformer';

@InputType()
export class ClassificationDepartmentCreateManyDepartmentInputEnvelope {
  @Field(() => [ClassificationDepartmentCreateManyDepartmentInput], { nullable: false })
  @Type(() => ClassificationDepartmentCreateManyDepartmentInput)
  data!: Array<ClassificationDepartmentCreateManyDepartmentInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
