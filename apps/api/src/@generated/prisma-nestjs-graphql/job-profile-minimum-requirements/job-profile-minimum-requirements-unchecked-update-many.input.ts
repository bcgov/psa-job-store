import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileMinimumRequirementsUncheckedUpdateManyInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  requirement?: string;

  @Field(() => String, { nullable: true })
  grade?: string;
}
