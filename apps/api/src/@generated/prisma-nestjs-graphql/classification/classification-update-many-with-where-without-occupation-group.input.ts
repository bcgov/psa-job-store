import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationScalarWhereInput } from './classification-scalar-where.input';
import { Type } from 'class-transformer';
import { ClassificationUncheckedUpdateManyWithoutOccupation_groupInput } from './classification-unchecked-update-many-without-occupation-group.input';

@InputType()
export class ClassificationUpdateManyWithWhereWithoutOccupation_groupInput {
  @Field(() => ClassificationScalarWhereInput, { nullable: false })
  @Type(() => ClassificationScalarWhereInput)
  where!: ClassificationScalarWhereInput;

  @Field(() => ClassificationUncheckedUpdateManyWithoutOccupation_groupInput, { nullable: false })
  @Type(() => ClassificationUncheckedUpdateManyWithoutOccupation_groupInput)
  data!: ClassificationUncheckedUpdateManyWithoutOccupation_groupInput;
}
