import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { LocationCreateWithoutPositionRequestsInput } from './location-create-without-position-requests.input';
import { LocationUpdateWithoutPositionRequestsInput } from './location-update-without-position-requests.input';
import { LocationWhereInput } from './location-where.input';

@InputType()
export class LocationUpsertWithoutPositionRequestsInput {
  @Field(() => LocationUpdateWithoutPositionRequestsInput, { nullable: false })
  @Type(() => LocationUpdateWithoutPositionRequestsInput)
  update!: LocationUpdateWithoutPositionRequestsInput;

  @Field(() => LocationCreateWithoutPositionRequestsInput, { nullable: false })
  @Type(() => LocationCreateWithoutPositionRequestsInput)
  create!: LocationCreateWithoutPositionRequestsInput;

  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  where?: LocationWhereInput;
}
