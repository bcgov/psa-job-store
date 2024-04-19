import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileRoleMinAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;
}
