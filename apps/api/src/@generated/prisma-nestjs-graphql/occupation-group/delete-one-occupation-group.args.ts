import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OccupationGroupWhereUniqueInput } from './occupation-group-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneOccupationGroupArgs {
  @Field(() => OccupationGroupWhereUniqueInput, { nullable: false })
  @Type(() => OccupationGroupWhereUniqueInput)
  where!: Prisma.AtLeast<OccupationGroupWhereUniqueInput, 'id'>;
}
