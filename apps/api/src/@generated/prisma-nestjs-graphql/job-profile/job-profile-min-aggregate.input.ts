import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  career_group_id?: true;

  @Field(() => Boolean, { nullable: true })
  classification_id?: true;

  @Field(() => Boolean, { nullable: true })
  family_id?: true;

  @Field(() => Boolean, { nullable: true })
  organization_id?: true;

  @Field(() => Boolean, { nullable: true })
  owner_id?: true;

  @Field(() => Boolean, { nullable: true })
  parent_id?: true;

  @Field(() => Boolean, { nullable: true })
  role_id?: true;

  @Field(() => Boolean, { nullable: true })
  state?: true;

  @Field(() => Boolean, { nullable: true })
  stream?: true;

  @Field(() => Boolean, { nullable: true })
  title?: true;

  @Field(() => Boolean, { nullable: true })
  number?: true;

  @Field(() => Boolean, { nullable: true })
  context?: true;

  @Field(() => Boolean, { nullable: true })
  overview?: true;
}
