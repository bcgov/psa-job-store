import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class ClassificationUncheckedCreateWithoutJob_profilesInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: false })
  grid_id!: number;

  @Field(() => Int, { nullable: false })
  occupation_group_id!: number;
}
