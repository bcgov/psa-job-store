import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class GridCreateWithoutClassificationsInput {
  @Field(() => String, { nullable: false })
  name!: string;
}
