import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserCount {
  @Field(() => Int, { nullable: false })
  comments?: number;

  @Field(() => Int, { nullable: false })
  JobProfile?: number;
}
