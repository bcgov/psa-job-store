import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkCreateManyJobProfileInput {
  @Field(() => Int, { nullable: false })
  jobFamilyId!: number;
}
