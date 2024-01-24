import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestScalarWhereInput } from './position-request-scalar-where.input';
import { Type } from 'class-transformer';
import { PositionRequestUpdateManyMutationInput } from './position-request-update-many-mutation.input';

@InputType()
export class PositionRequestUpdateManyWithWhereWithoutDepartmentInput {
  @Field(() => PositionRequestScalarWhereInput, { nullable: false })
  @Type(() => PositionRequestScalarWhereInput)
  where!: PositionRequestScalarWhereInput;

  @Field(() => PositionRequestUpdateManyMutationInput, { nullable: false })
  @Type(() => PositionRequestUpdateManyMutationInput)
  data!: PositionRequestUpdateManyMutationInput;
}
