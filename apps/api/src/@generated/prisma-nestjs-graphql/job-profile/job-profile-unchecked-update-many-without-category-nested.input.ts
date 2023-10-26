import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutCategoryInput } from './job-profile-create-without-category.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutCategoryInput } from './job-profile-create-or-connect-without-category.input';
import { JobProfileUpsertWithWhereUniqueWithoutCategoryInput } from './job-profile-upsert-with-where-unique-without-category.input';
import { JobProfileCreateManyCategoryInputEnvelope } from './job-profile-create-many-category-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateWithWhereUniqueWithoutCategoryInput } from './job-profile-update-with-where-unique-without-category.input';
import { JobProfileUpdateManyWithWhereWithoutCategoryInput } from './job-profile-update-many-with-where-without-category.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';

@InputType()
export class JobProfileUncheckedUpdateManyWithoutCategoryNestedInput {
  @Field(() => [JobProfileCreateWithoutCategoryInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutCategoryInput)
  create?: Array<JobProfileCreateWithoutCategoryInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutCategoryInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutCategoryInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutCategoryInput>;

  @Field(() => [JobProfileUpsertWithWhereUniqueWithoutCategoryInput], { nullable: true })
  @Type(() => JobProfileUpsertWithWhereUniqueWithoutCategoryInput)
  upsert?: Array<JobProfileUpsertWithWhereUniqueWithoutCategoryInput>;

  @Field(() => JobProfileCreateManyCategoryInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyCategoryInputEnvelope)
  createMany?: JobProfileCreateManyCategoryInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  set?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileUpdateWithWhereUniqueWithoutCategoryInput], { nullable: true })
  @Type(() => JobProfileUpdateWithWhereUniqueWithoutCategoryInput)
  update?: Array<JobProfileUpdateWithWhereUniqueWithoutCategoryInput>;

  @Field(() => [JobProfileUpdateManyWithWhereWithoutCategoryInput], { nullable: true })
  @Type(() => JobProfileUpdateManyWithWhereWithoutCategoryInput)
  updateMany?: Array<JobProfileUpdateManyWithWhereWithoutCategoryInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  @Type(() => JobProfileScalarWhereInput)
  deleteMany?: Array<JobProfileScalarWhereInput>;
}
