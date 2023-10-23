import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { MinistryWhereUniqueInput } from './ministry-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneMinistryArgs {
  @Field(() => MinistryWhereUniqueInput, { nullable: false })
  @Type(() => MinistryWhereUniqueInput)
  where!: Prisma.AtLeast<MinistryWhereUniqueInput, 'id'>;
}
