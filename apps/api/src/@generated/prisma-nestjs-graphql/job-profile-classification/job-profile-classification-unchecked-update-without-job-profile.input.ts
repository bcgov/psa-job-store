import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileClassificationUncheckedUpdateWithoutJob_profileInput {
  @Field(() => String, { nullable: true })
  classification_id?: string;
}
