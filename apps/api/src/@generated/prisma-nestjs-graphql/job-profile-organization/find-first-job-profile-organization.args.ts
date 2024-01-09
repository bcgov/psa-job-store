import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileOrganizationWhereInput } from './job-profile-organization-where.input';
import { Type } from 'class-transformer';
import { JobProfileOrganizationOrderByWithRelationAndSearchRelevanceInput } from './job-profile-organization-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileOrganizationScalarFieldEnum } from './job-profile-organization-scalar-field.enum';

@ArgsType()
export class FindFirstJobProfileOrganizationArgs {
  @Field(() => JobProfileOrganizationWhereInput, { nullable: true })
  @Type(() => JobProfileOrganizationWhereInput)
  where?: JobProfileOrganizationWhereInput;

  @Field(() => [JobProfileOrganizationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileOrganizationOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileOrganizationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileOrganizationScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileOrganizationScalarFieldEnum>;
}
