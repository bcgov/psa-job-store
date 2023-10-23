import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateManyWithoutOccupation_groupNestedInput } from '../classification/classification-update-many-without-occupation-group-nested.input';

@InputType()
export class OccupationGroupUpdateInput {
  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => ClassificationUpdateManyWithoutOccupation_groupNestedInput, { nullable: true })
  classifications?: ClassificationUpdateManyWithoutOccupation_groupNestedInput;
}
