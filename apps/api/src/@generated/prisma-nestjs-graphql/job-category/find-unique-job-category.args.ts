import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobCategoryWhereUniqueInput } from './job-category-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueJobCategoryArgs {
  @Field(() => JobCategoryWhereUniqueInput, { nullable: false })
  @Type(() => JobCategoryWhereUniqueInput)
  where!: Prisma.AtLeast<JobCategoryWhereUniqueInput, 'id'>;
}
