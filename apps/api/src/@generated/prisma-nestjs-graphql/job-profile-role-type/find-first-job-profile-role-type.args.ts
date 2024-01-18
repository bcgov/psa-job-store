import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileRoleTypeWhereInput } from './job-profile-role-type-where.input';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeOrderByWithRelationAndSearchRelevanceInput } from './job-profile-role-type-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileRoleTypeWhereUniqueInput } from './job-profile-role-type-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileRoleTypeScalarFieldEnum } from './job-profile-role-type-scalar-field.enum';

@ArgsType()
export class FindFirstJobProfileRoleTypeArgs {
  @Field(() => JobProfileRoleTypeWhereInput, { nullable: true })
  @Type(() => JobProfileRoleTypeWhereInput)
  where?: JobProfileRoleTypeWhereInput;

  @Field(() => [JobProfileRoleTypeOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileRoleTypeOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileRoleTypeWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileRoleTypeWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileRoleTypeScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileRoleTypeScalarFieldEnum>;
}
