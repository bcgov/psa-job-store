import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileScopeMinAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
