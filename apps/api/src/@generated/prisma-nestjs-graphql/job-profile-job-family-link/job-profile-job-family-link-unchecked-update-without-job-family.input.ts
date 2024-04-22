import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkUncheckedUpdateWithoutJobFamilyInput {
  @Field(() => Int, { nullable: true })
  jobProfileId?: number;
}
