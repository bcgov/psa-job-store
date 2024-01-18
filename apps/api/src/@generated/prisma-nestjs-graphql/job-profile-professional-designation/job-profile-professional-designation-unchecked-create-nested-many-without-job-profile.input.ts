import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationCreateWithoutJob_profileInput } from './job-profile-professional-designation-create-without-job-profile.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationCreateOrConnectWithoutJob_profileInput } from './job-profile-professional-designation-create-or-connect-without-job-profile.input';
import { JobProfileProfessionalDesignationCreateManyJob_profileInputEnvelope } from './job-profile-professional-designation-create-many-job-profile-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileProfessionalDesignationWhereUniqueInput } from './job-profile-professional-designation-where-unique.input';

@InputType()
export class JobProfileProfessionalDesignationUncheckedCreateNestedManyWithoutJob_profileInput {
  @Field(() => [JobProfileProfessionalDesignationCreateWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationCreateWithoutJob_profileInput)
  create?: Array<JobProfileProfessionalDesignationCreateWithoutJob_profileInput>;

  @Field(() => [JobProfileProfessionalDesignationCreateOrConnectWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationCreateOrConnectWithoutJob_profileInput)
  connectOrCreate?: Array<JobProfileProfessionalDesignationCreateOrConnectWithoutJob_profileInput>;

  @Field(() => JobProfileProfessionalDesignationCreateManyJob_profileInputEnvelope, { nullable: true })
  @Type(() => JobProfileProfessionalDesignationCreateManyJob_profileInputEnvelope)
  createMany?: JobProfileProfessionalDesignationCreateManyJob_profileInputEnvelope;

  @Field(() => [JobProfileProfessionalDesignationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileProfessionalDesignationWhereUniqueInput)
  connect?: Array<
    Prisma.AtLeast<JobProfileProfessionalDesignationWhereUniqueInput, 'job_profile_id_professional_designation_id'>
  >;
}
