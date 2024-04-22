import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  role_id?: number;

  @Field(() => Int, { nullable: true })
  role_type_id?: number;

  @Field(() => Int, { nullable: true })
  scope_id?: number;

  @Field(() => Int, { nullable: true })
  number?: number;
}
