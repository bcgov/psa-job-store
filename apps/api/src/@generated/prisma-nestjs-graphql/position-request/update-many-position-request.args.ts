import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionRequestUpdateManyMutationInput } from './position-request-update-many-mutation.input';
import { Type } from 'class-transformer';
import { PositionRequestWhereInput } from './position-request-where.input';

@ArgsType()
export class UpdateManyPositionRequestArgs {
  @Field(() => PositionRequestUpdateManyMutationInput, { nullable: false })
  @Type(() => PositionRequestUpdateManyMutationInput)
  data!: PositionRequestUpdateManyMutationInput;

  @Field(() => PositionRequestWhereInput, { nullable: true })
  @Type(() => PositionRequestWhereInput)
  where?: PositionRequestWhereInput;
}
