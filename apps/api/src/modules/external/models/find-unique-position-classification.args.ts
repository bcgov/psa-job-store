import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { PositionClassificationWhereUniqueInput } from './position-classification-where-unique.input';

@ArgsType()
export class FindUniquePositionClassificationArgs {
  @Field(() => PositionClassificationWhereUniqueInput, { nullable: false })
  @Type(() => PositionClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<PositionClassificationWhereUniqueInput, 'position_id'>;
}
