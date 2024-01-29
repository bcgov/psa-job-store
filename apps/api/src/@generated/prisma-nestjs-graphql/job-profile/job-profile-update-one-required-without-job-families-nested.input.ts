import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutJobFamiliesInput } from './job-profile-create-without-job-families.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutJobFamiliesInput } from './job-profile-create-or-connect-without-job-families.input';
import { JobProfileUpsertWithoutJobFamiliesInput } from './job-profile-upsert-without-job-families.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateToOneWithWhereWithoutJobFamiliesInput } from './job-profile-update-to-one-with-where-without-job-families.input';

@InputType()
export class JobProfileUpdateOneRequiredWithoutJobFamiliesNestedInput {
  @Field(() => JobProfileCreateWithoutJobFamiliesInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutJobFamiliesInput)
  create?: JobProfileCreateWithoutJobFamiliesInput;

  @Field(() => JobProfileCreateOrConnectWithoutJobFamiliesInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutJobFamiliesInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutJobFamiliesInput;

  @Field(() => JobProfileUpsertWithoutJobFamiliesInput, { nullable: true })
  @Type(() => JobProfileUpsertWithoutJobFamiliesInput)
  upsert?: JobProfileUpsertWithoutJobFamiliesInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileUpdateToOneWithWhereWithoutJobFamiliesInput, { nullable: true })
  @Type(() => JobProfileUpdateToOneWithWhereWithoutJobFamiliesInput)
  update?: JobProfileUpdateToOneWithWhereWithoutJobFamiliesInput;
}
