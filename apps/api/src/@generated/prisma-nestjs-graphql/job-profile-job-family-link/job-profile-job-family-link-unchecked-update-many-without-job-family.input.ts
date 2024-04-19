import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobFamilyInput {
  @Field(() => Int, { nullable: true })
  jobProfileId?: number;
}
