import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Classification } from '../classification/classification.model';
import { Department } from '../department/department.model';

@ObjectType()
export class ClassificationDepartment {
  @Field(() => String, { nullable: false })
  classification_id!: string;

  @Field(() => String, { nullable: false })
  department_id!: string;

  @Field(() => Classification, { nullable: false })
  classification?: Classification;

  @Field(() => Department, { nullable: false })
  department?: Department;
}
