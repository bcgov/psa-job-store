import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionRequestUpdateInput } from './position-request-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@ArgsType()
export class UpdateOnePositionRequestArgs {
  @Field(() => PositionRequestUpdateInput, { nullable: false })
  @Type(() => PositionRequestUpdateInput)
  data!: PositionRequestUpdateInput;

  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;
}
