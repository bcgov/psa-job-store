import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LocationUpdateInput } from './location-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { LocationWhereUniqueInput } from './location-where-unique.input';

@ArgsType()
export class UpdateOneLocationArgs {
  @Field(() => LocationUpdateInput, { nullable: false })
  @Type(() => LocationUpdateInput)
  data!: LocationUpdateInput;

  @Field(() => LocationWhereUniqueInput, { nullable: false })
  @Type(() => LocationWhereUniqueInput)
  where!: Prisma.AtLeast<LocationWhereUniqueInput, 'id'>;
}
