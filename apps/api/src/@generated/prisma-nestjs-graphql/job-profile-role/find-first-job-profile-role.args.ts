import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileRoleWhereInput } from './job-profile-role-where.input';
import { Type } from 'class-transformer';
import { JobProfileRoleOrderByWithRelationAndSearchRelevanceInput } from './job-profile-role-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileRoleWhereUniqueInput } from './job-profile-role-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileRoleScalarFieldEnum } from './job-profile-role-scalar-field.enum';

@ArgsType()
export class FindFirstJobProfileRoleArgs {
  @Field(() => JobProfileRoleWhereInput, { nullable: true })
  @Type(() => JobProfileRoleWhereInput)
  where?: JobProfileRoleWhereInput;

  @Field(() => [JobProfileRoleOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileRoleOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileRoleWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileRoleWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileRoleScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileRoleScalarFieldEnum>;
}
