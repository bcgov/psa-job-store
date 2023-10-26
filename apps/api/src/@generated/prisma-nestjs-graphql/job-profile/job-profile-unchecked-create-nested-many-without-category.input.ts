import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutCategoryInput } from './job-profile-create-without-category.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutCategoryInput } from './job-profile-create-or-connect-without-category.input';
import { JobProfileCreateManyCategoryInputEnvelope } from './job-profile-create-many-category-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUncheckedCreateNestedManyWithoutCategoryInput {
  @Field(() => [JobProfileCreateWithoutCategoryInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutCategoryInput)
  create?: Array<JobProfileCreateWithoutCategoryInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutCategoryInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutCategoryInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutCategoryInput>;

  @Field(() => JobProfileCreateManyCategoryInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyCategoryInputEnvelope)
  createMany?: JobProfileCreateManyCategoryInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;
}
