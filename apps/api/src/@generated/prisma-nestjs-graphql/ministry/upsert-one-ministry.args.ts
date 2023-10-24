import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { MinistryWhereUniqueInput } from './ministry-where-unique.input';
import { Type } from 'class-transformer';
import { MinistryCreateInput } from './ministry-create.input';
import { MinistryUpdateInput } from './ministry-update.input';

@ArgsType()
export class UpsertOneMinistryArgs {
  @Field(() => MinistryWhereUniqueInput, { nullable: false })
  @Type(() => MinistryWhereUniqueInput)
  where!: Prisma.AtLeast<MinistryWhereUniqueInput, 'id'>;

  @Field(() => MinistryCreateInput, { nullable: false })
  @Type(() => MinistryCreateInput)
  create!: MinistryCreateInput;

  @Field(() => MinistryUpdateInput, { nullable: false })
  @Type(() => MinistryUpdateInput)
  update!: MinistryUpdateInput;
}
