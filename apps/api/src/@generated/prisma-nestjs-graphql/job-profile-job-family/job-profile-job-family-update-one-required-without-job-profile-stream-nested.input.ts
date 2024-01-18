import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyCreateWithoutJobProfileStreamInput } from './job-profile-job-family-create-without-job-profile-stream.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateOrConnectWithoutJobProfileStreamInput } from './job-profile-job-family-create-or-connect-without-job-profile-stream.input';
import { JobProfileJobFamilyUpsertWithoutJobProfileStreamInput } from './job-profile-job-family-upsert-without-job-profile-stream.input';
import { Prisma } from '@prisma/client';
import { JobProfileJobFamilyWhereUniqueInput } from './job-profile-job-family-where-unique.input';
import { JobProfileJobFamilyUpdateToOneWithWhereWithoutJobProfileStreamInput } from './job-profile-job-family-update-to-one-with-where-without-job-profile-stream.input';

@InputType()
export class JobProfileJobFamilyUpdateOneRequiredWithoutJobProfileStreamNestedInput {
  @Field(() => JobProfileJobFamilyCreateWithoutJobProfileStreamInput, { nullable: true })
  @Type(() => JobProfileJobFamilyCreateWithoutJobProfileStreamInput)
  create?: JobProfileJobFamilyCreateWithoutJobProfileStreamInput;

  @Field(() => JobProfileJobFamilyCreateOrConnectWithoutJobProfileStreamInput, { nullable: true })
  @Type(() => JobProfileJobFamilyCreateOrConnectWithoutJobProfileStreamInput)
  connectOrCreate?: JobProfileJobFamilyCreateOrConnectWithoutJobProfileStreamInput;

  @Field(() => JobProfileJobFamilyUpsertWithoutJobProfileStreamInput, { nullable: true })
  @Type(() => JobProfileJobFamilyUpsertWithoutJobProfileStreamInput)
  upsert?: JobProfileJobFamilyUpsertWithoutJobProfileStreamInput;

  @Field(() => JobProfileJobFamilyWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileJobFamilyWhereUniqueInput, 'id'>;

  @Field(() => JobProfileJobFamilyUpdateToOneWithWhereWithoutJobProfileStreamInput, { nullable: true })
  @Type(() => JobProfileJobFamilyUpdateToOneWithWhereWithoutJobProfileStreamInput)
  update?: JobProfileJobFamilyUpdateToOneWithWhereWithoutJobProfileStreamInput;
}
