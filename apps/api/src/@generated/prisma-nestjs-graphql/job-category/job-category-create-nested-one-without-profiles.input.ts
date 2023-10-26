import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobCategoryCreateWithoutProfilesInput } from './job-category-create-without-profiles.input';
import { Type } from 'class-transformer';
import { JobCategoryCreateOrConnectWithoutProfilesInput } from './job-category-create-or-connect-without-profiles.input';
import { Prisma } from '@prisma/client';
import { JobCategoryWhereUniqueInput } from './job-category-where-unique.input';

@InputType()
export class JobCategoryCreateNestedOneWithoutProfilesInput {
  @Field(() => JobCategoryCreateWithoutProfilesInput, { nullable: true })
  @Type(() => JobCategoryCreateWithoutProfilesInput)
  create?: JobCategoryCreateWithoutProfilesInput;

  @Field(() => JobCategoryCreateOrConnectWithoutProfilesInput, { nullable: true })
  @Type(() => JobCategoryCreateOrConnectWithoutProfilesInput)
  connectOrCreate?: JobCategoryCreateOrConnectWithoutProfilesInput;

  @Field(() => JobCategoryWhereUniqueInput, { nullable: true })
  @Type(() => JobCategoryWhereUniqueInput)
  connect?: Prisma.AtLeast<JobCategoryWhereUniqueInput, 'id'>;
}
