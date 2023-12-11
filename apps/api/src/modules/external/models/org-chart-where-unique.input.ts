import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrgChartWhereUniqueInput {
  @Field(() => String, { nullable: true })
  department_id?: string;
}
