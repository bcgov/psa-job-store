import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  jobProfileId?: true;

  @Field(() => Boolean, { nullable: true })
  jobFamilyId?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
