import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileReportsToUncheckedUpdateManyInput {
  @Field(() => Int, { nullable: true })
  classification_id?: number;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
