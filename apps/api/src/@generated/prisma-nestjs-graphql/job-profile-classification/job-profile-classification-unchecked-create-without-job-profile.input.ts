import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileClassificationUncheckedCreateWithoutJob_profileInput {
  @Field(() => String, { nullable: false })
  classification_id!: string;
}
