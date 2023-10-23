import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { GridWhereUniqueInput } from './grid-where-unique.input';
import { Type } from 'class-transformer';
import { GridCreateWithoutClassificationsInput } from './grid-create-without-classifications.input';

@InputType()
export class GridCreateOrConnectWithoutClassificationsInput {
  @Field(() => GridWhereUniqueInput, { nullable: false })
  @Type(() => GridWhereUniqueInput)
  where!: Prisma.AtLeast<GridWhereUniqueInput, 'id'>;

  @Field(() => GridCreateWithoutClassificationsInput, { nullable: false })
  @Type(() => GridCreateWithoutClassificationsInput)
  create!: GridCreateWithoutClassificationsInput;
}
