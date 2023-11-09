import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CareerGroupWhereUniqueInput } from './career-group-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueCareerGroupArgs {
  @Field(() => CareerGroupWhereUniqueInput, { nullable: false })
  @Type(() => CareerGroupWhereUniqueInput)
  where!: Prisma.AtLeast<CareerGroupWhereUniqueInput, 'id'>;
}
