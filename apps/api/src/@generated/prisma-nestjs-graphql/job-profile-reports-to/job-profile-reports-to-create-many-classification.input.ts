import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileReportsToCreateManyClassificationInput {
  @Field(() => Int, { nullable: false })
  job_profile_id!: number;
}
