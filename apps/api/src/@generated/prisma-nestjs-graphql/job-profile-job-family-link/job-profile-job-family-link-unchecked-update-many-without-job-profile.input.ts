import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobProfileInput {
  @Field(() => Int, { nullable: true })
  jobFamilyId?: number;
}
