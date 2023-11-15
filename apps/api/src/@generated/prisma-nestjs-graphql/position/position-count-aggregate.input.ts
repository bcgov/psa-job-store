import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PositionCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  classification_id?: true;

  @Field(() => Boolean, { nullable: true })
  department_id?: true;

  @Field(() => Boolean, { nullable: true })
  organization_id?: true;

  @Field(() => Boolean, { nullable: true })
  supervisor_id?: true;

  @Field(() => Boolean, { nullable: true })
  title?: true;

  @Field(() => Boolean, { nullable: true })
  number?: true;

  @Field(() => Boolean, { nullable: true })
  job_profile_number?: true;

  @Field(() => Boolean, { nullable: true })
  is_empty?: true;

  @Field(() => Boolean, { nullable: true })
  is_vacant?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
