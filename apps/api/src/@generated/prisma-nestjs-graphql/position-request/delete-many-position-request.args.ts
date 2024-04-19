import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { PositionRequestWhereInput } from './position-request-where.input';

@ArgsType()
export class DeleteManyPositionRequestArgs {
  @Field(() => PositionRequestWhereInput, { nullable: true })
  @Type(() => PositionRequestWhereInput)
  where?: PositionRequestWhereInput;
}
