import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutCategoryInput } from './job-profile-create-without-category.input';

@InputType()
export class JobProfileCreateOrConnectWithoutCategoryInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCreateWithoutCategoryInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutCategoryInput)
  create!: JobProfileCreateWithoutCategoryInput;
}
