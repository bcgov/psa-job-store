import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ClassificationUpdateManyWithoutGridNestedInput } from '../classification/classification-update-many-without-grid-nested.input';

@InputType()
export class GridUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [Int], { nullable: true })
  steps?: Array<number>;

  @Field(() => ClassificationUpdateManyWithoutGridNestedInput, { nullable: true })
  classifications?: ClassificationUpdateManyWithoutGridNestedInput;
}
