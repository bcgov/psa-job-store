import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ClassificationUncheckedCreateNestedManyWithoutOccupation_groupInput } from '../classification/classification-unchecked-create-nested-many-without-occupation-group.input';

@InputType()
export class OccupationGroupUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ClassificationUncheckedCreateNestedManyWithoutOccupation_groupInput, { nullable: true })
  classifications?: ClassificationUncheckedCreateNestedManyWithoutOccupation_groupInput;
}
