import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationScalarWhereInput } from './classification-scalar-where.input';
import { Type } from 'class-transformer';
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
