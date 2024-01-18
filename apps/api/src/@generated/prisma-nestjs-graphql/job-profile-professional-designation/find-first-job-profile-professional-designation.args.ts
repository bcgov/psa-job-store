import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationWhereInput } from './job-profile-professional-designation-where.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput } from './job-profile-professional-designation-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileProfessionalDesignationWhereUniqueInput } from './job-profile-professional-designation-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationScalarFieldEnum } from './job-profile-professional-designation-scalar-field.enum';

@ArgsType()
export class FindFirstJobProfileProfessionalDesignationArgs {
  @Field(() => JobProfileProfessionalDesignationWhereInput, { nullable: true })
  @Type(() => JobProfileProfessionalDesignationWhereInput)
  where?: JobProfileProfessionalDesignationWhereInput;

  @Field(() => [JobProfileProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileProfessionalDesignationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<
    JobProfileProfessionalDesignationWhereUniqueInput,
    'job_profile_id_professional_designation_id'
  >;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileProfessionalDesignationScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileProfessionalDesignationScalarFieldEnum>;
}
