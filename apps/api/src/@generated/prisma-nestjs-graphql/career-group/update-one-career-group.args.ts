import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CareerGroupUpdateInput } from './career-group-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { CareerGroupWhereUniqueInput } from './career-group-where-unique.input';

@ArgsType()
export class UpdateOneCareerGroupArgs {
  @Field(() => CareerGroupUpdateInput, { nullable: false })
  @Type(() => CareerGroupUpdateInput)
  data!: CareerGroupUpdateInput;

  @Field(() => CareerGroupWhereUniqueInput, { nullable: false })
  @Type(() => CareerGroupWhereUniqueInput)
  where!: Prisma.AtLeast<CareerGroupWhereUniqueInput, 'id'>;
}
