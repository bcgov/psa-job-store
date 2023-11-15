import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionUpdateManyMutationInput } from './position-update-many-mutation.input';
import { Type } from 'class-transformer';
import { PositionWhereInput } from './position-where.input';

@ArgsType()
export class UpdateManyPositionArgs {
  @Field(() => PositionUpdateManyMutationInput, { nullable: false })
  @Type(() => PositionUpdateManyMutationInput)
  data!: PositionUpdateManyMutationInput;

  @Field(() => PositionWhereInput, { nullable: true })
  @Type(() => PositionWhereInput)
  where?: PositionWhereInput;
}
