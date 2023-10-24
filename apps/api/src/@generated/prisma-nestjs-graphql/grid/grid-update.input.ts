import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateManyWithoutGridNestedInput } from '../classification/classification-update-many-without-grid-nested.input';

@InputType()
export class GridUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => ClassificationUpdateManyWithoutGridNestedInput, { nullable: true })
  classifications?: ClassificationUpdateManyWithoutGridNestedInput;
}
