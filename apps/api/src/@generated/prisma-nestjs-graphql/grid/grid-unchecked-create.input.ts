import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ClassificationUncheckedCreateNestedManyWithoutGridInput } from '../classification/classification-unchecked-create-nested-many-without-grid.input';

@InputType()
export class GridUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ClassificationUncheckedCreateNestedManyWithoutGridInput, { nullable: true })
  classifications?: ClassificationUncheckedCreateNestedManyWithoutGridInput;
}
