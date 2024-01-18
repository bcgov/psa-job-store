import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileScopeWhereInput } from './job-profile-scope-where.input';
import { Type } from 'class-transformer';
import { JobProfileScopeOrderByWithRelationAndSearchRelevanceInput } from './job-profile-scope-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileScopeWhereUniqueInput } from './job-profile-scope-where-unique.input';
import { HideField } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileScopeScalarFieldEnum } from './job-profile-scope-scalar-field.enum';

@ArgsType()
export class FindManyJobProfileScopeArgs {
  @Field(() => JobProfileScopeWhereInput, { nullable: true })
  @Type(() => JobProfileScopeWhereInput)
  where?: JobProfileScopeWhereInput;

  @Field(() => [JobProfileScopeOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileScopeOrderByWithRelationAndSearchRelevanceInput>;

  @HideField()
  cursor?: Prisma.AtLeast<JobProfileScopeWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @HideField()
  distinct?: Array<keyof typeof JobProfileScopeScalarFieldEnum>;
}
