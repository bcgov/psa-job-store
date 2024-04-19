import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkUncheckedCreateWithoutJobProfileInput {
  @Field(() => Int, { nullable: false })
  jobFamilyId!: number;
}
