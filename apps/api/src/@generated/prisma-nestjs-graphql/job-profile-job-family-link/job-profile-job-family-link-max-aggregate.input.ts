import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  jobProfileId?: true;

  @Field(() => Boolean, { nullable: true })
  jobFamilyId?: true;
}
