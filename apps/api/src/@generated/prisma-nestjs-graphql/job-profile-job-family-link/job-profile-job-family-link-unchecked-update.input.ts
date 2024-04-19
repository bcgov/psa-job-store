import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  jobProfileId?: number;

  @Field(() => Int, { nullable: true })
  jobFamilyId?: number;
}
