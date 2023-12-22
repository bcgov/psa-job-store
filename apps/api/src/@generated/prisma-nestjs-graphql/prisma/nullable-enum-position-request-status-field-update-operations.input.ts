import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestStatus } from './position-request-status.enum';

@InputType()
export class NullableEnumPositionRequestStatusFieldUpdateOperationsInput {
  @Field(() => PositionRequestStatus, { nullable: true })
  set?: keyof typeof PositionRequestStatus;
}
