import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class OccupationGroupCreateWithoutClassificationsInput {
  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;
}
