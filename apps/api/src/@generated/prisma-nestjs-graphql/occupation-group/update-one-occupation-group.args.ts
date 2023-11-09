import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OccupationGroupUpdateInput } from './occupation-group-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { OccupationGroupWhereUniqueInput } from './occupation-group-where-unique.input';

@ArgsType()
export class UpdateOneOccupationGroupArgs {
  @Field(() => OccupationGroupUpdateInput, { nullable: false })
  @Type(() => OccupationGroupUpdateInput)
  data!: OccupationGroupUpdateInput;

  @Field(() => OccupationGroupWhereUniqueInput, { nullable: false })
  @Type(() => OccupationGroupWhereUniqueInput)
  where!: Prisma.AtLeast<OccupationGroupWhereUniqueInput, 'id'>;
}
