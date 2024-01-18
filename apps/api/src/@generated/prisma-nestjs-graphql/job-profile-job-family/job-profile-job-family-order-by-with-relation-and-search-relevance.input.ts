import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileOrderByRelationAggregateInput } from '../job-profile/job-profile-order-by-relation-aggregate.input';
import { JobProfileStreamOrderByRelationAggregateInput } from '../job-profile-stream/job-profile-stream-order-by-relation-aggregate.input';
import { JobProfileJobFamilyOrderByRelevanceInput } from './job-profile-job-family-order-by-relevance.input';

@InputType()
export class JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobProfileOrderByRelationAggregateInput, { nullable: true })
  job_profiles?: JobProfileOrderByRelationAggregateInput;

  @Field(() => JobProfileStreamOrderByRelationAggregateInput, { nullable: true })
  JobProfileStream?: JobProfileStreamOrderByRelationAggregateInput;

  @Field(() => JobProfileJobFamilyOrderByRelevanceInput, { nullable: true })
  _relevance?: JobProfileJobFamilyOrderByRelevanceInput;
}
