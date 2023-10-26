import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileReportsToUncheckedCreateInput {
  @Field(() => Int, { nullable: false })
  classification_id!: number;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;
}
