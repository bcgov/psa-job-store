import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationCreateWithoutPositionRequestsInput } from './location-create-without-position-requests.input';
import { Type } from 'class-transformer';
import { LocationCreateOrConnectWithoutPositionRequestsInput } from './location-create-or-connect-without-position-requests.input';
import { Prisma } from '@prisma/client';
import { LocationWhereUniqueInput } from './location-where-unique.input';

@InputType()
export class LocationCreateNestedOneWithoutPositionRequestsInput {
  @Field(() => LocationCreateWithoutPositionRequestsInput, { nullable: true })
  @Type(() => LocationCreateWithoutPositionRequestsInput)
  create?: LocationCreateWithoutPositionRequestsInput;

  @Field(() => LocationCreateOrConnectWithoutPositionRequestsInput, { nullable: true })
  @Type(() => LocationCreateOrConnectWithoutPositionRequestsInput)
  connectOrCreate?: LocationCreateOrConnectWithoutPositionRequestsInput;

  @Field(() => LocationWhereUniqueInput, { nullable: true })
  @Type(() => LocationWhereUniqueInput)
  connect?: Prisma.AtLeast<LocationWhereUniqueInput, 'id'>;
}
