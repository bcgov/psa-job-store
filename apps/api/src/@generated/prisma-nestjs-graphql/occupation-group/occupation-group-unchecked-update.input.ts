import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ClassificationUncheckedUpdateManyWithoutOccupation_groupNestedInput } from '../classification/classification-unchecked-update-many-without-occupation-group-nested.input';

@InputType()
export class OccupationGroupUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => ClassificationUncheckedUpdateManyWithoutOccupation_groupNestedInput, { nullable: true })
  classifications?: ClassificationUncheckedUpdateManyWithoutOccupation_groupNestedInput;
}
