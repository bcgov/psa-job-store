import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationDepartmentCreateManyClassificationInput } from './classification-department-create-many-classification.input';
import { Type } from 'class-transformer';

@InputType()
export class ClassificationDepartmentCreateManyClassificationInputEnvelope {
  @Field(() => [ClassificationDepartmentCreateManyClassificationInput], { nullable: false })
  @Type(() => ClassificationDepartmentCreateManyClassificationInput)
  data!: Array<ClassificationDepartmentCreateManyClassificationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
