import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileJobFamilyLinkCreateManyJobFamilyInput {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;
}
