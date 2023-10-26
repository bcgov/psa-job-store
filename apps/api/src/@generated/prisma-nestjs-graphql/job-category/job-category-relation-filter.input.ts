import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobCategoryWhereInput } from './job-category-where.input';

@InputType()
export class JobCategoryRelationFilter {
  @Field(() => JobCategoryWhereInput, { nullable: true })
  is?: JobCategoryWhereInput;

  @Field(() => JobCategoryWhereInput, { nullable: true })
  isNot?: JobCategoryWhereInput;
}
