import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { LocationCreateOrConnectWithoutPositionRequestsInput } from './location-create-or-connect-without-position-requests.input';
import { LocationCreateWithoutPositionRequestsInput } from './location-create-without-position-requests.input';
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
