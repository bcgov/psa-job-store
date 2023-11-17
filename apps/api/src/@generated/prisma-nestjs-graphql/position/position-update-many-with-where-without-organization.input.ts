import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionScalarWhereInput } from './position-scalar-where.input';
import { Type } from 'class-transformer';
import { PositionUpdateManyMutationInput } from './position-update-many-mutation.input';

@InputType()
export class PositionUpdateManyWithWhereWithoutOrganizationInput {
  @Field(() => PositionScalarWhereInput, { nullable: false })
  @Type(() => PositionScalarWhereInput)
  where!: PositionScalarWhereInput;

  @Field(() => PositionUpdateManyMutationInput, { nullable: false })
  @Type(() => PositionUpdateManyMutationInput)
  data!: PositionUpdateManyMutationInput;
}
