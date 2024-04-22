import { ArgsType, Field, HideField, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileMinimumRequirementsOrderByWithRelationAndSearchRelevanceInput } from './job-profile-minimum-requirements-order-by-with-relation-and-search-relevance.input';
import { JobProfileMinimumRequirementsScalarFieldEnum } from './job-profile-minimum-requirements-scalar-field.enum';
import { JobProfileMinimumRequirementsWhereUniqueInput } from './job-profile-minimum-requirements-where-unique.input';
import { JobProfileMinimumRequirementsWhereInput } from './job-profile-minimum-requirements-where.input';

@ArgsType()
export class FindManyJobProfileMinimumRequirementsArgs {
  @Field(() => JobProfileMinimumRequirementsWhereInput, { nullable: true })
  @Type(() => JobProfileMinimumRequirementsWhereInput)
  where?: JobProfileMinimumRequirementsWhereInput;

  @Field(() => [JobProfileMinimumRequirementsOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileMinimumRequirementsOrderByWithRelationAndSearchRelevanceInput>;

  @HideField()
  cursor?: Prisma.AtLeast<JobProfileMinimumRequirementsWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @HideField()
  distinct?: Array<keyof typeof JobProfileMinimumRequirementsScalarFieldEnum>;
}
