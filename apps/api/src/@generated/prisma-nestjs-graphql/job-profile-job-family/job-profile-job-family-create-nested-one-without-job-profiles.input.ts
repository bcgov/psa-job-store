import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyCreateWithoutJob_profilesInput } from './job-profile-job-family-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateOrConnectWithoutJob_profilesInput } from './job-profile-job-family-create-or-connect-without-job-profiles.input';
import { Prisma } from '@prisma/client';
import { JobProfileJobFamilyWhereUniqueInput } from './job-profile-job-family-where-unique.input';

@InputType()
export class JobProfileJobFamilyCreateNestedOneWithoutJob_profilesInput {
  @Field(() => JobProfileJobFamilyCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileJobFamilyCreateWithoutJob_profilesInput)
  create?: JobProfileJobFamilyCreateWithoutJob_profilesInput;

  @Field(() => JobProfileJobFamilyCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileJobFamilyCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: JobProfileJobFamilyCreateOrConnectWithoutJob_profilesInput;

  @Field(() => JobProfileJobFamilyWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileJobFamilyWhereUniqueInput, 'id'>;
}
