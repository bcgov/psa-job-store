import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ClassificationInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  employee_group_id: string;

  @Field(() => String)
  peoplesoft_id: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  grade: string;
}
