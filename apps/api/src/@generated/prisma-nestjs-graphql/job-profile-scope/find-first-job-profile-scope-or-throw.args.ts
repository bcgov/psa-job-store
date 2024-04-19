import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileScopeOrderByWithRelationAndSearchRelevanceInput } from './job-profile-scope-order-by-with-relation-and-search-relevance.input';
import { JobProfileScopeScalarFieldEnum } from './job-profile-scope-scalar-field.enum';
import { JobProfileScopeWhereUniqueInput } from './job-profile-scope-where-unique.input';
import { JobProfileScopeWhereInput } from './job-profile-scope-where.input';

@ArgsType()
export class FindFirstJobProfileScopeOrThrowArgs {
  @Field(() => JobProfileScopeWhereInput, { nullable: true })
  @Type(() => JobProfileScopeWhereInput)
  where?: JobProfileScopeWhereInput;

  @Field(() => [JobProfileScopeOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileScopeOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileScopeWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileScopeWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileScopeScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileScopeScalarFieldEnum>;
}
