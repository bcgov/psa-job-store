import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutCategoryInput } from './job-profile-update-without-category.input';

@InputType()
export class JobProfileUpdateWithWhereUniqueWithoutCategoryInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutCategoryInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutCategoryInput)
  data!: JobProfileUpdateWithoutCategoryInput;
}
