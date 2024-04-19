import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutJobFamiliesInput } from './job-profile-create-or-connect-without-job-families.input';
import { JobProfileCreateWithoutJobFamiliesInput } from './job-profile-create-without-job-families.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateNestedOneWithoutJobFamiliesInput {
  @Field(() => JobProfileCreateWithoutJobFamiliesInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutJobFamiliesInput)
  create?: JobProfileCreateWithoutJobFamiliesInput;

  @Field(() => JobProfileCreateOrConnectWithoutJobFamiliesInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutJobFamiliesInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutJobFamiliesInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;
}
