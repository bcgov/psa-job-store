import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionRequestWhereInput } from './position-request-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyPositionRequestArgs {
  @Field(() => PositionRequestWhereInput, { nullable: true })
  @Type(() => PositionRequestWhereInput)
  where?: PositionRequestWhereInput;
}
