import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  jobProfileId?: true;

  @Field(() => Boolean, { nullable: true })
  jobFamilyId?: true;
}
