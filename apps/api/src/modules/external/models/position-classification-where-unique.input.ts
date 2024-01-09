import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PositionClassificationWhereUniqueInput {
  @Field(() => String, { nullable: true })
  position_id?: string;
}
