import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobCategoryCreateInput } from './job-category-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobCategoryArgs {
  @Field(() => JobCategoryCreateInput, { nullable: false })
  @Type(() => JobCategoryCreateInput)
  data!: JobCategoryCreateInput;
}
