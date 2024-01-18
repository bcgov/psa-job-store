import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput } from './job-profile-professional-designation-create-without-professional-designation.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationCreateOrConnectWithoutProfessional_designationInput } from './job-profile-professional-designation-create-or-connect-without-professional-designation.input';
import { JobProfileProfessionalDesignationUpsertWithWhereUniqueWithoutProfessional_designationInput } from './job-profile-professional-designation-upsert-with-where-unique-without-professional-designation.input';
import { JobProfileProfessionalDesignationCreateManyProfessional_designationInputEnvelope } from './job-profile-professional-designation-create-many-professional-designation-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileProfessionalDesignationWhereUniqueInput } from './job-profile-professional-designation-where-unique.input';
import { JobProfileProfessionalDesignationUpdateWithWhereUniqueWithoutProfessional_designationInput } from './job-profile-professional-designation-update-with-where-unique-without-professional-designation.input';
import { JobProfileProfessionalDesignationUpdateManyWithWhereWithoutProfessional_designationInput } from './job-profile-professional-designation-update-many-with-where-without-professional-designation.input';
import { JobProfileProfessionalDesignationScalarWhereInput } from './job-profile-professional-designation-scalar-where.input';

@InputType()
export class JobProfileProfessionalDesignationUpdateManyWithoutProfessional_designationNestedInput {
  @Field(() => [JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput)
  create?: Array<JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput>;

  @Field(() => [JobProfileProfessionalDesignationCreateOrConnectWithoutProfessional_designationInput], {
    nullable: true,
  })
  @Type(() => JobProfileProfessionalDesignationCreateOrConnectWithoutProfessional_designationInput)
  connectOrCreate?: Array<JobProfileProfessionalDesignationCreateOrConnectWithoutProfessional_designationInput>;

  @Field(() => [JobProfileProfessionalDesignationUpsertWithWhereUniqueWithoutProfessional_designationInput], {
    nullable: true,
  })
  @Type(() => JobProfileProfessionalDesignationUpsertWithWhereUniqueWithoutProfessional_designationInput)
  upsert?: Array<JobProfileProfessionalDesignationUpsertWithWhereUniqueWithoutProfessional_designationInput>;

  @Field(() => JobProfileProfessionalDesignationCreateManyProfessional_designationInputEnvelope, { nullable: true })
  @Type(() => JobProfileProfessionalDesignationCreateManyProfessional_designationInputEnvelope)
  createMany?: JobProfileProfessionalDesignationCreateManyProfessional_designationInputEnvelope;

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

  @Field(() => [JobProfileProfessionalDesignationUpdateWithWhereUniqueWithoutProfessional_designationInput], {
    nullable: true,
  })
  @Type(() => JobProfileProfessionalDesignationUpdateWithWhereUniqueWithoutProfessional_designationInput)
  update?: Array<JobProfileProfessionalDesignationUpdateWithWhereUniqueWithoutProfessional_designationInput>;

  @Field(() => [JobProfileProfessionalDesignationUpdateManyWithWhereWithoutProfessional_designationInput], {
    nullable: true,
  })
  @Type(() => JobProfileProfessionalDesignationUpdateManyWithWhereWithoutProfessional_designationInput)
  updateMany?: Array<JobProfileProfessionalDesignationUpdateManyWithWhereWithoutProfessional_designationInput>;

  @Field(() => [JobProfileProfessionalDesignationScalarWhereInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationScalarWhereInput)
  deleteMany?: Array<JobProfileProfessionalDesignationScalarWhereInput>;
}
