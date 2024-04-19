import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileScopeCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  name!: number;

  @Field(() => Int, { nullable: false })
  description!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
