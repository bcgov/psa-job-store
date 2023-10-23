import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ClassificationUncheckedUpdateManyWithoutGridNestedInput } from '../classification/classification-unchecked-update-many-without-grid-nested.input';

@InputType()
export class GridUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => ClassificationUncheckedUpdateManyWithoutGridNestedInput, { nullable: true })
  classifications?: ClassificationUncheckedUpdateManyWithoutGridNestedInput;
}
