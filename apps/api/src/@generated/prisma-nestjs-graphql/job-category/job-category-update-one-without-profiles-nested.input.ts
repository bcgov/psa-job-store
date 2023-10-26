import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobCategoryCreateWithoutProfilesInput } from './job-category-create-without-profiles.input';
import { Type } from 'class-transformer';
import { JobCategoryCreateOrConnectWithoutProfilesInput } from './job-category-create-or-connect-without-profiles.input';
import { JobCategoryUpsertWithoutProfilesInput } from './job-category-upsert-without-profiles.input';
import { JobCategoryWhereInput } from './job-category-where.input';
import { Prisma } from '@prisma/client';
import { JobCategoryWhereUniqueInput } from './job-category-where-unique.input';
import { JobCategoryUpdateToOneWithWhereWithoutProfilesInput } from './job-category-update-to-one-with-where-without-profiles.input';

@InputType()
export class JobCategoryUpdateOneWithoutProfilesNestedInput {
  @Field(() => JobCategoryCreateWithoutProfilesInput, { nullable: true })
  @Type(() => JobCategoryCreateWithoutProfilesInput)
  create?: JobCategoryCreateWithoutProfilesInput;

  @Field(() => JobCategoryCreateOrConnectWithoutProfilesInput, { nullable: true })
  @Type(() => JobCategoryCreateOrConnectWithoutProfilesInput)
  connectOrCreate?: JobCategoryCreateOrConnectWithoutProfilesInput;

  @Field(() => JobCategoryUpsertWithoutProfilesInput, { nullable: true })
  @Type(() => JobCategoryUpsertWithoutProfilesInput)
  upsert?: JobCategoryUpsertWithoutProfilesInput;

  @Field(() => JobCategoryWhereInput, { nullable: true })
  @Type(() => JobCategoryWhereInput)
  disconnect?: JobCategoryWhereInput;

  @Field(() => JobCategoryWhereInput, { nullable: true })
  @Type(() => JobCategoryWhereInput)
  delete?: JobCategoryWhereInput;

  @Field(() => JobCategoryWhereUniqueInput, { nullable: true })
  @Type(() => JobCategoryWhereUniqueInput)
  connect?: Prisma.AtLeast<JobCategoryWhereUniqueInput, 'id'>;

  @Field(() => JobCategoryUpdateToOneWithWhereWithoutProfilesInput, { nullable: true })
  @Type(() => JobCategoryUpdateToOneWithWhereWithoutProfilesInput)
  update?: JobCategoryUpdateToOneWithWhereWithoutProfilesInput;
}
