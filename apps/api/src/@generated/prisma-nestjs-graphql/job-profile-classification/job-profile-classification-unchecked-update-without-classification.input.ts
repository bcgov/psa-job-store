import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileClassificationUncheckedUpdateWithoutClassificationInput {
  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
