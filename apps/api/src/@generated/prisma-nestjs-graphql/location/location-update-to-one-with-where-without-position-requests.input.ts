import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { LocationUpdateWithoutPositionRequestsInput } from './location-update-without-position-requests.input';
import { LocationWhereInput } from './location-where.input';

@InputType()
export class LocationUpdateToOneWithWhereWithoutPositionRequestsInput {
  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  where?: LocationWhereInput;

  @Field(() => LocationUpdateWithoutPositionRequestsInput, { nullable: false })
  @Type(() => LocationUpdateWithoutPositionRequestsInput)
  data!: LocationUpdateWithoutPositionRequestsInput;
}
