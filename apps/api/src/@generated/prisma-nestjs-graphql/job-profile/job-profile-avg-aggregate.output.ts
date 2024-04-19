import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;

  @Field(() => Float, { nullable: true })
  role_id?: number;

  @Field(() => Float, { nullable: true })
  role_type_id?: number;

  @Field(() => Float, { nullable: true })
  scope_id?: number;

  @Field(() => Float, { nullable: true })
  number?: number;
}
