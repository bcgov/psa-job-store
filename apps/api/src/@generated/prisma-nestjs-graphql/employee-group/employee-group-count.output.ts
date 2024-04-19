import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmployeeGroupCount {
  @Field(() => Int, { nullable: false })
  classifications?: number;
}
