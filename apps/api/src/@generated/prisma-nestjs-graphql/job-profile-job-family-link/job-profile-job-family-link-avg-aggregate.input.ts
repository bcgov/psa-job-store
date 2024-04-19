import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  jobProfileId?: true;

  @Field(() => Boolean, { nullable: true })
  jobFamilyId?: true;
}
