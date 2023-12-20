import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobFamilyWhereInput } from './job-family-where.input';
import { Type } from 'class-transformer';
import { JobFamilyOrderByWithRelationAndSearchRelevanceInput } from './job-family-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobFamilyWhereUniqueInput } from './job-family-where-unique.input';
import { HideField } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobFamilyScalarFieldEnum } from './job-family-scalar-field.enum';

@ArgsType()
export class FindManyJobFamilyArgs {
  @Field(() => JobFamilyWhereInput, { nullable: true })
  @Type(() => JobFamilyWhereInput)
  where?: JobFamilyWhereInput;

  @Field(() => [JobFamilyOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobFamilyOrderByWithRelationAndSearchRelevanceInput>;

  @HideField()
  cursor?: Prisma.AtLeast<JobFamilyWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @HideField()
  distinct?: Array<keyof typeof JobFamilyScalarFieldEnum>;
}
