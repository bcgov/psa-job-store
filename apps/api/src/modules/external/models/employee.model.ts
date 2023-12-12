import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Employee {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name?: string;

  @Field(() => String, { nullable: false })
  status?: string;
}
