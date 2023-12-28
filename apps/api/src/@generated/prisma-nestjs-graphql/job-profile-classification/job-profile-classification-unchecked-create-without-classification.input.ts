import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileClassificationUncheckedCreateWithoutClassificationInput {
  @Field(() => Int, { nullable: false })
  job_profile_id!: number;
}
