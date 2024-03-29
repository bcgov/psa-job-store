import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LocationCreateWithoutPositionRequestsInput } from './location-create-without-position-requests.input';
import { Type } from 'class-transformer';
import { LocationCreateOrConnectWithoutPositionRequestsInput } from './location-create-or-connect-without-position-requests.input';
import { LocationUpsertWithoutPositionRequestsInput } from './location-upsert-without-position-requests.input';
import { LocationWhereInput } from './location-where.input';
import { Prisma } from '@prisma/client';
import { LocationWhereUniqueInput } from './location-where-unique.input';
import { LocationUpdateToOneWithWhereWithoutPositionRequestsInput } from './location-update-to-one-with-where-without-position-requests.input';

@InputType()
export class LocationUpdateOneWithoutPositionRequestsNestedInput {
  @Field(() => LocationCreateWithoutPositionRequestsInput, { nullable: true })
  @Type(() => LocationCreateWithoutPositionRequestsInput)
  create?: LocationCreateWithoutPositionRequestsInput;

  @Field(() => LocationCreateOrConnectWithoutPositionRequestsInput, { nullable: true })
  @Type(() => LocationCreateOrConnectWithoutPositionRequestsInput)
  connectOrCreate?: LocationCreateOrConnectWithoutPositionRequestsInput;

  @Field(() => LocationUpsertWithoutPositionRequestsInput, { nullable: true })
  @Type(() => LocationUpsertWithoutPositionRequestsInput)
  upsert?: LocationUpsertWithoutPositionRequestsInput;

  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  disconnect?: LocationWhereInput;

  @Field(() => LocationWhereInput, { nullable: true })
  @Type(() => LocationWhereInput)
  delete?: LocationWhereInput;

  @Field(() => LocationWhereUniqueInput, { nullable: true })
  @Type(() => LocationWhereUniqueInput)
  connect?: Prisma.AtLeast<LocationWhereUniqueInput, 'id'>;

  @Field(() => LocationUpdateToOneWithWhereWithoutPositionRequestsInput, { nullable: true })
  @Type(() => LocationUpdateToOneWithWhereWithoutPositionRequestsInput)
  update?: LocationUpdateToOneWithWhereWithoutPositionRequestsInput;
}
