import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ClassificationScalarWhereInput } from './classification-scalar-where.input';
import { ClassificationUpdateManyMutationInput } from './classification-update-many-mutation.input';

@InputType()
export class ClassificationUpdateManyWithWhereWithoutEmployee_groupInput {
  @Field(() => ClassificationScalarWhereInput, { nullable: false })
  @Type(() => ClassificationScalarWhereInput)
  where!: ClassificationScalarWhereInput;

  @Field(() => ClassificationUpdateManyMutationInput, { nullable: false })
  @Type(() => ClassificationUpdateManyMutationInput)
  data!: ClassificationUpdateManyMutationInput;
}
