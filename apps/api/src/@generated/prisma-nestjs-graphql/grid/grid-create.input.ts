import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateNestedManyWithoutGridInput } from '../classification/classification-create-nested-many-without-grid.input';

@InputType()
export class GridCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ClassificationCreateNestedManyWithoutGridInput, { nullable: true })
  classifications?: ClassificationCreateNestedManyWithoutGridInput;
}
