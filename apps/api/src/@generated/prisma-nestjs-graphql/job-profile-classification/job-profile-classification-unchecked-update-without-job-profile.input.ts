import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileClassificationUncheckedUpdateWithoutJob_profileInput {
  @Field(() => String, { nullable: true })
  classification_id?: string;
}
