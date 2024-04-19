import { Field, InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';

@InputType()
export class JobProfileStreamLinkScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileStreamLinkScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileStreamLinkScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileStreamLinkScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileStreamLinkScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileStreamLinkScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileStreamLinkScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  jobProfileId?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  streamId?: IntWithAggregatesFilter;
}
