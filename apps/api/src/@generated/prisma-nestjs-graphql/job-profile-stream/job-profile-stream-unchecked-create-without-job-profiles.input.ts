import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamUncheckedCreateWithoutJobProfilesInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: false })
  job_family_id!: number;

  @Field(() => String, { nullable: false })
  name!: string;
}
