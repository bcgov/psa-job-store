import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobRoleWhereInput } from './job-role-where.input';
import { Type } from 'class-transformer';
import { JobRoleOrderByWithRelationAndSearchRelevanceInput } from './job-role-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobRoleWhereUniqueInput } from './job-role-where-unique.input';
import { HideField } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobRoleScalarFieldEnum } from './job-role-scalar-field.enum';

@ArgsType()
export class FindManyJobRoleArgs {
  @Field(() => JobRoleWhereInput, { nullable: true })
  @Type(() => JobRoleWhereInput)
  where?: JobRoleWhereInput;

  @Field(() => [JobRoleOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobRoleOrderByWithRelationAndSearchRelevanceInput>;

  @HideField()
  cursor?: Prisma.AtLeast<JobRoleWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @HideField()
  distinct?: Array<keyof typeof JobRoleScalarFieldEnum>;
}
