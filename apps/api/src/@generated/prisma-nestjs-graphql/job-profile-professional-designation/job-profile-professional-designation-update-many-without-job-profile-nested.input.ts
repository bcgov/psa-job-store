import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationCreateWithoutJob_profileInput } from './job-profile-professional-designation-create-without-job-profile.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationCreateOrConnectWithoutJob_profileInput } from './job-profile-professional-designation-create-or-connect-without-job-profile.input';
import { JobProfileProfessionalDesignationUpsertWithWhereUniqueWithoutJob_profileInput } from './job-profile-professional-designation-upsert-with-where-unique-without-job-profile.input';
import { JobProfileProfessionalDesignationCreateManyJob_profileInputEnvelope } from './job-profile-professional-designation-create-many-job-profile-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileProfessionalDesignationWhereUniqueInput } from './job-profile-professional-designation-where-unique.input';
import { JobProfileProfessionalDesignationUpdateWithWhereUniqueWithoutJob_profileInput } from './job-profile-professional-designation-update-with-where-unique-without-job-profile.input';
import { JobProfileProfessionalDesignationUpdateManyWithWhereWithoutJob_profileInput } from './job-profile-professional-designation-update-many-with-where-without-job-profile.input';
import { JobProfileProfessionalDesignationScalarWhereInput } from './job-profile-professional-designation-scalar-where.input';

@InputType()
export class JobProfileProfessionalDesignationUpdateManyWithoutJob_profileNestedInput {
  @Field(() => [JobProfileProfessionalDesignationCreateWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationCreateWithoutJob_profileInput)
  create?: Array<JobProfileProfessionalDesignationCreateWithoutJob_profileInput>;

  @Field(() => [JobProfileProfessionalDesignationCreateOrConnectWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationCreateOrConnectWithoutJob_profileInput)
  connectOrCreate?: Array<JobProfileProfessionalDesignationCreateOrConnectWithoutJob_profileInput>;

  @Field(() => [JobProfileProfessionalDesignationUpsertWithWhereUniqueWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationUpsertWithWhereUniqueWithoutJob_profileInput)
  upsert?: Array<JobProfileProfessionalDesignationUpsertWithWhereUniqueWithoutJob_profileInput>;

  @Field(() => JobProfileProfessionalDesignationCreateManyJob_profileInputEnvelope, { nullable: true })
  @Type(() => JobProfileProfessionalDesignationCreateManyJob_profileInputEnvelope)
  createMany?: JobProfileProfessionalDesignationCreateManyJob_profileInputEnvelope;

  @Field(() => [JobProfileProfessionalDesignationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationWhereUniqueInput)
  set?: Array<
    Prisma.AtLeast<JobProfileProfessionalDesignationWhereUniqueInput, 'job_profile_id_professional_designation_id'>
  >;

  @Field(() => [JobProfileProfessionalDesignationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationWhereUniqueInput)
  disconnect?: Array<
    Prisma.AtLeast<JobProfileProfessionalDesignationWhereUniqueInput, 'job_profile_id_professional_designation_id'>
  >;

  @Field(() => [JobProfileProfessionalDesignationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationWhereUniqueInput)
  delete?: Array<
    Prisma.AtLeast<JobProfileProfessionalDesignationWhereUniqueInput, 'job_profile_id_professional_designation_id'>
  >;

  @Field(() => [JobProfileProfessionalDesignationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationWhereUniqueInput)
  connect?: Array<
    Prisma.AtLeast<JobProfileProfessionalDesignationWhereUniqueInput, 'job_profile_id_professional_designation_id'>
  >;

  @Field(() => [JobProfileProfessionalDesignationUpdateWithWhereUniqueWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationUpdateWithWhereUniqueWithoutJob_profileInput)
  update?: Array<JobProfileProfessionalDesignationUpdateWithWhereUniqueWithoutJob_profileInput>;

  @Field(() => [JobProfileProfessionalDesignationUpdateManyWithWhereWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationUpdateManyWithWhereWithoutJob_profileInput)
  updateMany?: Array<JobProfileProfessionalDesignationUpdateManyWithWhereWithoutJob_profileInput>;

  @Field(() => [JobProfileProfessionalDesignationScalarWhereInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationScalarWhereInput)
  deleteMany?: Array<JobProfileProfessionalDesignationScalarWhereInput>;
}
