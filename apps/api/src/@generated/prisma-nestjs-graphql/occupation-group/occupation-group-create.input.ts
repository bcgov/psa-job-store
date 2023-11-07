import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateNestedManyWithoutOccupation_groupInput } from '../classification/classification-create-nested-many-without-occupation-group.input';

@InputType()
export class OccupationGroupCreateInput {
  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ClassificationCreateNestedManyWithoutOccupation_groupInput, { nullable: true })
  classifications?: ClassificationCreateNestedManyWithoutOccupation_groupInput;
}
