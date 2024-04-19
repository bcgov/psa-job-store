import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileRoleOrderByWithRelationAndSearchRelevanceInput } from './job-profile-role-order-by-with-relation-and-search-relevance.input';
import { JobProfileRoleScalarFieldEnum } from './job-profile-role-scalar-field.enum';
import { JobProfileRoleWhereUniqueInput } from './job-profile-role-where-unique.input';
import { JobProfileRoleWhereInput } from './job-profile-role-where.input';

@ArgsType()
export class FindFirstJobProfileRoleOrThrowArgs {
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
