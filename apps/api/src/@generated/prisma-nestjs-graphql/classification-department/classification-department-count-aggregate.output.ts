import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ClassificationDepartmentCountAggregate {
  @Field(() => Int, { nullable: false })
  classification_id!: number;

  @Field(() => Int, { nullable: false })
  department_id!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
