import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  career_group_id?: true;

  @Field(() => Boolean, { nullable: true })
  family_id?: true;

  @Field(() => Boolean, { nullable: true })
  ministry_id?: true;

  @Field(() => Boolean, { nullable: true })
  parent_id?: true;

  @Field(() => Boolean, { nullable: true })
  role_id?: true;

  @Field(() => Boolean, { nullable: true })
  number?: true;
}
