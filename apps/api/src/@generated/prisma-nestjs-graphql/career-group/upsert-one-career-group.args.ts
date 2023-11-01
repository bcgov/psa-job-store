import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CareerGroupWhereUniqueInput } from './career-group-where-unique.input';
import { Type } from 'class-transformer';
import { CareerGroupCreateInput } from './career-group-create.input';
import { CareerGroupUpdateInput } from './career-group-update.input';

@ArgsType()
export class UpsertOneCareerGroupArgs {
  @Field(() => CareerGroupWhereUniqueInput, { nullable: false })
  @Type(() => CareerGroupWhereUniqueInput)
  where!: Prisma.AtLeast<CareerGroupWhereUniqueInput, 'id'>;

  @Field(() => CareerGroupCreateInput, { nullable: false })
  @Type(() => CareerGroupCreateInput)
  create!: CareerGroupCreateInput;

  @Field(() => CareerGroupUpdateInput, { nullable: false })
  @Type(() => CareerGroupUpdateInput)
  update!: CareerGroupUpdateInput;
}
