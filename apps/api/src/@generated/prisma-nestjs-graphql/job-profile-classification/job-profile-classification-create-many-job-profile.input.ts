import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileClassificationCreateManyJob_profileInput {
  @Field(() => String, { nullable: false })
  classification_id!: string;
}
