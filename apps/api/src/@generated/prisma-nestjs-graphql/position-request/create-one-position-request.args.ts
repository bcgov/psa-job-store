import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { PositionRequestCreateInput } from './position-request-create.input';

@ArgsType()
export class CreateOnePositionRequestArgs {
  @Field(() => PositionRequestCreateInput, { nullable: false })
  @Type(() => PositionRequestCreateInput)
  data!: PositionRequestCreateInput;
}
