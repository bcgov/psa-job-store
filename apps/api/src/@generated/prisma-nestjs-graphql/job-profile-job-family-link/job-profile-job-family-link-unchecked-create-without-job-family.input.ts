import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkUncheckedCreateWithoutJobFamilyInput {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;
}
