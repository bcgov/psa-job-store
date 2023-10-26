import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobCategoryUpdateInput } from './job-category-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobCategoryWhereUniqueInput } from './job-category-where-unique.input';

@ArgsType()
export class UpdateOneJobCategoryArgs {
  @Field(() => JobCategoryUpdateInput, { nullable: false })
  @Type(() => JobCategoryUpdateInput)
  data!: JobCategoryUpdateInput;

  @Field(() => JobCategoryWhereUniqueInput, { nullable: false })
  @Type(() => JobCategoryWhereUniqueInput)
  where!: Prisma.AtLeast<JobCategoryWhereUniqueInput, 'id'>;
}
