import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateOrConnectWithoutJobProfilesInput } from './job-profile-job-family-create-or-connect-without-job-profiles.input';
import { JobProfileJobFamilyCreateWithoutJobProfilesInput } from './job-profile-job-family-create-without-job-profiles.input';
import { JobProfileJobFamilyUpdateToOneWithWhereWithoutJobProfilesInput } from './job-profile-job-family-update-to-one-with-where-without-job-profiles.input';
import { JobProfileJobFamilyUpsertWithoutJobProfilesInput } from './job-profile-job-family-upsert-without-job-profiles.input';
import { JobProfileJobFamilyWhereUniqueInput } from './job-profile-job-family-where-unique.input';

@InputType()
export class JobProfileJobFamilyUpdateOneRequiredWithoutJobProfilesNestedInput {
  @Field(() => JobProfileJobFamilyCreateWithoutJobProfilesInput, { nullable: true })
  @Type(() => JobProfileJobFamilyCreateWithoutJobProfilesInput)
  create?: JobProfileJobFamilyCreateWithoutJobProfilesInput;

  @Field(() => JobProfileJobFamilyCreateOrConnectWithoutJobProfilesInput, { nullable: true })
  @Type(() => JobProfileJobFamilyCreateOrConnectWithoutJobProfilesInput)
  connectOrCreate?: JobProfileJobFamilyCreateOrConnectWithoutJobProfilesInput;

  @Field(() => JobProfileJobFamilyUpsertWithoutJobProfilesInput, { nullable: true })
  @Type(() => JobProfileJobFamilyUpsertWithoutJobProfilesInput)
  upsert?: JobProfileJobFamilyUpsertWithoutJobProfilesInput;

  @Field(() => JobProfileJobFamilyWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileJobFamilyWhereUniqueInput, 'id'>;

  @Field(() => JobProfileJobFamilyUpdateToOneWithWhereWithoutJobProfilesInput, { nullable: true })
  @Type(() => JobProfileJobFamilyUpdateToOneWithWhereWithoutJobProfilesInput)
  update?: JobProfileJobFamilyUpdateToOneWithWhereWithoutJobProfilesInput;
}
