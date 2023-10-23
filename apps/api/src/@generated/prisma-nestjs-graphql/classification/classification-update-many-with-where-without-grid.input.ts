import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationScalarWhereInput } from './classification-scalar-where.input';
import { Type } from 'class-transformer';
import { ClassificationUncheckedUpdateManyWithoutGridInput } from './classification-unchecked-update-many-without-grid.input';

@InputType()
export class ClassificationUpdateManyWithWhereWithoutGridInput {
  @Field(() => ClassificationScalarWhereInput, { nullable: false })
  @Type(() => ClassificationScalarWhereInput)
  where!: ClassificationScalarWhereInput;

  @Field(() => ClassificationUncheckedUpdateManyWithoutGridInput, { nullable: false })
  @Type(() => ClassificationUncheckedUpdateManyWithoutGridInput)
  data!: ClassificationUncheckedUpdateManyWithoutGridInput;
}
