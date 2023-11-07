import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileReportsToWhereInput } from './job-profile-reports-to-where.input';
import { Type } from 'class-transformer';
import { JobProfileReportsToOrderByWithRelationAndSearchRelevanceInput } from './job-profile-reports-to-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileReportsToWhereUniqueInput } from './job-profile-reports-to-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileReportsToScalarFieldEnum } from './job-profile-reports-to-scalar-field.enum';

@ArgsType()
export class FindFirstJobProfileReportsToOrThrowArgs {
  @Field(() => JobProfileReportsToWhereInput, { nullable: true })
  @Type(() => JobProfileReportsToWhereInput)
  where?: JobProfileReportsToWhereInput;

  @Field(() => [JobProfileReportsToOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileReportsToOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileReportsToWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileReportsToScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileReportsToScalarFieldEnum>;
}
