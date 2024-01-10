import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PositionWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;
}
