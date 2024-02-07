import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LocationWhereUniqueInput } from './location-where-unique.input';
import { Type } from 'class-transformer';
import { LocationCreateWithoutPositionRequestsInput } from './location-create-without-position-requests.input';

@InputType()
export class LocationCreateOrConnectWithoutPositionRequestsInput {
  @Field(() => LocationWhereUniqueInput, { nullable: false })
  @Type(() => LocationWhereUniqueInput)
  where!: Prisma.AtLeast<LocationWhereUniqueInput, 'id'>;

  @Field(() => LocationCreateWithoutPositionRequestsInput, { nullable: false })
  @Type(() => LocationCreateWithoutPositionRequestsInput)
  create!: LocationCreateWithoutPositionRequestsInput;
}
