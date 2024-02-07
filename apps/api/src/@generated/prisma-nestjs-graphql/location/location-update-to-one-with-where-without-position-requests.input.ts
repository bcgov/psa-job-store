import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationWhereInput } from './location-where.input';
import { Type } from 'class-transformer';
import { LocationUpdateWithoutPositionRequestsInput } from './location-update-without-position-requests.input';

@InputType()
export class LocationUpdateToOneWithWhereWithoutPositionRequestsInput {
  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  where?: LocationWhereInput;

  @Field(() => LocationUpdateWithoutPositionRequestsInput, { nullable: false })
  @Type(() => LocationUpdateWithoutPositionRequestsInput)
  data!: LocationUpdateWithoutPositionRequestsInput;
}
