import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PositionClassification {
  @Field(() => String, { nullable: false })
  classification_id: string;
}
