import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  jobProfileId?: true;

  @Field(() => Boolean, { nullable: true })
  jobFamilyId?: true;
}
