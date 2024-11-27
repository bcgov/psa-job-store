import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SetUserOrgChartAccessInput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => [String], { nullable: false })
  department_ids: string[];
}
