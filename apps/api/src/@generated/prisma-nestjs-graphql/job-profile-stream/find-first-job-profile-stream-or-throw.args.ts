import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileStreamOrderByWithRelationAndSearchRelevanceInput } from './job-profile-stream-order-by-with-relation-and-search-relevance.input';
import { JobProfileStreamScalarFieldEnum } from './job-profile-stream-scalar-field.enum';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';

@ArgsType()
export class FindFirstJobProfileStreamOrThrowArgs {
  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  @Type(() => JobProfileStreamWhereInput)
  where?: JobProfileStreamWhereInput;

  @Field(() => [JobProfileStreamOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileStreamOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileStreamWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileStreamScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileStreamScalarFieldEnum>;
}
