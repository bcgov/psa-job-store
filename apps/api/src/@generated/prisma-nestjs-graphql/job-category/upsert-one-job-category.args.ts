import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobCategoryWhereUniqueInput } from './job-category-where-unique.input';
import { Type } from 'class-transformer';
import { JobCategoryCreateInput } from './job-category-create.input';
import { JobCategoryUpdateInput } from './job-category-update.input';

@ArgsType()
export class UpsertOneJobCategoryArgs {
  @Field(() => JobCategoryWhereUniqueInput, { nullable: false })
  @Type(() => JobCategoryWhereUniqueInput)
  where!: Prisma.AtLeast<JobCategoryWhereUniqueInput, 'id'>;

  @Field(() => JobCategoryCreateInput, { nullable: false })
  @Type(() => JobCategoryCreateInput)
  create!: JobCategoryCreateInput;

  @Field(() => JobCategoryUpdateInput, { nullable: false })
  @Type(() => JobCategoryUpdateInput)
  update!: JobCategoryUpdateInput;
}
