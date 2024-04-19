import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { PositionRequestUpdateManyMutationInput } from './position-request-update-many-mutation.input';
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
