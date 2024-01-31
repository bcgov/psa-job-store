import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionRequestCreateInput } from './position-request-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOnePositionRequestArgs {
  @Field(() => PositionRequestCreateInput, { nullable: false })
  @Type(() => PositionRequestCreateInput)
  data!: PositionRequestCreateInput;
}
