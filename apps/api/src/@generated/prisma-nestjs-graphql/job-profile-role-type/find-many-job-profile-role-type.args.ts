import { ArgsType, Field, HideField, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeOrderByWithRelationAndSearchRelevanceInput } from './job-profile-role-type-order-by-with-relation-and-search-relevance.input';
import { JobProfileRoleTypeScalarFieldEnum } from './job-profile-role-type-scalar-field.enum';
import { JobProfileRoleTypeWhereUniqueInput } from './job-profile-role-type-where-unique.input';
import { JobProfileRoleTypeWhereInput } from './job-profile-role-type-where.input';

@ArgsType()
export class FindManyJobProfileRoleTypeArgs {
  @Field(() => JobProfileRoleTypeWhereInput, { nullable: true })
  @Type(() => JobProfileRoleTypeWhereInput)
  where?: JobProfileRoleTypeWhereInput;

  @Field(() => [JobProfileRoleTypeOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileRoleTypeOrderByWithRelationAndSearchRelevanceInput>;

  @HideField()
  cursor?: Prisma.AtLeast<JobProfileRoleTypeWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @HideField()
  distinct?: Array<keyof typeof JobProfileRoleTypeScalarFieldEnum>;
}
