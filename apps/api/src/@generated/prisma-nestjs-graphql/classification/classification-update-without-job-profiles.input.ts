import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GridUpdateOneRequiredWithoutClassificationsNestedInput } from '../grid/grid-update-one-required-without-classifications-nested.input';
import { OccupationGroupUpdateOneRequiredWithoutClassificationsNestedInput } from '../occupation-group/occupation-group-update-one-required-without-classifications-nested.input';

@InputType()
export class ClassificationUpdateWithoutJob_profilesInput {
  @Field(() => GridUpdateOneRequiredWithoutClassificationsNestedInput, { nullable: true })
  grid?: GridUpdateOneRequiredWithoutClassificationsNestedInput;

  @Field(() => OccupationGroupUpdateOneRequiredWithoutClassificationsNestedInput, { nullable: true })
  occupation_group?: OccupationGroupUpdateOneRequiredWithoutClassificationsNestedInput;
}
