import { Field, InputType } from '@nestjs/graphql';
import { PositionRequestStatus } from './position-request-status.enum';

@InputType()
export class NullableEnumPositionRequestStatusFieldUpdateOperationsInput {
  @Field(() => PositionRequestStatus, { nullable: true })
  set?: keyof typeof PositionRequestStatus;
}
