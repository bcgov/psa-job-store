import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { PositionRequestScalarWhereInput } from './position-request-scalar-where.input';
import { PositionRequestUpdateManyMutationInput } from './position-request-update-many-mutation.input';

@InputType()
export class PositionRequestUpdateManyWithWhereWithoutPaylist_departmentInput {
  @Field(() => PositionRequestScalarWhereInput, { nullable: false })
  @Type(() => PositionRequestScalarWhereInput)
  where!: PositionRequestScalarWhereInput;

  @Field(() => PositionRequestUpdateManyMutationInput, { nullable: false })
  @Type(() => PositionRequestUpdateManyMutationInput)
  data!: PositionRequestUpdateManyMutationInput;
}
