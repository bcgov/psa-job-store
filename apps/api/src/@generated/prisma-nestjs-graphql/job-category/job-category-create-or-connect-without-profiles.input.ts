import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobCategoryWhereUniqueInput } from './job-category-where-unique.input';
import { Type } from 'class-transformer';
import { JobCategoryCreateWithoutProfilesInput } from './job-category-create-without-profiles.input';

@InputType()
export class JobCategoryCreateOrConnectWithoutProfilesInput {
  @Field(() => JobCategoryWhereUniqueInput, { nullable: false })
  @Type(() => JobCategoryWhereUniqueInput)
  where!: Prisma.AtLeast<JobCategoryWhereUniqueInput, 'id'>;

  @Field(() => JobCategoryCreateWithoutProfilesInput, { nullable: false })
  @Type(() => JobCategoryCreateWithoutProfilesInput)
  create!: JobCategoryCreateWithoutProfilesInput;
}
