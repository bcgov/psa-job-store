import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { LocationCreateInput } from './location-create.input';
import { LocationUpdateInput } from './location-update.input';
import { LocationWhereUniqueInput } from './location-where-unique.input';

@ArgsType()
export class UpsertOneLocationArgs {
  @Field(() => LocationWhereUniqueInput, { nullable: false })
  @Type(() => LocationWhereUniqueInput)
  where!: Prisma.AtLeast<LocationWhereUniqueInput, 'id'>;

  @Field(() => LocationCreateInput, { nullable: false })
  @Type(() => LocationCreateInput)
  create!: LocationCreateInput;

  @Field(() => LocationUpdateInput, { nullable: false })
  @Type(() => LocationUpdateInput)
  update!: LocationUpdateInput;
}
